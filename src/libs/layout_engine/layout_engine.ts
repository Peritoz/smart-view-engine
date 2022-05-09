import {LayoutTypes} from "../common/layout_types.enum";
import {LayoutSettings} from "@libs/layout_engine/settings";
import {HydratedViewNode, HydratedView} from "../view/hydrated_view";
import {SemanticEngine} from "@libs/semantic_engine/semantic_engine";

export class LayoutEngine {
    protected layoutType: LayoutTypes;
    protected maxHorizontalCount: number;
    protected maxChildHorizontalCount: number;
    protected semanticEngine: SemanticEngine;

    constructor(settings: Partial<LayoutSettings>, semanticEngine: SemanticEngine) {
        this.layoutType = settings && settings.layoutType ? settings.layoutType : LayoutTypes.NESTED;
        this.maxHorizontalCount = settings && settings.maxHorizontalCount ? settings.maxHorizontalCount : 5;
        this.maxChildHorizontalCount = settings && settings.maxChildHorizontalCount ? settings.maxChildHorizontalCount : 2;
        this.semanticEngine = semanticEngine;
    }

    private generateView = (view: HydratedView, lowerElements: Array<HydratedViewNode>) => {
        if (lowerElements) {
            lowerElements.forEach((childViewNode) => {
                let parents = this.semanticEngine.getParents(childViewNode.modelNodeId);
                let upperElements: Array<HydratedViewNode> = [];

                // Creating parents (viewNodes)
                if (parents) {
                    parents.forEach((parent) => {
                        let parentViewNode = view.createViewNode(parent.identifier, parent.identifier, parent.name, parent.type, 0, 0);
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

                    this.generateView(view, upperElements);
                }
            });
        }
    };

    convertToView = (viewName: string) => {
        try {
            let view = new HydratedView(viewName, viewName);
            let leaves = this.semanticEngine.getLeaves();
            let lowerElements: Array<HydratedViewNode> = [];

            // Initializing the creation of all leaves (viewNodes)
            if (leaves) {
                leaves.forEach((leaf) => {
                    let viewNode = view.createViewNode(leaf.identifier, `${leaf.identifier}_1`, leaf.name, leaf.type, 0, 0);

                    view.addViewNode(viewNode);

                    lowerElements.push(viewNode);
                });
            }

            // Recursive processing for create View
            this.generateView(view, lowerElements);

            return view;
        } catch (e) {
            throw e;
        }
    };
}