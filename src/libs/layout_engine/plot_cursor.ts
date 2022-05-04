import {PaddingSettings} from "@libs/layout_engine/settings";

const {SIZE_REFERENCE} = require("../common/size_reference.const");

export class PlotCursor {
    protected settings: PaddingSettings;
    protected initialX: number;
    protected initialY: number;
    protected x: number;
    protected y: number;
    protected maximumWidth: number;
    protected maximumHeight: number;
    protected pageWidth: number;
    protected pageHeight: number;

    constructor(initialX: number, initialY: number, pageWidth: number, pageHeight: number, settings?: Partial<PaddingSettings>) {
        this.settings = {
            leftPadding: settings && settings.leftPadding !== undefined ? settings.leftPadding : SIZE_REFERENCE.DEFAULT_PADDING,
            rightPadding: settings && settings.rightPadding !== undefined ? settings.rightPadding : SIZE_REFERENCE.DEFAULT_PADDING,
            topPadding: settings && settings.topPadding !== undefined ? settings.topPadding : SIZE_REFERENCE.DEFAULT_PADDING,
            bottomPadding: settings && settings.bottomPadding !== undefined ? settings.bottomPadding : SIZE_REFERENCE.DEFAULT_PADDING,
        };
        this.initialX = initialX;
        this.initialY = initialY;
        this.x = initialX;
        this.y = initialY;
        this.maximumWidth = -1;
        this.maximumHeight = -1;
        this.pageWidth = pageWidth;
        this.pageHeight = pageHeight;
    }

    addPadding(position: { x: number; y: number; }) {
        return {x: position.x + this.settings.leftPadding, y: position.y + this.settings.topPadding};
    }

    clearMaximumWidth() {
        this.maximumWidth = -1;
    }

    clearMaximumHeight() {
        this.maximumHeight = -1;
    }

    setMaximumWidth(value: number) {
        if (value > this.maximumWidth) {
            this.maximumWidth = value;
        }
    }

    setMaximumHeight(value: number) {
        if (value > this.maximumHeight) {
            this.maximumHeight = value;
        }
    }

    calculatePositionAfter({width = 0, height = 0}) {
        const xIncrement = this.settings.leftPadding + width + this.settings.rightPadding;
        const yIncrement = this.settings.topPadding + height + this.settings.bottomPadding;

        this.setMaximumWidth(width);
        this.setMaximumHeight(height);

        if (this.x + xIncrement <= this.pageWidth) {
            this.x += xIncrement;
        } else if (this.y + yIncrement <= this.pageHeight) {
            this.x = this.initialX;
            this.y += this.settings.topPadding + this.maximumHeight + this.settings.bottomPadding;

            this.clearMaximumWidth();
            this.clearMaximumHeight();
        } else {
            throw new Error("Page area exceeded");
        }

        return this.getNextPosition();
    }

    calculatePosition({width = 0, height = 0}) {
        const currentPosition = this.getNextPosition();
        const nextPosition = this.calculatePositionAfter({width, height});
        let position;

        // Verifying if it broke the line
        if (currentPosition.y !== nextPosition.y) {
            // Generating the next position after the current element, once a line break was needed
            this.calculatePositionAfter({width, height});

            // Using next line position for the current element
            position = nextPosition;
        } else {
            position = currentPosition;
        }

        return this.addPadding(position);
    }

    getNextPosition() {
        return {x: this.x, y: this.y};
    }
}