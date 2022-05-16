import {DEFAULT} from "../common/size_reference.const";
import {View} from "@libs/model/view";
import {HydratedViewNode} from "@libs/model/view_node";

export class HydratedView {
    protected view: View;
    private hash: {
        similar: { [key: string]: Array<HydratedViewNode> };
        nodes: { [key: string]: HydratedViewNode };
        children: { [key: string]: Array<string> };
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
                    max: 100,
                },
            },
            viewNodes: [],
            viewRelationships: [],
        };
        this.hash = {
            nodes: {}, // Key = viewNodeId, Value = ViewNode
            similar: {}, // Key = modelNodeId, Value = All viewNodes with the same modelNodeId
            children: {}, // Key = viewNodeId, Value = Children Identifiers
        };
    }

    createViewNode(
        identifier: string,
        viewNodeId: string,
        name: string,
        type: string,
        x?: number,
        y?: number,
        parentId?: string | null,
        width?: number,
        height?: number
    ): HydratedViewNode {
        return {
            modelNodeId: identifier,
            viewNodeId: viewNodeId,
            name: name,
            type: type,
            x: x || 0,
            y: y || 0,
            width: width || DEFAULT.DEFAULT_WIDTH,
            height: height || DEFAULT.DEFAULT_HEIGHT,
            parentId: parentId || null,
            verticalCoverage: 0,
            children: [],
            nestedCount: 0,
        };
    }

    addViewNode(viewNode: HydratedViewNode) {
        if (viewNode.viewNodeId && viewNode.modelNodeId) {
            if (!this.hash.nodes[viewNode.viewNodeId]) {
                // Avoiding to add duplicated viewNodes
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
            childViewNode.parentId = parent.viewNodeId;

            if (this.hash.children[parent.viewNodeId]) {
                this.hash.children[parent.viewNodeId] = [
                    ...new Set([
                        ...this.hash.children[parent.viewNodeId],
                        childViewNode.viewNodeId,
                    ]),
                ];
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
            return b.nestedCount - a.nestedCount;
        });
    }

    getId() {
        return this.view.id;
    }

    getName() {
        return this.view.name;
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

    getViewNodesCount() {
        return this.view.viewNodes.length;
    }

    getSimilarNodes(modelNodeId: string) {
        return this.hash.similar[modelNodeId];
    }

    copyViewNodeAndItsChildren(viewNode: HydratedViewNode) {
        const similarNodes = this.getSimilarNodes(viewNode.modelNodeId);
        const similarNodesCount =
            similarNodes && Array.isArray(similarNodes) ? similarNodes.length : 0;

        let viewNodeCopy = this.createViewNode(
            viewNode.modelNodeId,
            `${viewNode.viewNodeId}_${similarNodesCount + 1}`,
            viewNode.name,
            viewNode.type,
            viewNode.x,
            viewNode.y,
            viewNode.parentId,
            viewNode.width,
            viewNode.height
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

    getHorizontalBounds() {
        return this.view.bounds.horizontal;
    }

    getVerticalBounds() {
        return this.view.bounds.vertical;
    }

    /**
     * Validates and removes all inconsistences from the view
     * @return void
     */
    clear(): void {
        // Cleaning missing parents
        for (let i = 0; i < this.view.viewNodes.length; i++) {
            const node = this.view.viewNodes[i];
            if (node.parentId) {
                const parent = this.getViewNode(node.parentId);

                if (!parent) {
                    node.parentId = null;
                }
            }
        }
    }
}
