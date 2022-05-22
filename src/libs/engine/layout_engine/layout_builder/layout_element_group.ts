import { Alignment } from "@libs/common/alignment.enum";
import { Settings } from "@libs/engine/layout_engine/settings";
import { BaseElement } from "@libs/model/base_element";
import { Direction } from "@libs/common/distribution.enum";
import { Block } from "@libs/model/block";

const uniqId = require("uniqid");

interface Point {
  x: number;
  y: number;
}

export class LayoutElementGroup extends Block {
  protected id: string;
  protected parentId: string | null;
  protected settings: Settings;
  protected horizontalAlignment: Alignment;
  protected verticalAlignment: Alignment;
  protected children: Array<LayoutElementGroup | BaseElement>;
  protected childrenDirection: Direction;
  protected usedWidth: number;
  protected usedHeight: number;
  protected contentBox: { topLeft: Point; bottomRight: Point };
  protected sizeReference: number;
  protected maxChildWidth: number;
  protected maxChildHeight: number;
  protected subTreeCounting: number;
  protected hasNestedGroup: boolean;

  constructor(
    horizontalAlignment: Alignment,
    verticalAlignment: Alignment,
    distribution: Direction,
    settings: Settings,
    parentId: string | null
  ) {
    super({ x: 0, y: 0, width: 0, height: 0 });

    this.id = uniqId();
    this.parentId = parentId;
    this.settings = settings;
    this.horizontalAlignment = horizontalAlignment;
    this.verticalAlignment = verticalAlignment;
    this.children = [];
    this.childrenDirection = distribution;
    this.usedWidth = 0; // Not the length of Children, but refers to the real width (in points) of the group
    this.usedHeight = 0; // Not the length of Children, but refers to the real height (in points) of the group
    this.contentBox = { topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 } }; // Content box limits
    this.sizeReference = 0; // Represents the size of each element (without padding between) that fulfill the group length
    this.maxChildWidth = 0; // Represents the width of the biggest child
    this.maxChildHeight = 0; // Represents the height of the biggest child
    this.subTreeCounting = -1; // Total number of elements inside the subtree formed by its children. Starts with -1 to not consider the element itself
    this.hasNestedGroup = false; // Indicates if the element has as child another LayoutElementGroup
  }

  getId() {
    return this.id;
  }

  getParentId() {
    return this.parentId;
  }

  getSubTreeCounting() {
    return this.subTreeCounting;
  }

  isEmpty(): boolean {
    return this.children.length === 0;
  }

  getChildAtIndex(index: number) {
    if (this.children.length > index) {
      return this.children[index];
    }
  }

  getUsedWidth() {
    return this.usedWidth;
  }

  getUsedHeight() {
    return this.usedHeight;
  }

  getChildrenLength() {
    return this.children.length;
  }

  getChildren() {
    return this.children;
  }

  setUsedWidth(value: number) {
    this.usedWidth = value;
  }

  setUsedHeight(value: number) {
    this.usedHeight = value;
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
      this.applyDistribution();
      this.applyAlignment();
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
      this.applyDistribution();
      this.applyAlignment();
    } else {
      throw new Error("The new Height can´t be smaller than current Height");
    }
  }

  updateHorizontalContentBoxAxis() {
    this.contentBox.bottomRight.x = this.width;
  }

  updateVerticalContentBoxAxis() {
    this.contentBox.bottomRight.y = this.height;
  }

  resetElementLength() {
    this.usedWidth = 0;
    this.usedHeight = 0;
  }

  incrementUsedWidth(value: number) {
    this.usedWidth += value;

    if (this.usedWidth > this.width) {
      this.width = this.usedWidth;
    }

    // Updating maximum element width
    if (value > this.maxChildWidth) {
      this.maxChildWidth = value;
    }

    this.updateSizeReference();

    // Updating content box limit
    this.updateHorizontalContentBoxAxis();
  }

  incrementUsedHeight(value: number) {
    this.usedHeight += value;

    if (this.usedHeight > this.height) {
      this.height = this.usedHeight;
    }

    // Updating maximum element height
    if (value > this.maxChildHeight) {
      this.maxChildHeight = value;
    }

    this.updateSizeReference();

    // Updating content box limit
    this.updateVerticalContentBoxAxis();
  }

  updateSizeReference() {
    const virtualLengthWithoutPadding =
      this.width - (this.children.length - 1) * this.settings.spaceBetween;
    const potentialOptimalSize =
      virtualLengthWithoutPadding / this.children.length;

    if (potentialOptimalSize <= this.maxChildWidth && this.hasNestedGroup) {
      this.sizeReference = this.maxChildWidth;
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
          this.setHeight(value);
          this.setUsedHeight(value);
        }
      : (value: number) => {
          this.setWidth(value);
          this.setUsedWidth(value);
        };
    let mainIncrementValue: number = isHorizontal
      ? container.getWidth()
      : container.getHeight();
    const crossIncrementValue: number = isHorizontal
      ? container.getHeight()
      : container.getWidth();

    if (container) {
      this.children.push(container);

      this.hasNestedGroup =
        this.hasNestedGroup || container instanceof LayoutElementGroup;

      if (this.children.length > 1) {
        mainIncrementValue += this.settings.spaceBetween;
      }

      incrementUsedMainLength(mainIncrementValue);
      setCrossDimension(crossIncrementValue);

      if (container instanceof BaseElement) {
        this.applyDistribution();
        this.applyAlignment();

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
        this.getUsedWidth(),
        (child) => child.getWidth(),
        (child, value) => child.setWidth(value),
        (child, value) => child.setX(value),
        this.contentBox.topLeft.x,
        totalSize - this.contentBox.bottomRight.x
      );
    } else {
      const totalSize = this.getHeight();

      this.distributeElements(
        this.verticalAlignment,
        totalSize,
        this.getUsedHeight(),
        (child) => child.getHeight(),
        (child, value) => child.setHeight(value),
        (child, value) => child.setY(value),
        this.contentBox.topLeft.y,
        totalSize - this.contentBox.bottomRight.y
      );
    }
  }

  applyAlignment() {
    if (this.childrenDirection === Direction.HORIZONTAL) {
      const totalSize = this.getHeight();

      this.alignElements(
        this.verticalAlignment,
        totalSize,
        (child) => child.getHeight(),
        (child, value) => child.setY(value),
        this.contentBox.topLeft.y,
        totalSize - this.contentBox.bottomRight.y
      );
    } else {
      const totalSize = this.getWidth();

      this.alignElements(
        this.horizontalAlignment,
        totalSize,
        (child) => child.getWidth(),
        (child, value) => child.setX(value),
        this.contentBox.topLeft.x,
        totalSize - this.contentBox.bottomRight.x
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
      cursor = offsetAfter;
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
   * @param setChildPosition Callback to set the child position
   * @param offsetBefore Offset before element area
   * @param offsetAfter Offset after element area
   */
  alignElements(
    alignment: Alignment,
    totalSize: number,
    getChildSize: (child: LayoutElementGroup | BaseElement) => number,
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
        child.setHeight(totalSize - offsetBefore - offsetAfter);
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
   * Updates the size of the element based on its content, considering children`s width and height
   * @param getMainLengthIncrement
   * @param getCrossLengthIncrement
   */
  adjustDimensionsToChildren(
    getMainLengthIncrement: (child: BaseElement | LayoutElementGroup) => number,
    getCrossLengthIncrement: (child: BaseElement | LayoutElementGroup) => number
  ) {
    let notEmptyChildCount = 0;
    this.resetElementLength();

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      const mainLengthIncrement = getMainLengthIncrement(child);
      const crossLengthIncrement = getCrossLengthIncrement(child);

      // Counting just not empty child (with elements below in the hierarchy)
      if (mainLengthIncrement > 0) {
        this.incrementUsedWidth(mainLengthIncrement);

        notEmptyChildCount++;
      }

      // Updating cross length if needed
      if (crossLengthIncrement > this.usedHeight) {
        this.usedHeight = crossLengthIncrement;
      }
    }

    // Adding space between
    if (notEmptyChildCount > 0) {
      const spaceBetweenTotalIncrement =
        (notEmptyChildCount - 1) * this.settings.spaceBetween;

      this.incrementUsedWidth(spaceBetweenTotalIncrement);
    }

    // Replacing virtualLength if needed
    if (this.usedWidth > this.width) {
      this.width = this.usedWidth;
    }
  }

  /**
   * Applies translation over the position of the element
   * @param deltaX
   * @param deltaY
   */
  translateElementGroupPosition(deltaX: number, deltaY: number) {
    const newX = this.getX() + deltaX;
    const newY = this.getY() + deltaY;

    this.setX(newX);
    this.setY(newY);
  }

  /**
   * Applies translation over the position of the element and its nested children
   * @param deltaX
   * @param deltaY
   */
  translatePosition(deltaX: number, deltaY: number) {
    this.translateElementGroupPosition(deltaX, deltaY);

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];

      child.translatePosition(this.getX(), this.getY());
    }
  }
}
