import { DEFAULT } from "@libs/common/size_reference.const";
import { Position } from "@libs/model/position";
import { Dimension } from "@libs/model/dimension";

type PositionalElement = Position & Dimension;

export abstract class Block implements Position, Dimension {
  x: number;
  y: number;
  width: number;
  height: number;

  protected constructor({ x, y, width, height }: Partial<PositionalElement>) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width !== undefined ? width : DEFAULT.DEFAULT_WIDTH; // TODO: Get from a singleton the set default value
    this.height = height !== undefined ? height : DEFAULT.DEFAULT_HEIGHT; // TODO: Get from a singleton the set default value
  }

  getWidth() {
    return this.width;
  }

  setWidth(width: number) {
    if (width >= 0) {
      this.width = width;
    } else {
      throw new Error("Width cannot be negative");
    }
  }

  getHeight() {
    return this.height;
  }

  setHeight(height: number) {
    if (height >= 0) {
      this.height = height;
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
