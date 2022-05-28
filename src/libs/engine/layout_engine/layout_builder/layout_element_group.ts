import { Alignment } from "@libs/common/alignment.enum";
import { Settings } from "@libs/engine/layout_engine/settings";
import { BaseElement } from "@libs/model/base_element";
import { Direction } from "@libs/common/distribution.enum";
import { Block, Position } from "@libs/model/block";
import { ContentBoxDimension } from "@libs/model/content_box_dimension";

const uniqId = require("uniqid");

export class LayoutElementGroup extends Block {
  protected id: string;
  protected settings: Settings;
  protected horizontalAlignment: Alignment;
  protected verticalAlignment: Alignment;
  protected children: Array<LayoutElementGroup | BaseElement>;
  protected childrenDirection: Direction;
  protected usedContentBoxWidth: number;
  protected usedContentBoxHeight: number;
  protected contentBox: ContentBoxDimension;
  protected sizeReference: number;
  protected maxChildWidth: number;
  protected maxChildHeight: number;
  protected subTreeCounting: number;
  protected hasNestedGroup: boolean;

  constructor(
    horizontalAlignment: Alignment,
    verticalAlignment: Alignment,
    distribution: Direction,
    settings: Settings
  ) {
    super({ x: 0, y: 0, width: 0, height: 0 });

    this.id = uniqId();
    this.settings = settings;
    this.horizontalAlignment = horizontalAlignment;
    this.verticalAlignment = verticalAlignment;
    this.children = [];
    this.childrenDirection = distribution;
    this.usedContentBoxWidth = 0; // Refers to the used width (in points) of the content box
    this.usedContentBoxHeight = 0; // Refers to the used height (in points) of the content box
    this.contentBox = new ContentBoxDimension(0, 0, 0, 0, distribution); // Content box limits
    this.sizeReference = 0; // Represents the size of each element (without padding between) that fulfill the group length
    this.maxChildWidth = 0; // Represents the width of the biggest child
    this.maxChildHeight = 0; // Represents the height of the biggest child
    this.subTreeCounting = -1; // Total number of elements inside the subtree formed by its children. Starts with -1 to not consider the element itself
    this.hasNestedGroup = false; // Indicates if the element has as child another LayoutElementGroup
  }

  getId() {
    return this.id;
  }

  getSubTreeCounting() {
    return this.subTreeCounting;
  }

  getChildAtIndex(index: number) {
    if (this.children.length > index) {
      return this.children[index];
    }
  }

  getChildrenLength() {
    return this.children.length;
  }

  getChildren() {
    return this.children;
  }

  setPosition({ x, y }: Partial<Position>) {
    const deltaX = x !== undefined ? this.getX() - x : 0;
    const deltaY = y !== undefined ? this.getY() - y : 0;

    super.setPosition({ x, y });
    this.translateChildrenPosition(deltaX, deltaY);
  }

  setWidth(value: number) {
    const currentWidth = this.getWidth();

    if (value > currentWidth) {
      super.setWidth(value);

      // Updating content box limit
      this.updateHorizontalContentBoxAxis();

      // Updating reference element size
      this.updateSizeReference();

      // Distributing and aligning elements
      if (this.childrenDirection === Direction.HORIZONTAL) {
        this.applyDistribution();
      } else {
        // Expanded alignment forces the used width to maximum
        if (this.horizontalAlignment === Alignment.EXPANDED) {
          this.contentBox.setUsedWidth(value);
        }

        // Aligning elements
        this.applyAlignment();
      }
    } else {
      throw new Error("The new Width can´t be smaller than current Width");
    }
  }

  setHeight(value: number) {
    const currentHeight = this.getHeight();

    if (value > currentHeight) {
      super.setHeight(value);

      // Updating content box limit
      this.updateVerticalContentBoxAxis();

      // Updating reference element size
      this.updateSizeReference();

      // Distributing and aligning elements
      if (this.childrenDirection === Direction.HORIZONTAL) {
        // Expanded alignment forces the used height to maximum
        if (this.verticalAlignment === Alignment.EXPANDED) {
          this.contentBox.setUsedHeight(value);
        }

        // Aligning elements
        this.applyAlignment();
      } else {
        this.applyDistribution();
      }
    } else {
      throw new Error("The new Height can´t be smaller than current Height");
    }
  }

  updateHorizontalContentBoxAxis() {
    this.contentBox.setRightBoundary(this.width);
  }

  updateVerticalContentBoxAxis() {
    this.contentBox.setBottomBoundary(this.height);
  }

  incrementUsedWidth(value: number) {
    const usedWidth = this.contentBox.getUsedWidth();
    this.contentBox.setUsedWidth(usedWidth + value);

    if (usedWidth > this.width) {
      this.width = usedWidth;
    }

    // Updating maximum element width
    if (value > this.maxChildWidth) {
      this.maxChildWidth = value;
    }

    // Updating content box limit
    this.updateHorizontalContentBoxAxis();

    this.updateSizeReference();
  }

