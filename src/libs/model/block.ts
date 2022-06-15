import { DEFAULT } from "@libs/common/size_reference.const";
import { Position } from "@libs/model/position";
import { PositionalElement } from "@libs/model/positional_element";
import { ResizableElement } from "@libs/model/resizable_element";

type PlotElement = PositionalElement & ResizableElement;

export abstract class Block implements PlotElement {
  x: number;
  y: number;
  width: number;
  height: number;
  onChangeWidth: (oldValue: number, newValue: number) => void;
  onChangeHeight: (oldValue: number, newValue: number) => void;

  protected constructor(
    { x, y, width, height }: Partial<PlotElement>,
    onChangeWidth: (oldValue: number, newValue: number) => void = () => {},
    onChangeHeight: (oldValue: number, newValue: number) => void = () => {}
  ) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width !== undefined ? width : DEFAULT.DEFAULT_WIDTH; // TODO: Get from a singleton the set default value
    this.height = height !== undefined ? height : DEFAULT.DEFAULT_HEIGHT; // TODO: Get from a singleton the set default value
    this.onChangeWidth = onChangeWidth;
    this.onChangeHeight = onChangeHeight;
  }

  subscribeOnChangeWidthHandler(
    handler: (oldValue: number, newValue: number) => void
  ) {
    this.onChangeWidth = handler;
  }

  subscribeOnChangeHeightHandler(
    handler: (oldValue: number, newValue: number) => void
  ) {
    this.onChangeHeight = handler;
  }

  getWidth() {
    return this.width;
  }

  setWidth(width: number) {
    if (width >= 0) {
      const oldWidth = this.width;

      this.width = width;

      this.onChangeWidth(oldWidth, width);
    } else {
      throw new Error("Width cannot be negative");
    }
  }

  getHeight() {
    return this.height;
  }

  setHeight(height: number) {
    if (height >= 0) {
      const oldHeight = this.height;

      this.height = height;

      this.onChangeHeight(oldHeight, height);
    } else {
      throw new Error("Height cannot be negative");
    }
  }

  getX() {
    return this.x;
  }

  setX(x: number) {
    this.x = x;
  }

  getY() {
    return this.y;
  }

  setY(y: number) {
    this.y = y;
  }

  setPosition({ x, y }: Partial<Position>) {
    if (x !== undefined) {
      this.setX(x);
    }

    if (y !== undefined) {
      this.setY(y);
    }
  }
}
