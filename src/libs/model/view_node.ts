import { Position } from "@libs/model/block";

export interface NodeBlock extends Position {
  name: string;
  type: string;
  parentId: string | null;
}

export interface ViewNode extends NodeBlock {
  modelNodeId: string;
  viewNodeId: string;
}

export interface TreeElement {
  verticalCoverage: number;
  children: Array<HydratedViewNode>;
  nestedCount: number;
}

export type HydratedViewNode = ViewNode & TreeElement;
