const NestedLayoutEngine = require("./layout_engine/specialized_layout_engines/linear_layout_engines/hierarchical_layout_engines/specialized_layout_engines/nested_layout_engine");
const HierarchyLayoutEngine = require("./layout_engine/specialized_layout_engines/linear_layout_engines/hierarchical_layout_engines/specialized_layout_engines/hierarchy_layout_engine");
const SemanticEngine = require("./semantic_engine/semantic_engine");
const {LAYOUT_TYPES} = require("./common/layout_constants");

function layoutToCode(layout) {
    switch (layout.toLowerCase()) {
        case "nested":
            return LAYOUT_TYPES.NESTED;
        case "hierarchy":
            return LAYOUT_TYPES.HIERARCHY;
        default:
            return LAYOUT_TYPES.NESTED;
    }
}

class SmartViewEngine {
    constructor(settings) {
        this.layoutType = settings && settings.layoutType ? layoutToCode(settings.layoutType) : LAYOUT_TYPES.NESTED;
        this.maxHorizontalCount = settings && settings.maxHorizontalCount ? settings.maxHorizontalCount : 5;
        this.maxChildHorizontalCount = settings && settings.maxChildHorizontalCount ? settings.maxChildHorizontalCount : 2;
    }

    async generateView(paths, title) {
        try {
            let layoutEngine;
            let semanticEngine;
            let settings = {
                layoutType: this.layoutType,
                maxHorizontalCount: this.maxHorizontalCount,
                maxChildHorizontalCount: this.maxChildHorizontalCount,
            };

            switch (this.layoutType) {
                case LAYOUT_TYPES.NESTED:
                    layoutEngine = new NestedLayoutEngine(settings);
                    break;
                case LAYOUT_TYPES.HIERARCHY:
                    layoutEngine = new HierarchyLayoutEngine(settings);
                    break;
                default:
                    layoutEngine = new NestedLayoutEngine(settings);
            }

            semanticEngine = new SemanticEngine(paths);
            semanticEngine.processPaths();

            let view = layoutEngine.convertToView(semanticEngine, title || "Unknown");

            layoutEngine.processLayout(view);

            // IMPORTANT: Sorting to put upper level nodes first because of the diagram rendering logic
            view.sortViewNodesParentsFirst();

            return view.getView();
        } catch (e) {
            console.log(e);

            throw e;
        }
    }
}

module.exports = SmartViewEngine;