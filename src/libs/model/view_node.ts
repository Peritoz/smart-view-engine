export interface ViewNode {
    modelNodeId: string;
    viewNodeId: string;
    name: string;
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    parent: string | null;
}

export interface TreeElement {
    verticalCoverage: number;
    children: Array<HydratedViewNode>;
    nestedCount: number;
}

export type HydratedViewNode = ViewNode & TreeElement;