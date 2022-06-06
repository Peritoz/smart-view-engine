import { Alignment } from "@libs/common/alignment.enum";
import { Settings } from "@libs/engine/layout_engine/settings";
import { BaseElement } from "@libs/model/base_element";
import { Direction } from "@libs/common/distribution.enum";
import { Block } from "@libs/model/block";
import { ContentBox } from "@libs/engine/layout_engine/layout_builder/content_box";
import { Offset } from "@libs/model/offset";
import { Position } from "@libs/model/position";

const uniqId = require("uniqid");

export class LayoutGroup extends Block {
  protected id: string;
  protected horizontalAlignment: Alignment;
  protected verticalAlignment: Alignment;
  protected contentBox: ContentBox;
  protected subTreeCounting: number;
  protected offset: Offset;

  constructor(
    horizontalAlignment: Alignment,
    verticalAlignment: Alignment,
    distribution: Direction,
    settings: Settings
  ) {
    super({ x: 0, y: 0, width: 0, height: 0 });

    this.id = uniqId();
    this.horizontalAlignment = horizontalAlignment;
    this.verticalAlignment = verticalAlignment;
    this.contentBox = new ContentBox(
      0,
      0,
      distribution,
      horizontalAlignment,
      verticalAlignment,
      settings.spaceBetween
    ); // Content box limits
    this.offset = {
      topOffset: 0,
      leftOffset: 0,
      bottomOffset: 0,
      rightOffset: 0,
    };
    this.subTreeCounting = -1; // Total number of elements inside the subtree formed by its children. Starts with -1 to not consider the element itself
  }

  getId() {
    return this.id;
  }

  getSubTreeCounting() {
    return this.subTreeCounting;
  }

  getChildAtIndex(index: number) {
    return this.contentBox.getChildAtIndex(index);
  }

  getChildrenLength() {
    return this.contentBox.getChildrenCount();
  }

  getChildren() {
    return this.contentBox.getChildren();
  }

  setPosition({ x, y }: Partial<Position>) {
    const deltaX = x !== undefined ? x - this.getX() : 0;
    const deltaY = y !== undefined ? y - this.getY() : 0;

    super.setPosition({ x, y });
    this.contentBox.translateChildrenPosition(deltaX, deltaY);
  }

  /**
   * Sets the total width of the Layout Element Group
   * @param value Total width value
   */
  setWidth(value: number) {
    const currentWidth = this.getWidth();

    if (value > currentWidth) {
      super.setWidth(value);

      this.contentBox.setWidth(
        value - (this.offset.leftOffset + this.offset.rightOffset)
      );
    } else {
      throw new Error("The new Width can´t be smaller than current Width");
    }
  }

  /**
   * Sets the total height of the Layout Element Group
   * @param value Total height value
   */
  setHeight(value: number) {
    const currentHeight = this.getHeight();

    if (value > currentHeight) {
      super.setHeight(value);

      this.contentBox.setHeight(
        value - (this.offset.topOffset + this.offset.bottomOffset)
      );
    } else {
      throw new Error("The new Height can´t be smaller than current Height");
    }
  }

  addContainer(container: BaseElement | LayoutGroup) {
    if (container) {
      const isBaseElement = container instanceof BaseElement;

      // Checking horizontal alignment compatibility
      if (!isBaseElement) {
        if (
          this.horizontalAlignment === Alignment.EXPANDED &&
          (container as LayoutGroup).horizontalAlignment !== Alignment.EXPANDED
        ) {
          throw new Error(
            `Cannot insert container. The container has EXPANDED horizontal alignment and should be 
            added only to containers with EXPANDED horizontal alignment`
          );
        }

        // Checking vertical alignment compatibility
        if (
          this.verticalAlignment === Alignment.EXPANDED &&
          (container as LayoutGroup).verticalAlignment !== Alignment.EXPANDED
        ) {
          throw new Error(
            `Cannot insert container. The container has EXPANDED vertical alignment and should be 
            added only to containers with EXPANDED vertical alignment`
          );
        }
      }

      this.contentBox.addContainer(container);

      // Setting parent
      if (isBaseElement) {
        container.setParentId(this.id);
      }
    }
  }

  incrementSubTreeCounting() {
    this.subTreeCounting++;
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

  /**
   * Calculates the absolute position for layout groups that aren't rendered elements (Rows and Cols)
   */
  toAbsolutePosition() {
    this.contentBox.translateChildrenPosition(this.getX(), this.getY());
  }
}