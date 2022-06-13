import { Direction } from "@libs/common/distribution.enum";
import { DEFAULT } from "@libs/common/size_reference.const";
import { Dimension } from "@libs/model/dimension";

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
  protected spaceBetween: number;
  protected maxChildWidth: number;
  protected maxChildHeight: number;
  protected hasFixedWidth: boolean;
  protected hasFixedHeight: boolean;

  /**
   * Constructs an instance of ContentBoxDimension
   * @param top Top boundary position for the content area
   * @param left Left boundary position for the content area
   * @param direction Direction of content expansion
   * @param spaceBetween Length between content elements
   * @param hasFixedWidth Flag to handle the width as a fixed dimension
   * @param hasFixedHeight Flag to handle the height as a fixed dimension
   * @param dimension Maximum dimension (Width or/and Height) for the content area. If passed, the dimension will be fixed
   */
  constructor(
    top: number = DEFAULT.DEFAULT_PADDING,
    left: number = DEFAULT.DEFAULT_PADDING,
    direction: Direction = Direction.HORIZONTAL,
    spaceBetween: number = DEFAULT.DEFAULT_PADDING,
    hasFixedWidth: boolean,
    hasFixedHeight: boolean,
    dimension?: Partial<Dimension>
  ) {
    if (hasFixedWidth && dimension?.width === undefined) {
      throw new Error("Has fixed width but no width was indicated");
    }

    if (hasFixedHeight && dimension?.height === undefined) {
      throw new Error("Has fixed height but no height was indicated");
    }

    this.topLeft = { x: left, y: top };
    this.bottomRight = {
      x: hasFixedWidth ? dimension!.width! + left : left,
      y: hasFixedHeight ? dimension!.height! + top : top,
    };
    this.usedWidth = 0;
    this.usedHeight = 0;
    this.direction = direction;
    this.spaceBetween = spaceBetween;
    this.maxChildWidth = 0; // Represents the width of the biggest child
    this.maxChildHeight = 0; // Represents the height of the biggest child
    this.hasFixedWidth = hasFixedWidth;
    this.hasFixedHeight = hasFixedHeight;
  }

  getContentBoxWidth(): number {
    return this.bottomRight.x - this.topLeft.x;
  }

  getContentBoxHeight(): number {
    return this.bottomRight.y - this.topLeft.y;
  }

  getSpaceBetween(): number {
    return this.spaceBetween;
  }

  setContentBoxWidth(width: number) {
    if (!this.hasFixedWidth) {
      const currentContentWidth = this.getContentBoxWidth();

      if (width >= currentContentWidth) {
        this.bottomRight.x = this.bottomRight.x + width - currentContentWidth;
      } else {
        throw new Error(
          "The new content box width can not be smaller than previous value"
        );
      }
    } else {
      throw new Error(
        "It is not possible to update the width of a Content box dimension with fixed width"
      );
    }
  }

  setContentBoxHeight(height: number) {
    if (!this.hasFixedHeight) {
      const currentContentHeight = this.getContentBoxHeight();

      if (height >= currentContentHeight) {
        this.bottomRight.y = this.bottomRight.y + height - currentContentHeight;
      } else {
        throw new Error(
          "The new content box height can not be smaller than previous value"
        );
      }
    } else {
      throw new Error(
        "It is not possible to update the height of a Content box dimension with fixed height"
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
    if (this.hasFixedWidth && value > this.getContentBoxWidth()) {
      throw new Error(
        `Content box dimension width overflow. Maximum width is ${this.getContentBoxWidth()}`
      );
    }

    this.usedWidth = value;

    if (!this.hasFixedWidth) {
      this.setRightBoundary(
        this.bottomRight.x + this.usedWidth - this.getContentBoxWidth()
      );
    }
  }

  setUsedHeight(value: number) {
    if (this.hasFixedHeight && value > this.getContentBoxHeight()) {
      throw new Error(
        `Content box dimension height overflow. Maximum height is ${this.getContentBoxHeight()}`
      );
    }

    this.usedHeight = value;

    if (!this.hasFixedHeight) {
      this.setBottomBoundary(
        this.bottomRight.y + this.usedHeight - this.getContentBoxHeight()
      );
    }
  }

  getBiggestContentWidth(): number {
    return this.maxChildWidth;
  }

  getBiggestContentHeight(): number {
    return this.maxChildHeight;
  }

  incrementWidth(value: number, isFirstContent: boolean) {
    const spaceBetween = isFirstContent ? 0 : this.spaceBetween;
    this.setUsedWidth(this.usedWidth + value + spaceBetween);

    // Updating maximum element width
    if (value > this.maxChildWidth) {
      this.maxChildWidth = value;
    }
  }

  incrementHeight(value: number, isFirstContent: boolean) {
    const spaceBetween = isFirstContent ? 0 : this.spaceBetween;
    this.setUsedHeight(this.usedHeight + value + spaceBetween);

    // Updating maximum element height
    if (value > this.maxChildHeight) {
      this.maxChildHeight = value;
    }
  }

  addContent(content: Dimension, isFirstContent: boolean = false) {
    const isHorizontal = this.direction === Direction.HORIZONTAL;

    if (isHorizontal) {
      this.incrementWidth(content.width, isFirstContent);

      if (content.height > this.usedHeight) {
        this.setUsedHeight(content.height);
      }
    } else {
      this.incrementHeight(content.height, isFirstContent);

      if (content.width > this.usedWidth) {
        this.setUsedWidth(content.width);
      }
    }
  }
}
