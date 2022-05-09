import { LayoutTypes } from "./common/layout_types.enum";
import { LayoutSettings } from "@libs/layout_engine/settings";
import { View } from "@libs/view/hydrated_view";
import { NestedLayoutEngine } from "./layout_engine/linear/hierarchical/specialized/nested_layout_engine";
import { HierarchyLayoutEngine } from "./layout_engine/linear/hierarchical/specialized/hierarchy_layout_engine";
import { SemanticEngine } from "./semantic_engine/semantic_engine";

export interface PathElement {
  identifier: string;
  name: string;
  type: string;
}

function layoutToCode(layout: string) {
  switch (layout.toLowerCase()) {
    case "nested":
      return LayoutTypes.NESTED;
    case "hierarchy":
      return LayoutTypes.HIERARCHY;
    default:
      return LayoutTypes.NESTED;
  }
}

export class SmartViewEngine {
  protected layoutType: LayoutTypes;
  protected maxHorizontalCount: number;
  protected maxChildHorizontalCount: number;

  constructor(settings: LayoutSettings) {
    this.layoutType =
      settings && settings.layoutType
        ? layoutToCode(settings.layoutType)
        : LayoutTypes.NESTED;
    this.maxHorizontalCount =
      settings && settings.maxHorizontalCount ? settings.maxHorizontalCount : 5;
    this.maxChildHorizontalCount =
      settings && settings.maxChildHorizontalCount
        ? settings.maxChildHorizontalCount
        : 2;
  }

  async generateView(
    paths: Array<Array<PathElement>>,
    title: string
  ): Promise<View> {
    try {
      let layoutEngine;
      let semanticEngine = new SemanticEngine(paths);
      let settings: LayoutSettings = {
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