  incrementUsedHeight(value: number) {
    const usedHeight = this.contentBox.getUsedHeight();
    this.contentBox.setUsedHeight(usedHeight + value);

    if (usedHeight > this.height) {
      this.height = usedHeight;
    }

    // Updating maximum element height
    if (value > this.maxChildHeight) {
      this.maxChildHeight = value;
    }

    // Updating content box limit
    this.updateVerticalContentBoxAxis();

    this.updateSizeReference();
  }

  updateSizeReference() {
    const childrenLength = this.children.length;
    const isHorizontal = this.childrenDirection === Direction.HORIZONTAL;
    const size = isHorizontal ? this.contentBox.getContentBoxWidth() : this.contentBox.getContentBoxHeight();
    const maxSize = isHorizontal ? this.maxChildWidth : this.maxChildHeight;
    const virtualLengthWithoutPadding =
      size - (childrenLength - 1) * this.settings.spaceBetween;
    const potentialOptimalSize = virtualLengthWithoutPadding / childrenLength;

    if (potentialOptimalSize <= maxSize && this.hasNestedGroup) {
      this.sizeReference = maxSize;
    } else {
      this.sizeReference = potentialOptimalSize;
    }
  }

  addContainer(container: BaseElement | LayoutElementGroup) {
    const isHorizontal = this.childrenDirection === Direction.HORIZONTAL;
    const incrementUsedMainLength: (value: number) => void = isHorizontal
      ? (value: number) => this.incrementUsedWidth(value)
      : (value: number) => this.incrementUsedHeight(value);
    const setCrossDimension: (value: number) => void = isHorizontal
      ? (value: number) => {
          if (value > this.contentBox.getUsedHeight()) {
            this.setHeight(
              value + this.contentBox.getTotalHeightOffset(this.getHeight())
            );
            this.contentBox.setUsedHeight(value);
          }
        }
      : (value: number) => {
          if (value > this.contentBox.getUsedWidth()) {
            this.setWidth(
              value + this.contentBox.getTotalWidthOffset(this.getWidth())
            );
            this.contentBox.setUsedWidth(value);
          }
        };
    let mainIncrementValue: number = isHorizontal
      ? container.getWidth()
      : container.getHeight();
    const crossIncrementValue: number = isHorizontal
      ? container.getHeight()
      : container.getWidth();

    if (container) {
      const isBaseElement = container instanceof BaseElement;

      // Checking horizontal alignment compatibility
      if (!isBaseElement) {
        if (
          this.horizontalAlignment === Alignment.EXPANDED &&
          (container as LayoutElementGroup).horizontalAlignment !==
            Alignment.EXPANDED
        ) {
          throw new Error(
            `Cannot insert container. The container has EXPANDED horizontal alignment and should be 
            added only to containers with EXPANDED horizontal alignment`
          );
        }

        // Checking vertical alignment compatibility
        if (
          this.verticalAlignment === Alignment.EXPANDED &&
          (container as LayoutElementGroup).verticalAlignment !==
            Alignment.EXPANDED
        ) {
          throw new Error(
            `Cannot insert container. The container has EXPANDED vertical alignment and should be 
            added only to containers with EXPANDED vertical alignment`
          );
        }
      }

      // Adding container as child
      this.children.push(container);

      this.hasNestedGroup =
        this.hasNestedGroup || container instanceof LayoutElementGroup;

      // Incrementing main size length
      if (this.children.length > 1) {
        mainIncrementValue += this.settings.spaceBetween;
      }

      incrementUsedMainLength(mainIncrementValue);

      // Adjusting cross length size
      setCrossDimension(crossIncrementValue);

      // Arranging elements
      this.applyDistribution();
      this.applyAlignment();

      // Setting parent
      if (isBaseElement) {
        container.setParentId(this.id);
      }
    }
  }

  applyDistribution() {
    const totalSize = this.getWidth();

    if (this.childrenDirection === Direction.HORIZONTAL) {
      this.distributeElements(
        this.horizontalAlignment,
        totalSize,
        this.contentBox.getUsedWidth(),
        (child) => child.getWidth(),
        (child, value) => child.setWidth(value),
        (child, value) => child.setX(value),
        this.contentBox.getLeftBoundary(),
        this.contentBox.getRightOffset(totalSize)
      );
    } else {
      const totalSize = this.getHeight();

      this.distributeElements(
        this.verticalAlignment,
        totalSize,
        this.contentBox.getUsedHeight(),
        (child) => child.getHeight(),
        (child, value) => child.setHeight(value),
        (child, value) => child.setY(value),
        this.contentBox.getTopBoundary(),
        this.contentBox.getBottomOffset(totalSize)
      );
    }
  }

