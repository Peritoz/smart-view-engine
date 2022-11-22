import { DEFAULT } from '@libs/common/size_reference.const';
import { Dimension } from '@libs/model/dimension';
import { ScalarDimension } from '@libs/engine/layout_engine/builder/groups/content_box/scalar_dimension';

export interface BoxManager {
  getTopBoundary(): number;

  getLeftBoundary(): number;

  getBottomBoundary(): number;

  getRightBoundary(): number;

  getRightOffset(width: number): void;

  getBottomOffset(height: number): void;
}

export class BoxDimension implements BoxManager {
  protected xAxis: ScalarDimension;
  protected yAxis: ScalarDimension;
  protected spaceBetween: number;

  /**
   * Constructs an instance of ContentBoxDimension
   * @param top Top boundary position for the content area
   * @param left Left boundary position for the content area
   * @param spaceBetween Length between content elements
   * @param hasFixedWidth Flag to handle the width as a fixed dimension
   * @param hasFixedHeight Flag to handle the height as a fixed dimension
   * @param dimension Maximum dimension (Width or/and Height) for the content area. If passed, the dimension will be fixed
   */
  constructor(
    top: number = DEFAULT.DEFAULT_PADDING,
    left: number = DEFAULT.DEFAULT_PADDING,
    spaceBetween: number = DEFAULT.DEFAULT_PADDING,
    hasFixedWidth: boolean = false,
    hasFixedHeight: boolean = false,
    dimension?: Partial<Dimension>,
  ) {
    this.spaceBetween = spaceBetween;
    this.xAxis = new ScalarDimension({
        from: left, to: dimension && dimension.width !== undefined
          ? dimension!.width + left
          : left,
      },
      spaceBetween,
      hasFixedWidth,
    );
    this.yAxis = new ScalarDimension({
        from: top, to: dimension && dimension.height !== undefined
          ? dimension!.height + top
          : top,
      },
      spaceBetween,
      hasFixedHeight,
    );
  }

  getContentBoxWidth(): number {
    return this.xAxis.getSize();
  }

  getContentBoxHeight(): number {
    return this.yAxis.getSize();
  }

  getTopBoundary(): number {
    return this.yAxis.getInitialValue();
  }

  getLeftBoundary(): number {
    return this.xAxis.getInitialValue();
  }

  getBottomBoundary(): number {
    return this.yAxis.getFinalValue();
  }

  getRightBoundary(): number {
    return this.xAxis.getFinalValue();
  }

  getRightOffset(width: number) {
    return width - this.xAxis.getFinalValue();
  }

  getBottomOffset(height: number) {
    return height - this.yAxis.getFinalValue();
  }

  setBottomBoundary(value: number) {
    this.yAxis.setFinalValue(value);
  }

  setRightBoundary(value: number) {
    this.xAxis.setFinalValue(value);
  }

  getUsedWidth() {
    return this.xAxis.getUsedSize();
  }

  setUsedWidth(value: number) {
    this.xAxis.setUsedSize(value);
  }

  getUsedHeight() {
    return this.yAxis.getUsedSize();
  }

  setUsedHeight(value: number) {
    this.yAxis.setUsedSize(value);
  }

  getSpaceBetween() {
    return this.spaceBetween;
  }

  setWidth(width: number) {
    if (!this.xAxis.isFixed) {
      const currentContentWidth = this.getContentBoxWidth();

      if (width >= currentContentWidth) {
        this.setRightBoundary(
          this.getRightBoundary() + width - currentContentWidth,
        );
      } else {
        throw new Error(
          'The new content box width can not be smaller than previous value',
        );
      }
    } else {
      throw new Error(
        'It is not possible to update the width of a Content box dimension with fixed width',
      );
    }
  }

  setHeight(height: number) {
    if (!this.yAxis.isFixed) {
      const currentContentHeight = this.getContentBoxHeight();

      if (height >= currentContentHeight) {
        this.setBottomBoundary(
          this.getBottomBoundary() + height - currentContentHeight,
        );
      } else {
        throw new Error(
          'The new content box height can not be smaller than previous value',
        );
      }
    } else {
      throw new Error(
        'It is not possible to update the height of a Content box dimension with fixed height',
      );
    }
  }

  incrementWidth(value: number, isFirstContent: boolean) {
    this.xAxis.incrementSize(value, isFirstContent);
  }

  incrementHeight(value: number, isFirstContent: boolean) {
    this.yAxis.incrementSize(value, isFirstContent);
  }
}