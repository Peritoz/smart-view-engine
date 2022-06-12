import { ContentBoxDimension } from "@libs/model/content_box_dimension";
import { BaseElement } from "@libs/model/base_element";
import { Direction } from "@libs/common/distribution.enum";
import { LayoutGroup } from "@libs/engine/layout_engine/layout_builder/layout_group";
import { Alignment } from "@libs/common/alignment.enum";
import { DEFAULT } from "@libs/common/size_reference.const";
import { Dimension } from "@libs/model/dimension";
import { ContentBoxElement } from "@libs/model/content_box_element";

export class ContentBox {
  protected dimension: ContentBoxDimension;
  protected children: Array<ContentBoxElement>;
  protected horizontalAlignment: Alignment;
  protected verticalAlignment: Alignment;
  protected direction: Direction;
  protected hasNestedGroup: boolean;

  constructor(
    topBoundary: number = DEFAULT.DEFAULT_PADDING,
    leftBoundary: number = DEFAULT.DEFAULT_PADDING,
    direction: Direction = Direction.HORIZONTAL,
    horizontalAlignment: Alignment = Alignment.START,
    verticalAlignment: Alignment = Alignment.START,
    spaceBetween: number = DEFAULT.DEFAULT_PADDING,
    onChangeWidth: (width: number) => void,
    onChangeHeight: (height: number) => void,
    dimension?: Partial<Dimension>
  ) {
    this.dimension = new ContentBoxDimension(
      topBoundary,
      leftBoundary,
      direction,
      spaceBetween,
      horizontalAlignment === Alignment.EXPANDED,
      verticalAlignment === Alignment.EXPANDED,
      onChangeWidth,
      onChangeHeight,
      dimension
    );
    this.children = [];
    this.horizontalAlignment = horizontalAlignment;
    this.verticalAlignment = verticalAlignment;
    this.direction = direction;
    this.hasNestedGroup = false; // Indicates if the element has as child another LayoutElementGroup
  }

  getChildren(): Array<BaseElement | LayoutGroup> {
    return this.children.map((child) => child.getContent());
  }

  getChildAtIndex(index: number): BaseElement | LayoutGroup | undefined {
    if (this.children.length > index) {
      return this.children[index].getContent();
    }
  }

  getChildrenCount(): number {
    return this.children.length;
  }

  getDimension(): ContentBoxDimension {
    return this.dimension;
  }

  addContainer(container: BaseElement | LayoutGroup) {
    // Adding container as child
    this.children.push(
      new ContentBoxElement(
        container,
        () => {},
        () => {}
      )
    );

    this.hasNestedGroup =
      this.hasNestedGroup || container instanceof LayoutGroup;

    // Adjusting content box dimensions
    this.dimension.addContent(container, this.children.length === 1);

    // Arranging elements
    this.applyDistribution();
    this.applyAlignment();
  }

  setWidth(value: number) {
    const currentWidth = this.getWidth();

    if (value >= currentWidth) {
      this.dimension.setContentBoxWidth(value);

      if (this.direction === Direction.HORIZONTAL) {
        this.applyDistribution();
      } else {
        this.applyAlignment();
      }
    } else {
      throw new Error("The new Width can´t be smaller than current Width");
    }
  }

  setHeight(value: number) {
    const currentHeight = this.getHeight();

    if (value >= currentHeight) {
      this.dimension.setContentBoxHeight(value);

      if (this.direction === Direction.HORIZONTAL) {
        this.applyAlignment();
      } else {
        this.applyDistribution();
      }
    } else {
      throw new Error("The new Height can´t be smaller than current Height");
    }
  }

  getWidth(): number {
    return this.dimension.getContentBoxWidth();
  }

  getHeight(): number {
    return this.dimension.getContentBoxHeight();
  }

  getSizeReference(): number {
    const childrenCount = this.children.length;
    const totalSpaceBetweenLength =
      (childrenCount - 1) * this.dimension.getSpaceBetween();
    let totalChildrenLength: number;
    let maxSize: number;
    const isHorizontal = this.direction === Direction.HORIZONTAL;

    if (isHorizontal) {
      totalChildrenLength =
        this.dimension.getContentBoxWidth() - totalSpaceBetweenLength;
      maxSize = this.dimension.getBiggestContentWidth();
    } else {
      totalChildrenLength =
        this.dimension.getContentBoxHeight() - totalSpaceBetweenLength;
      maxSize = this.dimension.getBiggestContentHeight();
    }

    const potentialOptimalSize = totalChildrenLength / childrenCount;

    if (potentialOptimalSize <= maxSize && this.hasNestedGroup) {
      return maxSize;
    } else {
      return potentialOptimalSize;
    }
  }

  applyDistribution() {
    if (this.direction === Direction.HORIZONTAL) {
      const totalSize = this.getWidth();

      this.distributeElements(
        this.horizontalAlignment,
        totalSize,
        this.dimension.getUsedWidth(),
        (child) => child.getWidth(),
        (child, value) => child.setWidth(value),
        (child, value) => child.setX(value),
        this.dimension.getLeftBoundary(),
        this.dimension.getRightOffset(totalSize)
      );
    } else {
      const totalSize = this.getHeight();

      this.distributeElements(
        this.verticalAlignment,
        totalSize,
        this.dimension.getUsedHeight(),
        (child) => child.getHeight(),
        (child, value) => child.setHeight(value),
        (child, value) => child.setY(value),
        this.dimension.getTopBoundary(),
        this.dimension.getBottomOffset(totalSize)
      );
    }
  }

  applyAlignment() {
    const isHorizontal = this.direction === Direction.HORIZONTAL;
    const totalSize = isHorizontal ? this.getHeight() : this.getWidth();

    if (isHorizontal) {
      this.alignElements(
        this.verticalAlignment,
        totalSize,
        (child) => child.getHeight(),
        (child, value) => child.setHeight(value),
        (child, value) => child.setY(value),
        this.dimension.getTopBoundary(),
        this.dimension.getBottomOffset(totalSize)
      );
    } else {
      this.alignElements(
        this.horizontalAlignment,
        totalSize,
        (child) => child.getWidth(),
        (child, value) => child.setWidth(value),
        (child, value) => child.setX(value),
        this.dimension.getLeftBoundary(),
        this.dimension.getRightOffset(totalSize)
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
    getChildSize: (child: ContentBoxElement) => number,
    setChildSize: (child: ContentBoxElement, value: number) => void,
    setChildPosition: (child: ContentBoxElement, value: number) => void,
    offsetBefore: number = 0,
    offsetAfter: number = 0
  ) {
    const spaceBetween = this.dimension.getSpaceBetween();
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
        const refSize = this.getSizeReference();

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
    getChildSize: (child: ContentBoxElement) => number,
    setChildSize: (child: ContentBoxElement, value: number) => void,
    setChildPosition: (child: ContentBoxElement, value: number) => void,
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
}
