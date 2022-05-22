import uniqId from "uniqid";
import { NodeBlock } from "@libs/model/view_node";
import { Block } from "@libs/model/block";

export class BaseElement extends Block implements NodeBlock {
  id: string;
  name: string;
  type: string;
  parentId: string | null;

  constructor(viewNode: Partial<NodeBlock>) {
    if (!viewNode.name) {
      throw new Error("Name is required when creating Base Element");
    }

    super(viewNode);

    this.name = viewNode.name;
    this.type = viewNode.type || "";
    this.parentId = viewNode.parentId || null;
    this.id = uniqId();
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getType() {
    return this.type;
  }

  getParentId(): string | null {
    return this.parentId;
  }

  setParentId(id: string | null) {
    this.parentId = id;
  }

  translatePosition(deltaX: number, deltaY: number) {
    this.setX(this.getX() + deltaX);
    this.setY(this.getY() + deltaY);
  }
}