  applyAlignment() {
    const isHorizontal = this.childrenDirection === Direction.HORIZONTAL;
    const totalSize = isHorizontal ? this.getHeight() : this.getWidth();

    if (isHorizontal) {
      this.alignElements(
        this.verticalAlignment,
        totalSize,
        (child) => child.getHeight(),
        (child, value) => child.setHeight(value),
        (child, value) => child.setY(value),
        this.contentBox.getTopBoundary(),
        this.contentBox.getBottomOffset(totalSize)
      );
    } else {
      this.alignElements(
        this.horizontalAlignment,
        totalSize,
        (child) => child.getWidth(),
        (child, value) => child.setWidth(value),
        (child, value) => child.setX(value),
        this.contentBox.getLeftBoundary(),
        this.contentBox.getRightOffset(totalSize)
      );
    }
  }

  /**
   * Distributes children over the element area, considering alignment option
   * @param alignment Alignment option to be applied
   * @param totalSize Total container dimension length
   * @param usedSize Container's used length
   * @param getChildSize Callback to get the child dimension length
   * @param setChildSize Callback to set the child dimension length
   * @param setChildPosition Callback to set the child position
   * @param offsetBefore Offset before element area
   * @param offsetAfter Offset after element area
   */
  distributeElements(
    alignment: Alignment,
    totalSize: number,
    usedSize: number,
    getChildSize: (child: LayoutElementGroup | BaseElement) => number,
    setChildSize: (
      child: LayoutElementGroup | BaseElement,
      value: number
    ) => void,
    setChildPosition: (
      child: LayoutElementGroup | BaseElement,
      value: number
    ) => void,
    offsetBefore: number = 0,
    offsetAfter: number = 0
  ) {
    const refSize = this.sizeReference;
    const spaceBetween = this.settings.spaceBetween;
    let cursor;

    // Setting the initial cursor position
    if (alignment === Alignment.END) {
      cursor = totalSize - offsetAfter;
    } else if (alignment === Alignment.CENTER) {
      cursor = totalSize / 2 - usedSize / 2;
    } else {
      cursor = offsetBefore;
    }

    // Adjusting size and position for all children
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      const childSize = getChildSize(child);

      if (alignment === Alignment.EXPANDED) {
        setChildSize(child, refSize);
        setChildPosition(child, cursor);

        cursor += refSize + spaceBetween;
      } else if (
        alignment === Alignment.START ||
        alignment === Alignment.CENTER
      ) {
        setChildPosition(child, cursor);

        cursor += childSize + spaceBetween;
      } else if (alignment === Alignment.END) {
        cursor -= childSize;

        setChildPosition(child, cursor);

        cursor -= spaceBetween;
      }
    }
  }

  /**
   * Aligns children over the element area, considering alignment option
   * @param alignment Alignment option to be applied
   * @param totalSize Container dimension length to be considered
   * @param getChildSize Callback to get the child dimension length
   * @param setChildSize Callback to set the child dimension length
   * @param setChildPosition Callback to set the child position
   * @param offsetBefore Offset before element area
   * @param offsetAfter Offset after element area
   */
  alignElements(
    alignment: Alignment,
    totalSize: number,
    getChildSize: (child: LayoutElementGroup | BaseElement) => number,
    setChildSize: (
      child: LayoutElementGroup | BaseElement,
      value: number
    ) => void,
    setChildPosition: (
      child: LayoutElementGroup | BaseElement,
      value: number
    ) => void,
    offsetBefore: number = 0,
    offsetAfter: number = 0
  ) {
    // Adjusting size and position for all children
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      const childSize = getChildSize(child);

      if (alignment === Alignment.EXPANDED) {
        setChildSize(child, totalSize - offsetBefore - offsetAfter);
        setChildPosition(child, offsetBefore);
      } else if (alignment === Alignment.START) {
        setChildPosition(child, offsetBefore);
      } else if (alignment === Alignment.CENTER) {
        setChildPosition(child, totalSize / 2 - childSize / 2);
      } else if (alignment === Alignment.END) {
        setChildPosition(child, totalSize - offsetAfter - childSize);
      }
    }
  }

  incrementSubTreeCounting() {
    this.subTreeCounting++;
  }

  /**
   * Applies translation over the position of children
   * @param deltaX Number of points to be translated on the X axis
   * @param deltaY Number of points to be translated on the Y axis
   */
  translateChildrenPosition(deltaX: number, deltaY: number) {
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];

      child.translatePosition(deltaX, deltaY);
    }
  }

  /**
   * Applies translation over the position of the element and its nested children
   * @param deltaX Number of points to be translated on the X axis
   * @param deltaY Number of points to be translated on the Y axis
   */
  translatePosition(deltaX: number, deltaY: number) {
    const newX = this.getX() + deltaX;
    const newY = this.getY() + deltaY;

    this.setPosition({ x: newX, y: newY });
  }
}
