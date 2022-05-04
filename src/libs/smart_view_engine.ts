import {LayoutTypes} from "./common/layout_types.enum";

const NestedLayoutEngine = require("./layout_engine/specialized_layout_engines/linear_layout_engines/hierarchical_layout_engines/specialized_layout_engines/nested_layout_engine");
const HierarchyLayoutEngine = require("./layout_engine/specialized_layout_engines/linear_layout_engines/hierarchical_layout_engines/specialized_layout_engines/hierarchy_layout_engine");
const SemanticEngine = require("./semantic_engine/semantic_engine");

function layoutToCode(layout) {
    switch (layout.toLowerCase()) {
        case "nested":
            return LayoutTypes.NESTED;
        case "hierarchy":
            return LayoutTypes.HIERARCHY;
        default:
            return LayoutTypes.NESTED;
    }
}

class SmartViewEngine {
    protected layoutType: string;
    protected maxHorizontalCount: number;
    protected maxChildHorizontalCount: number;

    constructor(settings) {
        this.layoutType = settings && settings.layoutType ? layoutToCode(settings.layoutType) : LayoutTypes.NESTED;
        this.maxHorizontalCount = settings && settings.maxHorizontalCount ? settings.maxHorizontalCount : 5;
        this.maxChildHorizontalCount = settings && settings.maxChildHorizontalCount ? settings.maxChildHorizontalCount : 2;
    }

    async generateView(paths, title) {
        try {
            let layoutEngine;
            let semanticEngine = new SemanticEngine(paths);;
            let settings = {
                layoutType: this.layoutType,
                maxHorizontalCount: this.maxHorizontalCount,
                maxChildHorizontalCount: this.maxChildHorizontalCount,
            };

            switch (this.layoutType) {
                case LayoutTypes.NESTED:
                    layoutEngine = new NestedLayoutEngine(settings, semanticEngine);
                    break;
                case LayoutTypes.HIERARCHY:
                    layoutEngine = new HierarchyLayoutEngine(settings, semanticEngine);
                    break;
                default:
                    layoutEngine = new NestedLayoutEngine(settings, semanticEngine);
            }

            semanticEngine.processPaths();

            let view = layoutEngine.convertToView(title || "Unknown");

            layoutEngine.processLayout(view);

            // IMPORTANT: Sorting to put upper level nodes first because of the diagram rendering logic
            view.sortViewNodesParentsFirst();

            return view.getView();
        } catch (e) {
            throw new Error("Unable to render smart view");
        }
    }
}

module.exports = SmartViewEngine;