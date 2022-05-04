import {SIZE_REFERENCE} from "../common/size_reference.const";

interface ViewNode {
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

interface ViewRelationship {
    modelRelationshipId: string;
    sourceId: string;
    targetId: string;
    viewRelationshipId: string;
    type: string;
    bendpoints: Array<{ x: number, y: number }>;
}

type HydratedViewNode = ViewNode & { nestedCount: number };

export class View {
    protected view: {
        viewRelationships: Array<ViewRelationship>;
        viewNodes: Array<HydratedViewNode>;
        name: string;
        bounds: {
            horizontal: { min: number; max: number };
            vertical: { min: number; max: number }
        };
        id: string
    };
    private hash: {
        similar: { [key: string]: Array<HydratedViewNode> };
        nodes: { [key: string]: HydratedViewNode };
        children: { [key: string]: Array<string> }
    };

    constructor(id: string, name: string) {
        this.view = {
            id: id,
            name: name,
            bounds: {
                vertical: {
                    min: 0,
                    max: 100,
                },
                horizontal: {
                    min: 0,
                    max: 100
                }
            },
            viewNodes: [],
            viewRelationships: [],
        };
        this.hash = {
            nodes: {}, // Key = viewNodeId, Value = ViewNode
            similar: {}, // Key = modelNodeId, Value = All viewNodes with the same modelNodeId
            children: {} // Key = viewNodeId, Value = Children Identifiers
        }
    }

    createViewNode(
        identifier: string,
        viewNodeId: string,
        name: string,
        type: string,
        x: number,
        y: number,
        parentId: string | null
    ): HydratedViewNode {
        return {
            "modelNodeId": identifier,
            "viewNodeId": viewNodeId,
            "name": name,
            "type": type,
            "x": x,
            "y": y,
            "width": SIZE_REFERENCE.DEFAULT_WIDTH,
            "height": SIZE_REFERENCE.DEFAULT_HEIGHT,
            "parent": parentId || null,
            "nestedCount": 0
        };
    }

    addViewNode(viewNode: HydratedViewNode) {
        if (viewNode.viewNodeId && viewNode.modelNodeId) {
            if (!this.hash.nodes[viewNode.viewNodeId]) { // Avoiding to add duplicated viewNodes
                this.view.viewNodes.push(viewNode);

                this.hash.nodes[viewNode.viewNodeId] = viewNode;

                if (this.hash.similar[viewNode.modelNodeId]) {
                    this.hash.similar[viewNode.modelNodeId].push(viewNode);
                } else {
                    this.hash.similar[viewNode.modelNodeId] = [viewNode];
                }
            }
        }
    }

    nestViewNode(parent: HydratedViewNode, childViewNode: HydratedViewNode) {
        if (childViewNode && parent.viewNodeId) {
            childViewNode.parent = parent.viewNodeId;

            if (this.hash.children[parent.viewNodeId]) {
                this.hash.children[parent.viewNodeId] = [...new Set([...this.hash.children[parent.viewNodeId], childViewNode.viewNodeId])];
            } else {
                this.hash.children[parent.viewNodeId] = [childViewNode.viewNodeId];
            }
        }
    }

    setBounds(horizontalMax: number, verticalMax: number) {
        this.view.bounds.horizontal.max = horizontalMax;
        this.view.bounds.vertical.max = verticalMax;
    }

    sortViewNodesParentsFirst() {
        this.view.viewNodes = this.view.viewNodes.sort((a, b) => {
            return b.nestedCount - a.nestedCount
        });
    }

    getView() {
        return this.view;
    }

    getViewNodes() {
        return this.view.viewNodes;
    }

    getViewNode(viewNodeId: string): HydratedViewNode | null {
        if (viewNodeId) {
            return this.hash.nodes[viewNodeId];
        }

        return null;
    }

    getSimilarNodes(modelNodeId: string) {
        return this.hash.similar[modelNodeId];
    }

    copyViewNodeAndItsChildren(viewNode: HydratedViewNode) {
        const similarNodes = this.getSimilarNodes(viewNode.modelNodeId);
        const similarNodesCount = similarNodes && Array.isArray(similarNodes) ? similarNodes.length : 0;

        let viewNodeCopy = this.createViewNode(
            viewNode.modelNodeId,
            `${viewNode.viewNodeId}_${similarNodesCount + 1}`,
            viewNode.name,
            viewNode.type,
            viewNode.x,
            viewNode.y,
            viewNode.parent
        );

        this.addViewNode(viewNodeCopy);

        let children = this.hash.children[viewNode.viewNodeId];

        if (children) {
            children.forEach((childId: string) => {
                let child: HydratedViewNode | null = this.getViewNode(childId);

                if (child) {
                    let childCopy = this.copyViewNodeAndItsChildren(child);

                    this.nestViewNode(viewNodeCopy, childCopy);
                }
            });
        }

        return viewNodeCopy;
    }
}