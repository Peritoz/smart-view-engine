export interface NodeBlock {
    name: string;
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface ViewNode extends NodeBlock {
    modelNodeId: string;
    viewNodeId: string;
    parent: string | null;
}

export interface TreeElement {
    verticalCoverage: number;
    children: Array<HydratedViewNode>;
    nestedCount: number;
}

export type HydratedViewNode = ViewNode & TreeElement;