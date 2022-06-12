import { BaseElement } from "@libs/model/base_element";
import { Position } from "@libs/model/position";
import { LayoutGroup } from "@libs/engine/layout_engine/layout_builder/layout_group";

export class ContentBoxElement {
  content: LayoutGroup | BaseElement;
  onChangeWidth: (width: number) => void;
  onChangeHeight: (height: number) => void;

  constructor(
    baseElement: LayoutGroup | BaseElement,
    onChangeWidth: (width: number) => void,
    onChangeHeight: (height: number) => void
  ) {
    this.content = baseElement;
    this.onChangeWidth = onChangeWidth;
    this.onChangeHeight = onChangeHeight;
  }

  getWidth() {
    return this.content.getWidth();
  }

  setWidth(width: number) {
    this.content.setWidth(width);

    this.onChangeWidth(width);
  }

  getHeight() {
    return this.content.getHeight();
  }

  setHeight(height: number) {
    this.content.setHeight(height);

    this.onChangeHeight(height);
  }

  getX() {
    return this.content.getX();
  }

  setX(x: number) {
    this.content.setX(x);
  }

  getY() {
    return this.content.getY();
  }

  setY(y: number) {
    this.content.setY(y);
  }

  setPosition({ x, y }: Partial<Position>) {
    this.content.setPosition({ x, y });
  }

  getId() {
    return this.content.getId();
  }

  translatePosition(deltaX: number, deltaY: number) {
    this.content.translatePosition(deltaX, deltaY);
  }

  getContent() {
    return this.content;
  }
}
