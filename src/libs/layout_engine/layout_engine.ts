import {LayoutTypes} from "../common/layout_types.enum";

const View = require("../view_factory/view");

class LayoutEngine {
    protected layoutType: number;
    protected maxHorizontalCount: number;
    protected maxChildHorizontalCount: number;

    constructor(settings) {
        this.layoutType = settings && settings.layoutType ? settings.layoutType : LayoutTypes.NESTED;
        this.maxHorizontalCount = settings && settings.maxHorizontalCount ? settings.maxHorizontalCount : 5;
        this.maxChildHorizontalCount = settings && settings.maxChildHorizontalCount ? settings.maxChildHorizontalCount : 2;
    }

    _generateView = (view, lowerElements, semanticEngine) => {
        if (lowerElements) {
            lowerElements.forEach((childViewNode) => {
                let parents = semanticEngine.getParents(childViewNode.modelNodeId);
                let upperElements = [];

                // Creating parents (viewNodes)
                if (parents) {
                    parents.forEach((parent) => {
                        let parentViewNode = view.createViewNode(null, parent.identifier, parent.identifier, parent.name, parent.type, 0, 0);
                        let copyChildViewNode = childViewNode;

                        view.addViewNode(parentViewNode);
                        upperElements.push(parentViewNode);

                        // Creating deep copy of Child node and its children
                        if (childViewNode.parent) { // If already there is a set parent
                            copyChildViewNode = view.copyViewNodeAndItsChildren(childViewNode);
                        }

                        // Relating with parent
                        view.nestViewNode(parentViewNode, copyChildViewNode);
                    });

                    this._generateView(view, upperElements, semanticEngine);
                }
            });
        }
    };

    convertToView = (semanticEngine, viewName) => {
        try {
            let view = new View(viewName, viewName);
            let leaves = semanticEngine.getLeaves();
            let lowerElements = [];

            // Initializing the creation of all leaves (viewNodes)
            if (leaves) {
                leaves.forEach((leaf) => {
                    let viewNode = view.createViewNode(null, leaf.identifier, `${leaf.identifier}_1`, leaf.name, leaf.type, 0, 0);

                    view.addViewNode(viewNode);

                    lowerElements.push(viewNode);
                });
            }

            // Recursive processing for create View
            this._generateView(view, lowerElements, semanticEngine);

            return view;
        } catch (e) {
            throw e;
        }
    };
}

module.exports = LayoutEngine;