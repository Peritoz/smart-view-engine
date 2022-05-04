import {LayoutEngine} from "../../../layout_engine";
import {LayoutSettings} from "@libs/layout_engine/settings";
import {SemanticEngine} from "@libs/semantic_engine/semantic_engine";
import {HydratedViewNode} from "@libs/view_factory/view";

export class HierarchicalLayoutEngine extends LayoutEngine {
    constructor(settings: LayoutSettings, semanticEngine: SemanticEngine) {
        super(settings, semanticEngine);
    }

    /**
     * Groups all parent elements with its children
     * @param viewNodes View Nodes subset
     * @returns Tree representing the elements grouping
     */
    groupParentNodes = (viewNodes: Array<HydratedViewNode>) => {
        let map: { [key: string]: number } = {};
        let node: HydratedViewNode;
        let roots: Array<HydratedViewNode> = [];

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
        this.calculateNestedCount(roots);

        return roots;
    };

    private calculateNestedCount(nestedTree: Array<HydratedViewNode>) {
        let upperNestedCount = 0;

        for (let i = 0; i < nestedTree.length; i++) {
            let node = nestedTree[i];

            if (node.children.length > 0) {
                let lowerNestedCount = this.calculateNestedCount(node.children);

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