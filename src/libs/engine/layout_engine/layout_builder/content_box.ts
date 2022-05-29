import { ContentBoxDimension } from "@libs/model/content_box_dimension";
import { BaseElement } from "@libs/model/base_element";
import { Direction } from "@libs/common/distribution.enum";
import { LayoutElementGroup } from "@libs/engine/layout_engine/layout_builder/layout_element_group";
import { Alignment } from "@libs/common/alignment.enum";
import { DEFAULT } from "@libs/common/size_reference.const";

export class ContentBox {
  protected dimension: ContentBoxDimension;
  protected children: Array<LayoutElementGroup | BaseElement>;
  protected horizontalAlignment: Alignment;
  protected verticalAlignment: Alignment;
  protected direction: Direction;

  constructor(
    topBoundary: number = DEFAULT.DEFAULT_PADDING,
    leftBoundary: number = DEFAULT.DEFAULT_PADDING,
    direction: Direction = Direction.HORIZONTAL,
    horizontalAlignment: Alignment = Alignment.START,
    verticalAlignment: Alignment = Alignment.START,
    spaceBetween: number = DEFAULT.DEFAULT_PADDING
  ) {
    this.dimension = new ContentBoxDimension(
      topBoundary,
      leftBoundary,
      topBoundary,
      leftBoundary,
      direction,
      spaceBetween
    );
    this.children = [];
    this.horizontalAlignment = horizontalAlignment;
    this.verticalAlignment = verticalAlignment;
    this.direction = direction;
  }

  getChildren(): Array<LayoutElementGroup | BaseElement> {
    return this.children;
  }

  addContainer(container: BaseElement | LayoutElementGroup) {
    // Adding container as child
    this.children.push(container);

    // Adjusting content box dimensions
    this.dimension.addContent(container, this.children.length === 0);
  }

  setWidth(value: number) {
    this.dimension.setContentBoxWidth(value);
  }

  setHeight(value: number) {
    this.dimension.setContentBoxHeight(value);
  }

  getWidth(): number {
    return this.dimension.getContentBoxWidth();
  }

  getHeight(): number {
    return this.dimension.getContentBoxHeight();
  }

  getSizeReference(childrenCount: number): number {
    let usefulArea = 0;

    if (this.direction === Direction.HORIZONTAL) {
      usefulArea =
        this.dimension.getContentBoxWidth() -
        childrenCount * this.dimension.getSpaceBetween();
    } else {
      usefulArea =
        this.dimension.getContentBoxHeight() -
        childrenCount * this.dimension.getSpaceBetween();
    }

    return Math.floor(usefulArea / childrenCount);
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
    const refSize = this.getSizeReference(this.children.length + 1);
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
}
