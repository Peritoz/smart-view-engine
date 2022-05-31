import { Alignment } from "@libs/common/alignment.enum";
import { Settings } from "@libs/engine/layout_engine/settings";
import { LayoutRow } from "@libs/engine/layout_engine/layout_builder/layout_row";
import { ContentBoxDimension } from "@libs/model/content_box_dimension";
import { Direction } from "@libs/common/distribution.enum";
import { ContentBox } from "@libs/engine/layout_engine/layout_builder/content_box";

export class VisibleLayoutRow extends LayoutRow {
  protected name: string;
  protected type: string;
  protected labelAreaWidth: number;
  protected labelAreaHeight: number;
  protected lateralLabel: boolean;

  constructor(
    horizontalAlignment: Alignment,
    verticalAlignment: Alignment,
    settings: Settings,
    name: string,
    type: string,
    lateralLabel: boolean
  ) {
    super(horizontalAlignment, verticalAlignment, settings);

    this.name = name;
    this.type = type;
    this.labelAreaWidth = settings.labelWidth;
    this.labelAreaHeight = settings.labelHeight;
    this.lateralLabel = lateralLabel;

    // Initializing content box
    this.contentBox = new ContentBox(
      this.getInitialYPosition(),
      this.getInitialXPosition(),
      Direction.HORIZONTAL,
      horizontalAlignment,
      verticalAlignment,
      settings.spaceBetween
    );

    // TODO: Initialize width and height
    // Initializing row dimensions
    // this.setWidth(this.contentBox.getLeftBoundary() + settings.rightPadding);
    // this.setHeight(this.contentBox.getTopBoundary() + settings.bottomPadding);
  }

  getName() {
    return this.name;
  }

  getType() {
    return this.type;
  }

  setWidth(value: number) {
    const currentWidth = this.getWidth();

    if (value > currentWidth) {
      const { settings } = this;
      const paddingOffset = settings.leftPadding + settings.rightPadding;
      const labelOffset = this.lateralLabel
        ? settings.labelWidth + settings.spaceToOuterLabel
        : 0;

      super.setWidth(value, paddingOffset + labelOffset);
    } else {
      throw new Error("The new Width can´t be smaller than current Width");
    }
  }

  setHeight(value: number) {
    const currentHeight = this.getHeight();

    if (value > currentHeight) {
      const { settings } = this;
      const paddingOffset = settings.topPadding + settings.bottomPadding;
      const labelOffset = this.lateralLabel
        ? 0
        : settings.labelHeight + settings.spaceToOuterLabel;

      super.setHeight(value, paddingOffset + labelOffset);
    } else {
      throw new Error("The new Height can´t be smaller than current Height");
    }
  }

  /**
   * Returns the optimal the initial X position for nested children
   * @returns Initial X position
   */
  getInitialXPosition(): number {
    const { leftPadding, labelWidth, spaceToOuterLabel } = this.settings;
    // Considering the label area
    const labelOffset = this.lateralLabel ? labelWidth + spaceToOuterLabel : 0;

    return labelOffset + leftPadding;
  }

  /**
   * Returns the optimal the initial Y position for nested children
   * @returns Initial Y position
   */
  getInitialYPosition(): number {
    const { topPadding, labelHeight, spaceToOuterLabel } = this.settings;
    // Considering the label area
    const labelOffset = !this.lateralLabel
      ? labelHeight + spaceToOuterLabel
      : 0;

    return labelOffset + topPadding;
  }
}
