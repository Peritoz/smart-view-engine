import { Direction } from "@libs/common/distribution.enum";
import { Dimension } from "@libs/model/block";
import { DEFAULT } from "@libs/common/size_reference.const";

interface Point {
  x: number;
  y: number;
}

export class ContentBoxDimension {
  protected topLeft: Point;
  protected bottomRight: Point;
  protected usedWidth: number;
  protected usedHeight: number;
  protected direction: Direction;
  protected spaceBetweenContent: number;

  constructor(
    top: number,
    left: number,
    bottom: number,
    right: number,
    direction: Direction,
    spaceBetweenContent: number = DEFAULT.DEFAULT_PADDING
  ) {
    this.topLeft = { x: left, y: top };
    this.bottomRight = { x: right, y: bottom };
    this.usedWidth = 0;
    this.usedHeight = 0;
    this.direction = direction;
    this.spaceBetweenContent = spaceBetweenContent;
  }

  getContentBoxWidth(): number {
    return this.bottomRight.x - this.topLeft.x;
  }

  getContentBoxHeight(): number {
    return this.bottomRight.y - this.topLeft.y;
  }

  setContentBoxWidth(width: number) {
    const currentContentWidth = this.getContentBoxWidth();

    if (width >= currentContentWidth) {
      this.bottomRight.x = this.bottomRight.x + width - currentContentWidth;
    } else {
      throw new Error(
        "The new content box width can not be smaller than previous value"
      );
    }
  }

  setContentBoxHeight(height: number) {
    const currentContentHeight = this.getContentBoxHeight();

    if (height >= currentContentHeight) {
      this.bottomRight.y = this.bottomRight.y + height - currentContentHeight;
    } else {
      throw new Error(
        "The new content box height can not be smaller than previous value"
      );
    }
  }

  getTopBoundary(): number {
    return this.topLeft.y;
  }

  getLeftBoundary(): number {
    return this.topLeft.x;
  }

  getBottomBoundary(): number {
    return this.bottomRight.y;
  }

  getRightBoundary(): number {
    return this.bottomRight.x;
  }

  getUsedWidth(): number {
    return this.usedWidth;
  }

  getUsedHeight(): number {
    return this.usedHeight;
  }

  getTotalWidthOffset(width: number) {
    return width - this.bottomRight.x + this.topLeft.x;
  }

  getTotalHeightOffset(height: number) {
    return height - this.bottomRight.y + this.topLeft.y;
  }

  getRightOffset(width: number) {
    return width - this.bottomRight.x;
  }

  getBottomOffset(height: number) {
    return height - this.bottomRight.y;
  }

  setBottomBoundary(value: number) {
    this.bottomRight.y = value;
  }

  setRightBoundary(value: number) {
    this.bottomRight.x = value;
  }

  setUsedWidth(value: number) {
    this.usedWidth = value;
  }

  setUsedHeight(value: number) {
    this.usedHeight = value;
  }

  addContent(content: Dimension, isFirstContent: boolean = false) {
    const currentContentWidth = this.getContentBoxWidth();
    const currentContentHeight = this.getContentBoxHeight();
    const spaceBetween = isFirstContent ? 0 : this.spaceBetweenContent;

    if (this.direction === Direction.HORIZONTAL) {
      // Processing main axis size adjustments
      this.usedWidth += content.width + spaceBetween;

      if (this.usedWidth > currentContentWidth) {
        this.setRightBoundary(
          this.getRightBoundary() + this.usedWidth - currentContentWidth
        );
      }

      // Setting cross axis size
      if (content.height > this.getUsedHeight()) {
        this.usedHeight = content.height;

        this.setBottomBoundary(
          this.getBottomBoundary() + this.usedHeight - currentContentHeight
        );
      }
    } else {
      // Processing main axis size adjustments
      this.usedHeight += content.height + spaceBetween;

      if (this.usedHeight > currentContentHeight) {
        this.setBottomBoundary(
          this.getBottomBoundary() + this.usedHeight - currentContentHeight
        );
      }

      // Setting cross axis size
      if (content.width > this.getUsedWidth()) {
        this.usedWidth = content.width;

        this.setRightBoundary(
          this.getRightBoundary() + this.usedWidth - currentContentWidth
        );
      }
    }
  }
}