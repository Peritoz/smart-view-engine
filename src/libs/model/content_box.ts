import { ContentBoxDimension } from "@libs/model/content_box_dimension";
import { BaseElement } from "@libs/model/base_element";
import { Direction } from "@libs/common/distribution.enum";
import { LayoutElementGroup } from "@libs/engine/layout_engine/layout_builder/layout_element_group";
import { Alignment } from "@libs/common/alignment.enum";

export class ContentBox {
  protected dimension: ContentBoxDimension;
  protected children: Array<LayoutElementGroup | BaseElement>;
  protected horizontalAlignment: Alignment;
  protected verticalAlignment: Alignment;
  protected direction: Direction;

  constructor(
    topBoundary: number,
    leftBoundary: number,
    horizontalAlignment: Alignment,
    verticalAlignment: Alignment,
    direction: Direction
  ) {
    this.dimension = new ContentBoxDimension(
      topBoundary,
      leftBoundary,
      topBoundary,
      leftBoundary,
      direction
    );
    this.children = [];
    this.horizontalAlignment = horizontalAlignment;
    this.verticalAlignment = verticalAlignment;
    this.direction = direction;
  }

  addContainer(container: BaseElement | LayoutElementGroup) {
    // Adding container as child
    this.children.push(container);

    // Adjusting content box dimensions
    this.dimension.addContent(container, this.children.length === 0);
  }
}
