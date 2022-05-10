import {LayoutTypes} from "@libs/common/layout_types.enum";
import {DEFAULT} from "@libs/common/size_reference.const";

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

interface SettingsObject {
    layoutType: LayoutTypes;
    maxHorizontalCount: number;
    maxChildHorizontalCount: number;
    leftPadding: number;
    rightPadding: number;
    topPadding: number;
    bottomPadding: number;
    defaultWidth: number;
    defaultHeight: number;
    paddingX: number;
    paddingY: number;
    marginX: number;
    marginY: number;
    innerTopPaddingY: number;
    innerBottomPaddingY: number;
    pageWidth: number;
    spaceBetween: number;
    spaceToOuterLabel: number;
    labelWidth: number;
    labelHeight: number;
    sizeUnit: number;
}

export class Settings {
    layoutType: LayoutTypes;
    maxHorizontalCount: number;
    maxChildHorizontalCount: number;
    leftPadding: number;
    rightPadding: number;
    topPadding: number;
    bottomPadding: number;
    defaultWidth: number;
    defaultHeight: number;
    paddingX: number;
    paddingY: number;
    marginX: number;
    marginY: number;
    innerTopPaddingY: number;
    innerBottomPaddingY: number;
    pageWidth: number;
    spaceBetween: number;
    spaceToOuterLabel: number;
    labelWidth: number;
    labelHeight: number;
    sizeUnit: number;

    constructor({
                    layoutType,
                    maxHorizontalCount,
                    maxChildHorizontalCount,
                    leftPadding,
                    rightPadding,
                    topPadding,
                    bottomPadding,
                    defaultWidth,
                    defaultHeight,
                    paddingX,
                    paddingY,
                    marginX,
                    marginY,
                    innerTopPaddingY,
                    innerBottomPaddingY,
                    pageWidth,
                    spaceBetween,
                    spaceToOuterLabel,
                    labelWidth,
                    labelHeight,
                    sizeUnit,
                }: Partial<SettingsObject>) {
        this.layoutType = layoutType ? layoutToCode(layoutType) : LayoutTypes.NESTED;
        this.maxHorizontalCount = maxHorizontalCount || DEFAULT.MAX_HORIZONTAL_COUNT;
        this.maxChildHorizontalCount = maxChildHorizontalCount || DEFAULT.MAX_CHILD_HORIZONTAL_COUNT;
        this.spaceBetween = spaceBetween || DEFAULT.DEFAULT_PADDING;
        this.leftPadding = leftPadding || DEFAULT.DEFAULT_PADDING;
        this.rightPadding = rightPadding || DEFAULT.DEFAULT_PADDING;
        this.topPadding = topPadding || DEFAULT.DEFAULT_PADDING;
        this.bottomPadding = bottomPadding || DEFAULT.DEFAULT_PADDING;
        this.defaultWidth = defaultWidth || DEFAULT.DEFAULT_WIDTH;
        this.defaultHeight = defaultHeight || DEFAULT.DEFAULT_HEIGHT;
        this.paddingX = paddingX || DEFAULT.PADDING_X;
        this.paddingY = paddingY || DEFAULT.PADDING_Y;
        this.marginX = marginX || DEFAULT.MARGIN_X;
        this.marginY = marginY || DEFAULT.MARGIN_Y;
        this.innerTopPaddingY = innerTopPaddingY || DEFAULT.INNER_TOP_PADDING_Y;
        this.innerBottomPaddingY = innerBottomPaddingY || DEFAULT.INNER_BOTTOM_PADDING_Y;
        this.labelWidth = labelWidth || DEFAULT.LABEL_WIDTH;
        this.labelHeight = labelHeight || DEFAULT.LABEL_HEIGHT;
        this.spaceToOuterLabel = spaceToOuterLabel || DEFAULT.INNER_BOTTOM_PADDING_Y;
        this.pageWidth = pageWidth || 1200;
        this.sizeUnit = sizeUnit || DEFAULT.SIZE_UNIT;
    }
};