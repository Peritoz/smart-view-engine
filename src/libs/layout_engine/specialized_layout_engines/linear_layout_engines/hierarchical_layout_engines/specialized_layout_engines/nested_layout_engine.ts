const {SIZE_REFERENCE} = require("../../../../../common/size_reference.const");
const HierarchicalLayoutEngine = require("../hierarchical_layout_engine");

class NestedLayoutEngine extends HierarchicalLayoutEngine {
    constructor(settings) {
        super(settings);
    }

    processLayout(view) {
        // Generating a tree of nested elements
        let nestedTree = this._groupParentNodes(view.getViewNodes());

        // Processing element width and height
        let bounds = this._processDimensionsByContent(nestedTree, null, this.maxHorizontalCount);

        // Setting the "paper" dimension
        view.setBounds(bounds.width, bounds.height);

        // Rendering element positions
        this._renderRows(nestedTree, 0, this.maxHorizontalCount, SIZE_REFERENCE.PADDING_X, SIZE_REFERENCE.PADDING_Y);
    }

    /**
     * Calculates the dimensions of each element of the nested tree
     * @param nestedSubTree Tree organizing all nested elements
     * @param parentNode
     * @param maxColumns
     * @returns Element dimensions as {width: #, height: #}
     */
    _processDimensionsByContent(nestedSubTree, parentNode, maxColumns) {
        let sortedNestedTree = nestedSubTree.sort((a, b) => b.nestedcount - a.nestedcount);

        let result = {
            width: 0,
            height: SIZE_REFERENCE.INNER_TOP_PADDING_Y,
            maxColumnCount: 0
        };
        let cursorX = 0;
        let columnCount = 0;
        let rowHeight = 0;

        for (let i = 0; i < sortedNestedTree.length; i++) {
            let node = sortedNestedTree[i];
            let nestedDimensions;

            if (node.children.length > 0) { // It is not a leaf
                let maxColumnsConstraint = node.nestedcount > maxColumns ? maxColumns - columnCount : this.maxChildHorizontalCount;

                nestedDimensions = this._processDimensionsByContent(node.children, node, maxColumnsConstraint);
                columnCount += nestedDimensions.maxColumnCount;
            } else { // It's a leaf
                nestedDimensions = {width: SIZE_REFERENCE.DEFAULT_WIDTH, height: SIZE_REFERENCE.DEFAULT_HEIGHT};
                columnCount++;
            }

            // Setting the maximum value of column count
            if (columnCount > result.maxColumnCount) {
                result.maxColumnCount = columnCount;
            }

            // Incrementing horizontal cursor
            cursorX += nestedDimensions.width + SIZE_REFERENCE.PADDING_X;

            if (cursorX + SIZE_REFERENCE.PADDING_X > result.width) {
                result.width = cursorX + SIZE_REFERENCE.PADDING_X;
            }

            // Setting the current node dimensions
            node.width = nestedDimensions.width;
            node.height = nestedDimensions.height;

            if (nestedDimensions.height + SIZE_REFERENCE.PADDING_Y > rowHeight) {
                rowHeight = nestedDimensions.height + SIZE_REFERENCE.PADDING_Y;
            }

            // Row break (new row) or last element (final row)
            if ((columnCount >= maxColumns) || i === sortedNestedTree.length - 1) {
                result.height += rowHeight;

                cursorX = 0;
                columnCount = 0;
                rowHeight = 0;
            }
        }

        // Adding final padding
        result.height += SIZE_REFERENCE.INNER_BOTTOM_PADDING_Y;

        return result;
    }

    _renderRows(nestedTree, index, maxColumns, initialX, initialY) {
        let sortedNestedTree = nestedTree.sort((a, b) => b.nestedcount - a.nestedcount);
        let cursorX = initialX, cursorY = initialY;
        let maxColumnCount = 0;
        let maxHeight = 0;
        let maxWidth = 0;
        let columnCount = 0;

        for (let i = 0; i < sortedNestedTree.length; i++) {
            let node = sortedNestedTree[i];

            node.x = cursorX;
            node.y = cursorY;

            if (node.children.length > 0) { // It is not a leaf
                let maxColumnsConstraint = node.nestedcount > maxColumns ? maxColumns - columnCount : this.maxChildHorizontalCount;
                let nestedPositionResult = this._renderRows(node.children, i, maxColumnsConstraint, SIZE_REFERENCE.PADDING_X, SIZE_REFERENCE.INNER_TOP_PADDING_Y);

                columnCount += nestedPositionResult.maxColumnCount;
            } else { // It's a leaf
                columnCount++;
            }

            // Setting the maximum value of column count
            if (columnCount > maxColumnCount) {
                maxColumnCount = columnCount;
            }

            // Discovering the maximum height (reference height for the row). Will be used when breaking the line
            let yIncrement = node.height + SIZE_REFERENCE.PADDING_Y;

            if (yIncrement > maxHeight) {
                maxHeight = yIncrement;
            }

            // Incrementing X or breaking the line
            if (node.nestedcount > maxColumns || (columnCount >= maxColumns)) {
                cursorY += maxHeight;
                cursorX = SIZE_REFERENCE.PADDING_X;

                columnCount = 0;
                maxHeight = 0;
            } else {
                cursorX += node.width + SIZE_REFERENCE.PADDING_X;

                if (cursorX > maxWidth) {
                    maxWidth = cursorX;
                }
            }
        }

        return {maxColumnCount, maxWidth, maxHeight};
    }
}

module.exports = NestedLayoutEngine;