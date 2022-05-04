const LayoutEngine = require("../../../layout_engine");

class HierarchicalLayoutEngine extends LayoutEngine {
    constructor(settings) {
        super(settings);
    }

    /**
     * Groups all parent elements with its children
     * @param viewNodes View Nodes subset
     * @returns Tree representing the elements grouping
     */
    _groupParentNodes = (viewNodes) => {
        let map = {}, node, roots = [];

        // First pass: Creates an object that represents a hash table of indexes
        for (let i = 0; i < viewNodes.length; i++) {
            map[viewNodes[i].viewNodeId] = i; // Initialize the map
            viewNodes[i].children = []; // Initialize children
            viewNodes[i].nestedCount = 0; // Initialize nested counter
        }

        // Second pass: Creates the tree
        for (let i = 0; i < viewNodes.length; i++) {
            node = viewNodes[i];
            if (node.parent !== null) {
                let parent = viewNodes[map[node.parent]];

                if (parent) {
                    parent.children.push(node);
                }
            } else {
                roots.push(node);
            }
        }

        // Third pass: Calculates nested count
        this._calculateNestedCount(roots);

        return roots;
    };

    _calculateNestedCount(nestedTree) {
        let upperNestedCount = 0;

        for (let i = 0; i < nestedTree.length; i++) {
            let node = nestedTree[i];

            if (node.children.length > 0) {
                let lowerNestedCount = this._calculateNestedCount(node.children);

                if (node.nestedCount) {
                    node.nestedCount += lowerNestedCount;
                } else {
                    node.nestedCount = lowerNestedCount;
                }

                upperNestedCount += lowerNestedCount + 1;
            } else {
                upperNestedCount++;
            }
        }

        return upperNestedCount;
    }
}

module.exports = HierarchicalLayoutEngine;