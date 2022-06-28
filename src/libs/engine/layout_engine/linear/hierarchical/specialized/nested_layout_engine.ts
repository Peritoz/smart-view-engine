import { HierarchicalLayoutEngine } from "../hierarchical_layout_engine";
import { Settings } from "@libs/engine/layout_engine/settings";
import { SemanticEngine } from "@libs/engine/semantic_engine/semantic_engine";
import { HydratedViewNode } from "@libs/model/view_node";
import { LayoutDirector } from "@libs/engine/layout_engine/layout_builder/layout_director";
import { Alignment } from "@libs/common/alignment.enum";

export class NestedLayoutEngine extends HierarchicalLayoutEngine {
  constructor(settings: Settings, semanticEngine: SemanticEngine) {
    super(settings, semanticEngine);
  }

  protected renderElements(
    nestedTree: Array<HydratedViewNode>,
    layoutDirector: LayoutDirector
  ): void {
    if (nestedTree && nestedTree.length > 0) {
      for (let i = 0; i < nestedTree.length; i++) {
        const child = nestedTree[i];

        if (child.children && child.children.length > 0) {
          layoutDirector.newVisibleRow(
            child.name,
            child.type,
            Alignment.START,
            Alignment.EXPANDED,
            false
          );

          this.renderElements(child.children, layoutDirector);
        } else {
          layoutDirector.addMediumElementToCurrent(
            child.name,
            child.type,
            false
          );
        }
      }

      layoutDirector.navigateToParent(1);
    }
  }
}
