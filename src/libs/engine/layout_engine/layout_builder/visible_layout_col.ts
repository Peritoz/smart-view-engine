import { LayoutCol } from "@libs/engine/layout_engine/layout_builder/layout_col";
import { Alignment } from "@libs/common/alignment.enum";
import { Settings } from "@libs/engine/layout_engine/settings";

export class VisibleLayoutCol extends LayoutCol {
  protected name: string;
  protected type: string;
  protected labelAreaWidth: number;
  protected labelAreaHeight: number;
  protected lateralLabel: boolean;

  constructor(
    horizontalAlignment: Alignment,
    verticalAlignment: Alignment,
    settings: Settings,
    parentId: string | null,
    name: string,
    type: string,
    lateralLabel: boolean
  ) {
    super(horizontalAlignment, verticalAlignment, settings, parentId);

    this.name = name;
    this.type = type;
    this.labelAreaWidth = settings.labelWidth;
    this.labelAreaHeight = settings.labelHeight;
    this.lateralLabel = lateralLabel;

    // Initializing content box
    this.contentBox = {
      topLeft: { x: this.getInitialXPosition(), y: this.getInitialYPosition() },
      bottomRight: { x: settings.rightPadding, y: settings.bottomPadding },
    };

    // Initializing col dimensions
    this.setWidth(this.contentBox.topLeft.x + settings.rightPadding);
    this.setHeight(this.contentBox.topLeft.y + settings.bottomPadding);
  }

  getName() {
    return this.name;
  }

  getType() {
    return this.type;
  }

  updateHorizontalContentBoxAxis() {
    this.contentBox.bottomRight.x =
      this.getWidth() - this.settings.rightPadding;
  }

  updateVerticalContentBoxAxis() {
    this.contentBox.bottomRight.y =
      this.getHeight() - this.settings.bottomPadding;
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
