import {DEFAULT} from "@libs/common/size_reference.const";
import {SemanticEngine} from "@libs/engine/semantic_engine/semantic_engine";
import {Settings} from "@libs/engine/layout_engine/settings";
import {HydratedView} from "@libs/model/hydrated_view";
import {HierarchicalLayoutEngine} from "../hierarchical_layout_engine";
import {PlotCursor} from "../../../plot_cursor";
import {HydratedViewNode} from "@libs/model/view_node";

export class HierarchyLayoutEngine extends HierarchicalLayoutEngine {
    constructor(settings: Settings, semanticEngine: SemanticEngine) {
        super(settings, semanticEngine);
    }

    processLayout(view: HydratedView) {
        // Generating a tree of nested elements
        let nestedTree = this.groupParentNodes(view.getViewNodes());

        // Processing element width and height
        let bounds = this.processDimensionsByContent(nestedTree, null, this.maxHorizontalCount);

        // Setting the "paper" dimension
        view.setBounds(bounds.width, bounds.height);

        // Rendering element positions
        this.renderRows(nestedTree, 0, this.maxHorizontalCount, DEFAULT.PADDING_X, DEFAULT.PADDING_Y);
    }

    /**
     * Calculates the dimensions of each element of the nested tree
     * @param nestedSubTree Tree organizing all nested elements
     * @param parentNode
     * @param maxColumns
     * @returns Element dimensions as {width: #, height: #}
     */
    protected processDimensionsByContent(
        nestedSubTree: Array<HydratedViewNode>,
        parentNode: HydratedViewNode | null,
        maxColumns: number
    ) {
        let sortedNestedTree = nestedSubTree.sort((a, b) => b.nestedCount - a.nestedCount);

        let result = {
            width: 0,
            height: DEFAULT.INNER_TOP_PADDING_Y,
            verticalCoverage: DEFAULT.INNER_TOP_PADDING_Y,
            maxColumnCount: 0
        };
        let cursorX = 0;
        let columnCount = 0;
        let rowHeight = 0;

        for (let i = 0; i < sortedNestedTree.length; i++) {
            let node = sortedNestedTree[i];
            let nestedDimensions;

            if (node.children.length > 0) { // It is not a leaf
                let maxColumnsConstraint = node.nestedCount > maxColumns ? maxColumns - columnCount : this.maxChildHorizontalCount;

                nestedDimensions = this.processDimensionsByContent(node.children, node, maxColumnsConstraint);
                columnCount += nestedDimensions.maxColumnCount;
            } else { // It's a leaf
                nestedDimensions = {
                    width: DEFAULT.DEFAULT_WIDTH,
                    height: DEFAULT.DEFAULT_HEIGHT,
                    verticalCoverage: DEFAULT.DEFAULT_HEIGHT
                };
                columnCount++;
            }

            // Setting the maximum value of column count
            if (columnCount > result.maxColumnCount) {
                result.maxColumnCount = columnCount;
            }

            // Incrementing horizontal cursor
            cursorX += nestedDimensions.width;

            if (cursorX > result.width) {
                result.width = cursorX;
            }

            // Setting the current node dimensions
            node.width = nestedDimensions.width;
            node.verticalCoverage = nestedDimensions.verticalCoverage;

            if (nestedDimensions.verticalCoverage + DEFAULT.PADDING_Y > rowHeight) {
                rowHeight = nestedDimensions.verticalCoverage + DEFAULT.PADDING_Y;
            }

            // Row break (new row) or last element (final row)
            if ((columnCount >= maxColumns) || i === sortedNestedTree.length - 1) {
                result.verticalCoverage += rowHeight;

                cursorX = 0;
                columnCount = 0;
                rowHeight = 0;
            } else {
                // Incrementing horizontal cursor
                cursorX += DEFAULT.MARGIN_X;
            }
        }

        // Adding final padding
        result.verticalCoverage += DEFAULT.INNER_BOTTOM_PADDING_Y;

        return result;
    }

    renderRows(
        nestedTree: Array<HydratedViewNode>,
        index: number,
        maxColumns: number,
        initialX: number,
        initialY: number
    ) {
        const elementSizeReference = DEFAULT.DEFAULT_WIDTH + 2 * DEFAULT.MARGIN_X;
        let sortedNestedTree = nestedTree.sort((a, b) => b.nestedCount - a.nestedCount);
        let cursor = new PlotCursor(initialX, initialY, maxColumns * elementSizeReference, 100000, {
            leftPadding: 0,
            rightPadding: DEFAULT.MARGIN_X,
            topPadding: 0,
            bottomPadding: DEFAULT.MARGIN_Y
        });
        let maxColumnCount = 0;
        let maxHeight = 0;
        let maxWidth = 0;
        let columnCount = 0;

        for (let i = 0; i < sortedNestedTree.length; i++) {
            let node = sortedNestedTree[i];
            const hierarchyDepth = Math.ceil(node.children.length / this.maxHorizontalCount);

            let position = cursor.calculatePosition(
                {
                    width: node.width,
                    height: node.height + hierarchyDepth * (DEFAULT.DEFAULT_HEIGHT + DEFAULT.MARGIN_Y)
                }
            );

            node.x = position.x;
            node.y = position.y;

            if (node.children.length > 0) { // It is not a leaf
                let maxColumnsConstraint = node.nestedCount > maxColumns ? maxColumns - columnCount : this.maxChildHorizontalCount;
                let nestedPositionResult = this.renderRows(node.children, i, maxColumnsConstraint, 0, node.height + DEFAULT.MARGIN_Y);

                columnCount += nestedPositionResult.maxColumnCount;
            } else { // It's a leaf
                columnCount++;
            }
        }

        return {maxColumnCount, maxWidth, maxHeight};
    }
}