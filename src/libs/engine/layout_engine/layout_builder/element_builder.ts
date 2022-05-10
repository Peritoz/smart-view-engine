import {Settings} from "@libs/engine/layout_engine/settings";
import {DEFAULT} from "@libs/common/size_reference.const";
import {ViewNode} from "@libs/model/view_node";

const BaseElement = require("../../../model/base_element");

class ElementBuilder {
    protected sizeUnit: number;

    constructor(settings: Settings) {
        this.sizeUnit = settings.sizeUnit ? settings.sizeUnit : DEFAULT.SIZE_UNIT;
    }

    buildElement(node: ViewNode) {
        return new BaseElement(node);
    }

    buildTinyElement(name: string, type: string) {
        return new BaseElement({name, type, width: this.sizeUnit, height: this.sizeUnit, x: 0, y: 0});
    }

    buildSmallElement(name: string, type: string, verticalOrientation: boolean) {
        if (verticalOrientation) {
            return new BaseElement({name, type, width: this.sizeUnit, height: 2 * this.sizeUnit, x: 0, y: 0});
        } else {
            return new BaseElement({name, type, width: 2 * this.sizeUnit, height: this.sizeUnit, x: 0, y: 0});
        }
    }

    buildMediumElement(name: string, type: string, verticalOrientation: boolean) {
        if (verticalOrientation) {
            return new BaseElement({name, type, width: this.sizeUnit, height: 3 * this.sizeUnit, x: 0, y: 0});
        } else {
            return new BaseElement({name, type, width: 3 * this.sizeUnit, height: this.sizeUnit, x: 0, y: 0});
        }
    }

    buildBigElement(name: string, type: string, verticalOrientation: boolean) {
        if (verticalOrientation) {
            return new BaseElement({name, type, width: this.sizeUnit, height: 4 * this.sizeUnit, x: 0, y: 0});
        } else {
            return new BaseElement({name, type, width: 4 * this.sizeUnit, height: this.sizeUnit, x: 0, y: 0});
        }
    }
}

module.exports = ElementBuilder;