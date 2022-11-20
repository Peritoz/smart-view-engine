import { DEFAULT } from '@libs/common/size_reference.const';

interface ScalarInterval {
  from: number;
  to: number;
}

export class ScalarDimension {
  protected interval: ScalarInterval;
  protected usedSize: number; // in points
  protected spaceBetween: number; // Points between elements
  public isFixed: boolean;

  constructor(
    interval: ScalarInterval,
    spaceBetween: number = DEFAULT.DEFAULT_PADDING,
    isFixed: boolean = false,
  ) {
    this.interval = interval;
    this.usedSize = 0;
    this.spaceBetween = spaceBetween;
    this.isFixed = isFixed;
  }

  getSize() {
    return this.interval.to - this.interval.from;
  }

  getUsedSize() {
    return this.usedSize;
  }

  getInitialValue() {
    return this.interval.from;
  }

  getFinalValue() {
    return this.interval.to;
  }

  setFinalValue(value: number) {
    if (value < this.interval.to) {
      throw new Error(
        `Dimension overflow. You cannot set a value that 
        decreases the dimension size`,
      );
    }

    this.interval.to = value;
  }

  setUsedSize(value: number) {
    const hasValueOverflow = value > this.getSize();

    if (this.isFixed && hasValueOverflow) {
      throw new Error(
        `Dimension overflow. Maximum size is ${this.getSize()}`,
      );
    }

    this.usedSize = value;

    if (!this.isFixed && hasValueOverflow) {
      this.interval.to = this.interval.to + this.usedSize - this.getSize();
    }
  }

  incrementSize(value: number, isFirstIncrement: boolean) {
    const spaceBetween = isFirstIncrement ? 0 : this.spaceBetween;
    this.setUsedSize(this.usedSize + value + spaceBetween);
  }
}