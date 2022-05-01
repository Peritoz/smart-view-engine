const {SIZE_REFERENCE} = require("../common/layout_constants");

class View {
    protected view: {
        viewRelationships: any[];
        viewNodes: any[];
        name: string;
        bounds: {
            horizontal: { min: number; max: number };
            vertical: { min: number; max: number }
        };
        id: string
    };
    private hash: {
        similar: {[key: string]: Array<object>};
        nodes: {[key: string]: object};
        children: {[key: string]: Array<string>}
    };

    constructor(id, name) {
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

    createViewNode(arktectId, identifier, viewElementId, name, type, x, y, parentId) {
        return {
            "_id": arktectId,
            "modelNodeId": identifier,
            "viewElementId": viewElementId,
            "name": name,
            "type": type,
            "x": x,
            "y": y,
            "width": SIZE_REFERENCE.DEFAULT_WIDTH,
            "height": SIZE_REFERENCE.DEFAULT_HEIGHT,
            "parent": parentId || null
        };
    }

    addViewNode(viewNode) {
        if (viewNode.viewElementId && typeof viewNode.viewElementId === "string" &&
            viewNode.modelNodeId && typeof viewNode.modelNodeId === "string") {
            if (!this.hash.nodes[viewNode.viewElementId]) { // Avoiding to add duplicated viewNodes
                this.view.viewNodes.push(viewNode);

                this.hash.nodes[viewNode.viewElementId] = viewNode;

                if (this.hash.similar[viewNode.modelNodeId]) {
                    this.hash.similar[viewNode.modelNodeId].push(viewNode);
                } else {
                    this.hash.similar[viewNode.modelNodeId] = [viewNode];
                }
            }
        }
    }

    nestViewNode(parent, childViewNode) {
        if (childViewNode && parent.viewElementId) {
            childViewNode.parent = parent.viewElementId;

            if (this.hash.children[parent.viewElementId]) {
                // @ts-ignore
                this.hash.children[parent.viewElementId] = [...new Set([...this.hash.children[parent.viewElementId], childViewNode.viewElementId])];
            } else {
                this.hash.children[parent.viewElementId] = [childViewNode.viewElementId];
            }
        }
    }

    addViewRelationship() {

    }

    setBounds(horizontalMax, verticalMax) {
        this.view.bounds.horizontal.max = horizontalMax;
        this.view.bounds.vertical.max = verticalMax;
    }

    sortViewNodesParentsFirst() {
        this.view.viewNodes = this.view.viewNodes.sort((a, b) => {
            return b.nestedcount - a.nestedcount
        });
    }

    getView() {
        return this.view;
    }

    getViewNodes() {
        return this.view.viewNodes;
    }

    getViewNode(viewElementId) {
        if (viewElementId && typeof viewElementId === "string") {
            return this.hash.nodes[viewElementId];
        }

        return undefined;
    }

    getViewNodesCount() {
        return this.view.viewNodes.length;
    }

    getSimilarNodes(modelNodeId) {
        return this.hash.similar[modelNodeId];
    }

    copyViewNodeAndItsChildren(viewNode) {
        const similarNodes = this.getSimilarNodes(viewNode.modelNodeId);
        const similarNodesCount = similarNodes && Array.isArray(similarNodes) ? similarNodes.length : 0;

        let viewNodeCopy = this.createViewNode(
            viewNode._id,
            viewNode.modelNodeId,
            `${viewNode.viewElementId}_${similarNodesCount + 1}`,
            viewNode.name,
            viewNode.type,
            viewNode.x,
            viewNode.y,
            viewNode.parent
        );

        this.addViewNode(viewNodeCopy);

        let children = this.hash.children[viewNode.viewElementId];

        if (children) {
            children.forEach((childId) => {
                let child = this.getViewNode(childId);
                let childCopy = this.copyViewNodeAndItsChildren(child);

                this.nestViewNode(viewNodeCopy, childCopy);
            });
        }

        return viewNodeCopy;
    }
}

module.exports = View;