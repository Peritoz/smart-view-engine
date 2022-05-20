import {Alignment} from "@libs/common/Alignment.enum";
import {Settings} from "@libs/engine/layout_engine/settings";
import {LayoutElementGroup} from "@libs/engine/layout_engine/layout_builder/layout_element_group";
import {BaseElement} from "@libs/model/base_element";

export class LayoutRow extends LayoutElementGroup {
    constructor(
        mainAxisAlignment: Alignment,
        crossAxisAlignment: Alignment,
        settings: Settings,
        parentId: string | null,
        withoutMargin: boolean
    ) {
        super(mainAxisAlignment, crossAxisAlignment, settings, parentId, withoutMargin);
    }

    getWidth() {
        if (this.children.length > 0) {
            if (this.withoutMargin) {
                return this.virtualMainLength;
            } else {
                return this.virtualMainLength + this.settings.leftPadding + this.settings.rightPadding;
            }
        } else {
            return 0;
        }
    }

    getHeight() {
        if (this.children.length > 0) {
            if (this.withoutMargin) {
                return this.crossLength;
            } else {
                return this.crossLength + this.settings.topPadding + this.settings.bottomPadding;
            }
        } else {
            return 0;
        }
    }

    setUsefulWidth(value: number, extraWidth: number) {
        const currentWidth = this.getWidth();

        if (value > currentWidth) {
            const totalMargin = this.withoutMargin ? 0 : this.settings.leftPadding + this.settings.rightPadding;

            if (value > totalMargin) {
                this.setMaximumMainLength(value - totalMargin - extraWidth);
            } else {
                throw new Error("Empty useful area");
            }
        } else if (value < currentWidth) {
            throw new Error("The new Width can´t be smaller than current Width");
        }
    }

    setUsefulHeight(value: number, extraHeight: number) {
        const currentHeight = this.getHeight();

        if (value > currentHeight) {
            const totalMargin = this.withoutMargin ? 0 : this.settings.topPadding + this.settings.bottomPadding;

            if (value > totalMargin) {
                this.setMaximumCrossLength(value - totalMargin - extraHeight);
            } else {
                throw new Error("Empty useful area");
            }
        } else if (value < currentHeight) {
            throw new Error("The new Height can´t be smaller than current Height");
        }
    }

    setWidth(value: number) {
        this.setUsefulWidth(value, 0);
    }

    setHeight(value: number) {
        this.setUsefulHeight(value, 0);
    }

    addContainer(container: BaseElement | LayoutElementGroup) {
        if (container) {
            super.addContainer(container);

            if (this.children.length > 1) {
                super.incrementMainLength(this.getOptimalPadding() + container.getWidth());
            } else {
                super.incrementMainLength(container.getWidth());
            }

            super.setMaximumCrossLength(container.getHeight());

            if (container instanceof BaseElement) {
                this.applyMainAxisDistribution();
                this.applyCrossAxisDistribution();
                container.setParentId(this.id);
            }
        }
    }

    adjustDimensionsToChildren() {
        super.adjustDimensionsToChildren(
            (child: BaseElement | LayoutElementGroup) => child.getWidth(),
            (child: BaseElement | LayoutElementGroup) => child.getHeight()
        );
    }

    setMaximumMainLength(value: number) {
        super.setMaximumMainLength(value);

        this.applyMainAxisDistribution();
    }

    setMaximumCrossLength(value: number) {
        super.setMaximumCrossLength(value);

        this.applyCrossAxisDistribution();
    }

    /**
     * Distributes children over the element area, considering Main Axis and Cross Axis alignment options
     */
    applyDistribution() {
        this.applyMainAxisDistribution();
        this.applyCrossAxisDistribution();
    }

    /**
     * Distributes children over the element area, considering Main Axis alignment option
     */
    applyMainAxisDistribution() {
        const refSize = super.getOptimalSize();
        const refPadding = super.getOptimalPadding();
        let refPosition = super.getOptimalStartPosition(); // Setting the initial cursor position

        // Adjusting size and position for all children
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];
            const mainSize = child.getWidth();

            if (this.mainAxisAlignment === Alignment.EXPANDED) {
                child.setWidth(refSize);
                child.setX(refPosition);

                refPosition += refSize + refPadding;
            } else if (this.mainAxisAlignment === Alignment.START || this.mainAxisAlignment === Alignment.CENTER) {
                child.setX(refPosition);

                refPosition += mainSize + refPadding;
            } else if (this.mainAxisAlignment === Alignment.END) {
                refPosition -= mainSize;

                child.setX(refPosition);

                refPosition -= refPadding;
            }
        }
    }

    /**
     * Distributes children over the element area, considering Cross Axis alignment option
     */
    applyCrossAxisDistribution() {
        // Adjusting size and position for all children
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];
            const mainSize = child.getHeight();

            if (this.crossAxisAlignment === Alignment.EXPANDED) {
                child.setHeight(super.getCrossLength());
                child.setY(0);
            } else if (this.crossAxisAlignment === Alignment.START) {
                child.setY(0);
            } else if (this.crossAxisAlignment === Alignment.CENTER) {
                child.setY(super.getCrossLength() / 2 - mainSize / 2);
            } else if (this.crossAxisAlignment === Alignment.END) {
                child.setY(super.getCrossLength() - mainSize);
            }
        }
    }
}