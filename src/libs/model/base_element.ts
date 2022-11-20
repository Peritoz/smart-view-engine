import uniqId from 'uniqid';
import { Block } from '@libs/model/block';

export class BaseElement extends Block {
  id: string;
  externalId: string | null;
  name: string;
  type: string;
  parentId: string | null;

  constructor(viewNode: Partial<BaseElement>) {
    if (!viewNode.name) {
      throw new Error('Name is required when creating Base Element');
    }

    super(viewNode);

    this.name = viewNode.name;
    this.type = viewNode.type || '';
    this.parentId = viewNode.parentId || null;
    this.id = uniqId();
    this.externalId = viewNode.externalId || null;
  }

  getId() {
    return this.id;
  }

  getExternalId(): string | null {
    return this.externalId;
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
    super.setX(super.getX() + deltaX);
    super.setY(super.getY() + deltaY);
  }
}
