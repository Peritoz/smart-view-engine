import {Alignment} from "@libs/common/alignment.enum";
import {Settings} from "@libs/engine/layout_engine/settings";
import {LayoutRow} from "@libs/engine/layout_engine/layout_builder/layout_row";

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
        parentId: string,
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
            return super.getWidth() + this.labelAreaWidth + this.settings.spaceToOuterLabel;
        } else {
            return super.getWidth();
        }
    }

    getHeight() {
        if (!this.lateralLabel) {
            return super.getHeight() + this.labelAreaHeight + this.settings.spaceToOuterLabel;
        } else {
            return super.getHeight();
        }
    }

    setWidth(value: number) {
        if (this.lateralLabel) {
            if (value > this.labelAreaWidth) {
                this.setUsefulWidth(value, this.labelAreaWidth + this.settings.spaceToOuterLabel);
            }
        } else {
            super.setWidth(value);
        }
    }

    setHeight(value: number) {
        if (!this.lateralLabel) {
            if (value > this.labelAreaHeight) {
                this.setUsefulHeight(value, this.labelAreaHeight + this.settings.spaceToOuterLabel);
            }
        } else {
            super.setHeight(value);
        }
    }

    translatePosition(deltaX: number, deltaY: number) {
        const marginX = this.withoutMargin ? 0 : this.settings.marginX;
        const marginY = this.withoutMargin ? 0 : this.settings.marginY;

        this.translateElementGroupPosition(deltaX, deltaY);

        let childrenStartX;
        let childrenStartY;

        if (this.lateralLabel) {
            childrenStartX = this.getX() + marginX + this.labelAreaWidth + this.settings.spaceToOuterLabel;
            childrenStartY = this.getY() + marginY;
        } else {
            childrenStartX = this.getX() + marginX;
            childrenStartY = this.getY() + marginY + this.labelAreaHeight + this.settings.spaceToOuterLabel;
        }

        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];

            child.translatePosition(childrenStartX, childrenStartY);
        }
    }
}