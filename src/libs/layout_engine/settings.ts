import {LayoutTypes} from "@libs/common/layout_types.enum";

export interface PaddingSettings {
    leftPadding: number;
    rightPadding: number;
    topPadding: number;
    bottomPadding: number;
}

export interface LayoutSettings {
    layoutType: LayoutTypes;
    maxHorizontalCount: number;
    maxChildHorizontalCount: number;
}

export type Settings = PaddingSettings & LayoutSettings;