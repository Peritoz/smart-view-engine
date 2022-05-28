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
}
