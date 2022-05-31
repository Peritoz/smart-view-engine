import { Alignment } from "@libs/common/alignment.enum";
import { Settings } from "@libs/engine/layout_engine/settings";
import { BaseElement } from "@libs/model/base_element";
import { Direction } from "@libs/common/distribution.enum";
import { Block, Position } from "@libs/model/block";
import { ContentBox } from "@libs/engine/layout_engine/layout_builder/content_box";

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
  protected contentBox: ContentBox;
  protected sizeReference: number;
  protected subTreeCounting: number;

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
    this.contentBox = new ContentBox(
      0,
      0,
      distribution,
      horizontalAlignment,
      verticalAlignment,
      settings.spaceBetween
    ); // Content box limits
    this.sizeReference = 0; // Represents the size of each element (without padding between) that fulfill the group length
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
   * @param contentWidthOffset Difference between the content box width the total width
   */
  setWidth(value: number, contentWidthOffset: number = 0) {
    const currentWidth = this.getWidth();

    if (value > currentWidth) {
      super.setWidth(value);

      this.contentBox.setWidth(value - contentWidthOffset);
    } else {
      throw new Error("The new Width can´t be smaller than current Width");
    }
  }

  /**
   * Sets the total height of the Layout Element Group
   * @param value Total height value
   * @param contentHeightOffset Difference between the content box height the total height
   */
  setHeight(value: number, contentHeightOffset: number = 0) {
    const currentHeight = this.getHeight();

    if (value > currentHeight) {
      super.setHeight(value);

      this.contentBox.setHeight(value - contentHeightOffset);
    } else {
      throw new Error("The new Height can´t be smaller than current Height");
    }
  }

  addContainer(container: BaseElement | LayoutElementGroup) {
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
}
