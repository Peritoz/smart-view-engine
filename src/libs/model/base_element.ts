import uniqId from "uniqid";
import {NodeBlock} from "@libs/model/view_node";

export class BaseElement {
    protected id: string;
    protected node: NodeBlock;

    constructor(viewNode: NodeBlock) {
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
        if (width >= 0) {
            this.node.width = width;
        } else {
            throw new Error("Width cannot be nagative");
        }
    }

    getHeight() {
        return this.node.height;
    }

    setHeight(height: number) {
        if (height >= 0) {
            this.node.height = height;
        } else {
            throw new Error("Height cannot be nagative");
        }
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

    getParentId(): string | null {
        return this.node.parentId;
    }

    setParentId(id: string | null) {
        this.node.parentId = id;
    }

    translatePosition(deltaX: number, deltaY: number) {
        this.setX(this.getX() + deltaX);
        this.setY(this.getY() + deltaY);
    }
}
