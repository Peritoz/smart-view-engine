import { LayoutTypes } from "@libs/common/layout_types.enum";
import { DEFAULT } from "@libs/common/size_reference.const";

function layoutToCode(layout: string) {
  switch (layout.toLowerCase()) {
    case "nested":
      return LayoutTypes.NESTED;
    case "hierarchy":
      return LayoutTypes.HIERARCHY;
    default:
      return LayoutTypes.NESTED;
  }
}

export interface LayoutSettings {
  layoutType: LayoutTypes;
  maxHorizontalCount: number;
  maxChildHorizontalCount: number;
  spaceBetween: number;
  spaceToOuterLabel: number;
  sizeUnit: number;
}

export interface VisibleGroupSettings {
  leftPadding: number;
  rightPadding: number;
  topPadding: number;
  bottomPadding: number;
  labelWidth: number;
  labelHeight: number;
  lateralLabel: boolean;
}

export class Settings implements LayoutSettings, VisibleGroupSettings {
  layoutType: LayoutTypes;
  maxHorizontalCount: number;
  maxChildHorizontalCount: number;
  spaceBetween: number;
  spaceToOuterLabel: number;
  sizeUnit: number;
  leftPadding: number;
  rightPadding: number;
  topPadding: number;
  bottomPadding: number;
  labelWidth: number;
  labelHeight: number;
  lateralLabel: boolean;

  constructor({
    layoutType,
    maxHorizontalCount,
    maxChildHorizontalCount,
    leftPadding,
    rightPadding,
    topPadding,
    bottomPadding,
    spaceBetween,
    spaceToOuterLabel,
    labelWidth,
    labelHeight,
    lateralLabel,
    sizeUnit,
  }: Partial<Settings>) {
    this.layoutType = layoutType
      ? layoutToCode(layoutType)
      : LayoutTypes.NESTED;
    this.maxHorizontalCount =
      maxHorizontalCount || DEFAULT.MAX_HORIZONTAL_COUNT;
    this.maxChildHorizontalCount =
      maxChildHorizontalCount || DEFAULT.MAX_CHILD_HORIZONTAL_COUNT;
    this.spaceBetween = spaceBetween || DEFAULT.DEFAULT_PADDING;
    this.leftPadding = leftPadding || DEFAULT.DEFAULT_PADDING;
    this.rightPadding = rightPadding || DEFAULT.DEFAULT_PADDING;
    this.topPadding = topPadding || DEFAULT.DEFAULT_PADDING;
    this.bottomPadding = bottomPadding || DEFAULT.DEFAULT_PADDING;
    this.labelWidth = labelWidth || DEFAULT.LABEL_WIDTH;
    this.labelHeight = labelHeight || DEFAULT.LABEL_HEIGHT;
    this.lateralLabel = lateralLabel || false;
    this.spaceToOuterLabel =
      spaceToOuterLabel || DEFAULT.INNER_BOTTOM_PADDING_Y;
    this.sizeUnit = sizeUnit || DEFAULT.SIZE_UNIT;
  }
}
