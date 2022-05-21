import { Alignment } from "@libs/common/alignment.enum";
import { Settings } from "@libs/engine/layout_engine/settings";
import { LayoutRow } from "@libs/engine/layout_engine/layout_builder/layout_row";

export class VisibleLayoutRow extends LayoutRow {
  protected name: string;
  protected type: string;
  protected labelAreaWidth: number;
  protected labelAreaHeight: number;
  protected lateralLabel: boolean;

  constructor(
    mainAxisAlignment: Alignment,
    crossAxisAlignment: Alignment,
    settings: Settings,
    parentId: string | null,
    name: string,
    type: string,
    lateralLabel: boolean
  ) {
    super(mainAxisAlignment, crossAxisAlignment, settings, parentId, false);

    this.name = name;
    this.type = type;
    this.labelAreaWidth = settings.labelWidth;
    this.labelAreaHeight = settings.labelHeight;
    this.lateralLabel = lateralLabel;
  }

  getName() {
    return this.name;
  }

  getType() {
    return this.type;
  }

  getWidth() {
    if (this.lateralLabel) {
      return (
        super.getWidth() + this.labelAreaWidth + this.settings.spaceToOuterLabel
      );
    } else {
      return super.getWidth();
    }
  }

  getHeight() {
    if (!this.lateralLabel) {
      return (
        super.getHeight() +
        this.labelAreaHeight +
        this.settings.spaceToOuterLabel
      );
    } else {
      return super.getHeight();
    }
  }

  setWidth(value: number) {
    if (this.lateralLabel) {
      if (value > this.labelAreaWidth) {
        this.setUsefulWidth(
          value,
          this.labelAreaWidth + this.settings.spaceToOuterLabel
        );
      }
    } else {
      super.setWidth(value);
    }
  }

  setHeight(value: number) {
    if (!this.lateralLabel) {
      if (value > this.labelAreaHeight) {
        this.setUsefulHeight(
          value,
          this.labelAreaHeight + this.settings.spaceToOuterLabel
        );
      }
    } else {
      super.setHeight(value);
    }
  }

  translatePosition(deltaX: number, deltaY: number) {
    const paddingX = this.withoutPadding ? 0 : this.settings.leftPadding;
    const paddingY = this.withoutPadding ? 0 : this.settings.topPadding;

    this.translateElementGroupPosition(deltaX, deltaY);

    let childrenStartX;
    let childrenStartY;

    if (this.lateralLabel) {
      childrenStartX =
        this.getX() +
        paddingX +
        this.labelAreaWidth +
        this.settings.spaceToOuterLabel;
      childrenStartY = this.getY() + paddingY;
    } else {
      childrenStartX = this.getX() + paddingX;
      childrenStartY =
        this.getY() +
        paddingY +
        this.labelAreaHeight +
        this.settings.spaceToOuterLabel;
    }

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];

      child.translatePosition(childrenStartX, childrenStartY);
    }
  }
}
