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
    this.setWidth(
        this.contentBox.topLeft.x + settings.rightPadding
    );
    this.setHeight(
        this.contentBox.topLeft.y + settings.bottomPadding
    );
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

  /**
   * Returns the optimal the initial X position for nested children
   * @returns Initial X position
   */
  getInitialXPosition(): number {
    const { leftPadding, labelWidth, spaceToOuterLabel } =
      this.settings;

    // Considering the label area
    const labelOffset = this.lateralLabel ? labelWidth + spaceToOuterLabel : 0;

    return labelOffset + leftPadding;
  }

  /**
   * Returns the optimal the initial Y position for nested children
   * @returns Initial Y position
   */
  getInitialYPosition(): number {
    const { topPadding, labelHeight, spaceToOuterLabel } =
      this.settings;
    // Considering the label area
    const labelOffset = !this.lateralLabel ? labelHeight + spaceToOuterLabel : 0;

    return labelOffset + topPadding;
  }

  translatePosition(deltaX: number, deltaY: number) {
    const paddingX = this.settings.leftPadding;
    const paddingY = this.settings.topPadding;

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
