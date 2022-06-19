import { LayoutCol } from "@libs/engine/layout_engine/layout_builder/layout_col";
import { Alignment } from "@libs/common/alignment.enum";
import { Settings } from "@libs/engine/layout_engine/settings";
import { Direction } from "@libs/common/distribution.enum";
import { ContentBox } from "@libs/engine/layout_engine/layout_builder/content_box";
import { Dimension } from "@libs/model/dimension";
import { LayoutGroup } from "@libs/engine/layout_engine/layout_builder/layout_group";

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
    name: string,
    type: string,
    lateralLabel: boolean,
    parent: LayoutGroup | null,
    initialDimension?: Dimension
  ) {
    if (!(settings instanceof Settings)) {
      throw new Error("A Visible Col should be created based on a valid instance of Settings");
    }

    super(
      horizontalAlignment,
      verticalAlignment,
      settings,
      parent,
      initialDimension
    );

    this.offset = {
      topOffset: !lateralLabel
        ? settings.topPadding +
          settings.labelHeight +
          settings.spaceToOuterLabel
        : settings.topPadding,
      leftOffset: lateralLabel
        ? settings.leftPadding +
          settings.labelWidth +
          settings.spaceToOuterLabel
        : settings.leftPadding,
      bottomOffset: settings.bottomPadding,
      rightOffset: settings.rightPadding,
    };

    this.name = name;
    this.type = type;
    this.labelAreaWidth = settings.labelWidth;
    this.labelAreaHeight = settings.labelHeight;
    this.lateralLabel = lateralLabel;

    let dimension: Partial<Dimension> = {};

    if (initialDimension !== undefined) {
      if (initialDimension.width !== undefined) {
        dimension.width =
          initialDimension.width -
          (this.offset.leftOffset + this.offset.rightOffset);
      }

      if (initialDimension.height !== undefined) {
        dimension.height =
          initialDimension.height -
          (this.offset.topOffset + this.offset.bottomOffset);
      }
    }

    // Initializing content box
    this.contentBox = new ContentBox(
      this.getInitialYPosition(),
      this.getInitialXPosition(),
      Direction.VERTICAL,
      horizontalAlignment,
      verticalAlignment,
      settings.spaceBetween,
      () => {
        this.adjustWidthToContent();
      },
      () => {
        this.adjustHeightToContent();
      },
      dimension
    );
  }

  getName() {
    return this.name;
  }

  getType() {
    return this.type;
  }

  /**
   * Returns the optimal the initial X position for nested children
   * @returns Initial X position
   */
  getInitialXPosition(): number {
    return this.offset.leftOffset;
  }

  /**
   * Returns the optimal the initial Y position for nested children
   * @returns Initial Y position
   */
  getInitialYPosition(): number {
    return this.offset.topOffset;
  }
}
