import { Alignment } from '@libs/common/alignment.enum';
import { Settings } from '@libs/engine/settings';
import { BaseElement } from '@libs/model/base_element';
import { Direction } from '@libs/common/distribution.enum';
import { Block } from '@libs/model/block';
import { ContentBox } from '@libs/engine/layout_engine/builder/groups/content_box/content_box';
import { Offset } from '@libs/model/offset';
import { Position } from '@libs/model/position';
import { Dimension } from '@libs/model/dimension';

const uniqId = require('uniqid');

export class LayoutGroup extends Block {
  protected id: string;
  protected externalId: string | null;
  protected parent: LayoutGroup | null;
  protected horizontalAlignment: Alignment;
  protected verticalAlignment: Alignment;
  protected contentBox: ContentBox;
  protected subTreeCounting: number;
  protected offset: Offset;

  constructor(
    externalId: string | null,
    horizontalAlignment: Alignment,
    verticalAlignment: Alignment,
    distribution: Direction,
    settings: Settings,
    offset: Offset,
    parent: LayoutGroup | null,
    initialDimension?: Partial<Dimension>,
  ) {
    super({
      x: 0,
      y: 0,
      width: initialDimension?.width !== undefined ? initialDimension.width : 0,
      height:
        initialDimension?.height !== undefined ? initialDimension.height : 0,
    });

    this.id = uniqId();
    this.externalId = externalId;
    this.parent = parent;
    this.horizontalAlignment = horizontalAlignment;
    this.verticalAlignment = verticalAlignment;
    this.contentBox = new ContentBox(
      0,
      0,
      distribution,
      horizontalAlignment,
      verticalAlignment,
      settings.spaceBetween,
      (oldValue, newValue) => {
        super.setWidth(
          newValue + this.offset.leftOffset + this.offset.rightOffset,
        );
      },
      (oldValue, newValue) => {
        super.setHeight(
          newValue + this.offset.topOffset + this.offset.bottomOffset,
        );
      },
      initialDimension,
    ); // Content box limits
    this.offset = {
      topOffset: offset.topOffset || 0,
      leftOffset: offset.leftOffset || 0,
      bottomOffset: offset.bottomOffset || 0,
      rightOffset: offset.rightOffset || 0,
    };
    this.subTreeCounting = -1; // Total number of elements inside the subtree formed by its children. Starts with -1 to not consider the element itself

    if (initialDimension !== undefined) {
      if (initialDimension!.width !== undefined) {
        if (initialDimension!.width > 0) {
          this.setWidth(initialDimension!.width);
        } else {
          throw new Error(
            'Layout group initial width should be greater than 0',
          );
        }
      }

      if (initialDimension!.height !== undefined) {
        if (initialDimension!.height > 0) {
          this.setHeight(initialDimension!.height);
        } else {
          throw new Error(
            'Layout group initial height should be greater than 0',
          );
        }
      }
    } else if (
      distribution === Direction.HORIZONTAL &&
      horizontalAlignment === Alignment.EXPANDED
    ) {
      throw new Error(
        'Layout group with Expanded Horizontal Alignment. Width should be defined during the construction.',
      );
    } else if (
      distribution === Direction.VERTICAL &&
      verticalAlignment === Alignment.EXPANDED
    ) {
      throw new Error(
        'Layout group with Expanded Vertical Alignment. Height should be defined during the construction.',
      );
    }
  }

  getId() {
    return this.id;
  }

  getExternalId(): string | null {
    return this.externalId;
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

  getContentBox(): ContentBox {
    return this.contentBox;
  }

  getChildren() {
    return this.contentBox.getChildren();
  }

  setParent(parent: LayoutGroup) {
    this.parent = parent;
  }

  /**
   * Sets the total width of the Layout Element Group
   * @param value Total width value
   */
  setWidth(value: number) {
    const currentWidth = super.getWidth();

    if (value >= currentWidth) {
      if (value > currentWidth) {
        super.setWidth(value);

        this.contentBox.setWidth(
          value - (this.offset.leftOffset + this.offset.rightOffset),
        );
      }
    } else {
      throw new Error('The new Width can´t be smaller than current Width');
    }
  }

  /**
   * Sets the total height of the Layout Element Group
   * @param value Total height value
   */
  setHeight(value: number) {
    const currentHeight = super.getHeight();

    if (value >= currentHeight) {
      if (value > currentHeight) {
        super.setHeight(value);

        this.contentBox.setHeight(
          value - (this.offset.topOffset + this.offset.bottomOffset),
        );
      }
    } else {
      throw new Error('The new Height can´t be smaller than current Height');
    }
  }

  addContainer(container: BaseElement | LayoutGroup) {
    if (container) {
      const isBaseElement = container instanceof BaseElement;

      this.contentBox.addContainer(container);

      // Setting parent
      if (isBaseElement) {
        container.setParentId(this.id);
      } else {
        (container as LayoutGroup).setParent(this);
      }
    }
  }

  adjustWidthToContent() {
    const candidateWidth =
      this.contentBox.getWidth() +
      this.offset.leftOffset +
      this.offset.rightOffset;

    if (super.getWidth() !== candidateWidth) {
      this.setWidth(candidateWidth);

      if (this.parent) {
        this.parent.adjustWidthToContent();
      }
    }
  }

  adjustHeightToContent() {
    const candidateHeight =
      this.contentBox.getHeight() +
      this.offset.topOffset +
      this.offset.bottomOffset;

    if (super.getHeight() !== candidateHeight) {
      this.setHeight(candidateHeight);

      if (this.parent) {
        this.parent.adjustWidthToContent();
      }
    }
  }

  incrementSubTreeCounting() {
    this.subTreeCounting++;
  }

  setAbsolutePosition({ x, y }: Partial<Position>) {
    super.setPosition({ x, y });
    this.toAbsolutePosition();
  }

  /**
   * Applies translation over the position of the element and its nested children
   * @param deltaX Number of points to be translated on the X axis
   * @param deltaY Number of points to be translated on the Y axis
   */
  translatePosition(deltaX: number, deltaY: number) {
    const newX = super.getX() + deltaX;
    const newY = super.getY() + deltaY;

    this.setAbsolutePosition({ x: newX, y: newY });
  }

  /**
   * Calculates the absolute position for layout groups that aren't rendered elements (Rows and Cols)
   */
  toAbsolutePosition(initialX: number = 0, initialY: number = 0) {
    this.contentBox.translateChildrenPosition(
      initialX + super.getX(),
      initialY + super.getY(),
    );
  }
}
