import { Direction } from "@libs/common/distribution.enum";
import { DEFAULT } from "@libs/common/size_reference.const";
import { Dimension } from "@libs/model/dimension";

interface Point {
  x: number;
  y: number;
}

/**
 * Content Box Dimension manages the changes in the used width and height, as well as the limits (max width and height)
 * of a virtual box
 */
export class ContentBoxDimension {
  protected topLeft: Point; // Top left point to define the start X and Y box's limits
  protected bottomRight: Point; // Bottom right point to define the end X and Y box's limits
  protected usedWidth: number; // Current horizontal size used (in points)
  protected usedHeight: number; // Current vertical size used (in points)
  protected direction: Direction; // Indicates the main axis direction: Horizontal or Vertical
  protected spaceBetween: number; // Points between elements
  protected maxChildWidth: number; // Width of the biggest element
  protected maxChildHeight: number; // Height of the biggest element
  protected hasFixedWidth: boolean; // Indicates if the width is fixed or flexible; Flexible width will be adjusted when adding elements
  protected hasFixedHeight: boolean; // Indicates if the height is fixed or flexible; Flexible height will be adjusted when adding elements

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
      x:
        dimension && dimension.width !== undefined
          ? dimension!.width + left
          : left,
      y:
        dimension && dimension.height !== undefined
          ? dimension!.height + top
          : top,
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
    const hasValueOverflow = value > this.getContentBoxWidth();

    if (this.hasFixedWidth && hasValueOverflow) {
      throw new Error(
        `Content box dimension width overflow. Maximum width is ${this.getContentBoxWidth()}`
      );
    }

    this.usedWidth = value;

    if (!this.hasFixedWidth && hasValueOverflow) {
      this.setRightBoundary(
        this.bottomRight.x + this.usedWidth - this.getContentBoxWidth()
      );
    }
  }

  setUsedHeight(value: number) {
    const hasValueOverflow = value > this.getContentBoxHeight();

    if (this.hasFixedHeight && hasValueOverflow) {
      throw new Error(
        `Content box dimension height overflow. Maximum height is ${this.getContentBoxHeight()}`
      );
    }

    this.usedHeight = value;

    if (!this.hasFixedHeight && hasValueOverflow) {
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

  addContent(
    content: Dimension,
    isFirstContent: boolean = false,
    onChangeWidth: (oldValue: number, newValue: number) => void = () => {},
    onChangeHeight: (oldValue: number, newValue: number) => void = () => {}
  ) {
    const oldWidth = this.getContentBoxWidth();
    const oldHeight = this.getContentBoxHeight();
    const isHorizontal = this.direction === Direction.HORIZONTAL;

    if (isHorizontal) {
      this.incrementWidth(content.width, isFirstContent);

      onChangeWidth(oldWidth, this.getContentBoxWidth());

      if (content.height > this.usedHeight) {
        this.setUsedHeight(content.height);

        onChangeHeight(oldHeight, this.getContentBoxHeight());
      }
    } else {
      this.incrementHeight(content.height, isFirstContent);

      onChangeHeight(oldHeight, this.getContentBoxHeight());

      if (content.width > this.usedWidth) {
        this.setUsedWidth(content.width);

        onChangeWidth(oldWidth, this.getContentBoxWidth());
      }
    }
  }
}
