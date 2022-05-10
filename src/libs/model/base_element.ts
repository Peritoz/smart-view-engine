import uniqId from 'uniqid';
import {ViewNode} from "@libs/model/view_node";

class BaseElement {
    protected id: string;
    protected node: ViewNode;

    constructor(viewNode: ViewNode) {
        this.id = uniqId();
        this.node = viewNode;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.node.name;
    }

    getType() {
        return this.node.type;
    }

    getWidth() {
        return this.node.width;
    }

    setWidth(width: number) {
        this.node.width = width;
    }

    getHeight() {
        return this.node.height;
    }

    setHeight(height: number) {
        this.node.height = height;
    }

    getX() {
        return this.node.x;
    }

    setX(x: number) {
        this.node.x = x;
    }

    getY() {
        return this.node.y;
    }

    setY(y: number) {
        this.node.y = y;
    }

    translatePosition(deltaX: number, deltaY: number) {
        this.setX(this.getX() + deltaX);
        this.setY(this.getY() + deltaY);
    }
}

module.exports = BaseElement;