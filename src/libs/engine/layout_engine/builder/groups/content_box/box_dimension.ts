import { DEFAULT } from '@libs/common/size_reference.const';
import { Dimension } from '@libs/model/dimension';

interface Point {
  x: number;
  y: number;
}

export class BoxDimension {
  protected topLeft: Point; // Top left point to define the start X and Y box's limits
  protected bottomRight: Point; // Bottom right point to define the end X and Y box's limits

  /**
   * Constructs an instance of ContentBoxDimension
   * @param top Top boundary position for the content area
   * @param left Left boundary position for the content area
   * @param dimension Maximum dimension (Width or/and Height) for the content area. If passed, the dimension will be fixed
   */
  constructor(
    top: number = DEFAULT.DEFAULT_PADDING,
    left: number = DEFAULT.DEFAULT_PADDING,
    dimension?: Partial<Dimension>,
  ) {
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
  }

  getContentBoxWidth(): number {
    return this.bottomRight.x - this.topLeft.x;
  }

  getContentBoxHeight(): number {
    return this.bottomRight.y - this.topLeft.y;
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
}