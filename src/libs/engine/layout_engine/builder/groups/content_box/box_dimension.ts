import { DEFAULT } from '@libs/common/size_reference.const';
import { Dimension } from '@libs/model/dimension';
import { ScalarDimension } from '@libs/engine/layout_engine/builder/groups/content_box/scalar_dimension';

export class BoxDimension {
  protected xAxis: ScalarDimension;
  protected yAxis: ScalarDimension;

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
    this.xAxis = new ScalarDimension({
      from: left, to: dimension && dimension.width !== undefined
        ? dimension!.width + left
        : left,
    });
    this.yAxis = new ScalarDimension({
      from: top, to: dimension && dimension.height !== undefined
        ? dimension!.height + top
        : top,
    });
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
}