const NestedLayoutProcessor = require("./layoutProcessor/specializedLayoutProcessors/LinearLayoutProcessor/HierarchicalLayoutProcessor/specializedLayout/nested_layout_processor");
const HierarchyLayoutProcessor = require("./layoutProcessor/specializedLayoutProcessors/LinearLayoutProcessor/HierarchicalLayoutProcessor/specializedLayout/hierarchy_layout_processor");
const SemanticEngine = require("./semanticEngine/semantic_engine");
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
            let layoutProcessor;
            let semanticEngine;
            let settings = {
                layoutType: this.layoutType,
                maxHorizontalCount: this.maxHorizontalCount,
                maxChildHorizontalCount: this.maxChildHorizontalCount,
            };

            switch (this.layoutType) {
                case LAYOUT_TYPES.NESTED:
                    layoutProcessor = new NestedLayoutProcessor(settings);
                    break;
                case LAYOUT_TYPES.HIERARCHY:
                    layoutProcessor = new HierarchyLayoutProcessor(settings);
                    break;
                default:
                    layoutProcessor = new NestedLayoutProcessor(settings);
            }

            semanticEngine = new SemanticEngine(paths);
            semanticEngine.processPaths();

            let view = layoutProcessor.convertToView(semanticEngine, title || "Unknown");

            layoutProcessor.processLayout(view);

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