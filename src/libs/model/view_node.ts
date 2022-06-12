import { Position } from "@libs/model/position";
import { Dimension } from "@libs/model/dimension";

export interface NodeBlock extends Position, Dimension {
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
