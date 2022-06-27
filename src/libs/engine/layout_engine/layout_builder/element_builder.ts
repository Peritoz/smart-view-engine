import { DEFAULT } from "@libs/common/size_reference.const";
import { ViewNode } from "@libs/model/view_node";
import { BaseElement } from "@libs/model/base_element";

export class ElementBuilder {
  constructor(protected sizeUnit: number = DEFAULT.SIZE_UNIT) {}

  buildElement(node: ViewNode): BaseElement {
    return new BaseElement(node);
  }

  buildTinyElement(
    name: string,
    type: string,
    externalId?: string
  ): BaseElement {
    return new BaseElement({
      name,
      type,
      width: this.sizeUnit,
      height: this.sizeUnit,
      x: 0,
      y: 0,
      parentId: null,
      externalId,
    });
  }

  buildSmallElement(
    name: string,
    type: string,
    verticalOrientation: boolean,
    externalId?: string
  ): BaseElement {
    if (verticalOrientation) {
      return new BaseElement({
        name,
        type,
        width: this.sizeUnit,
        height: 2 * this.sizeUnit,
        x: 0,
        y: 0,
        parentId: null,
        externalId,
      });
    } else {
      return new BaseElement({
        name,
        type,
        width: 2 * this.sizeUnit,
        height: this.sizeUnit,
        x: 0,
        y: 0,
        parentId: null,
        externalId,
      });
    }
  }

  buildMediumElement(
    name: string,
    type: string,
    verticalOrientation: boolean,
    externalId?: string
  ): BaseElement {
    if (verticalOrientation) {
      return new BaseElement({
        name,
        type,
        width: this.sizeUnit,
        height: 3 * this.sizeUnit,
        x: 0,
        y: 0,
        parentId: null,
        externalId,
      });
    } else {
      return new BaseElement({
        name,
        type,
        width: 3 * this.sizeUnit,
        height: this.sizeUnit,
        x: 0,
        y: 0,
        parentId: null,
        externalId,
      });
    }
  }

  buildBigElement(
    name: string,
    type: string,
    verticalOrientation: boolean,
    externalId?: string
  ): BaseElement {
    if (verticalOrientation) {
      return new BaseElement({
        name,
        type,
        width: this.sizeUnit,
        height: 4 * this.sizeUnit,
        x: 0,
        y: 0,
        parentId: null,
        externalId,
      });
    } else {
      return new BaseElement({
        name,
        type,
        width: 4 * this.sizeUnit,
        height: this.sizeUnit,
        x: 0,
        y: 0,
        parentId: null,
        externalId,
      });
    }
  }
}
