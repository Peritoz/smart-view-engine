import { SemanticEngine } from '@libs/engine/semantic_engine/semantic_engine';
import { Settings } from '@libs/engine/settings';
import { HierarchicalLayoutEngine } from '../hierarchical_layout_engine';
import { LayoutDirector } from '@libs/engine/layout_engine/builder/layout_director';
import { HydratedViewNode } from '@libs/model/view_node';
import { Alignment } from '@libs/common/alignment.enum';

export class HierarchyLayoutEngine extends HierarchicalLayoutEngine {
  constructor(settings: Settings, semanticEngine: SemanticEngine) {
    super(settings, semanticEngine);
  }

  /**
   * Layouts a given view adjusting its nodes' dimensions and position
   * @param nestedTrees Array of trees containing View Node data and some extra metadata for better processing
   * @param layoutDirector Orchestrator for layout building
   * @param childrenLimitPerGroup The maximum number of children per group. When exceeded another group will be created after
   * @protected
   */
  protected renderElements(
    nestedTrees: Array<HydratedViewNode>,
    layoutDirector: LayoutDirector,
    childrenLimitPerGroup: number = -1,
  ): void {
    const thereIsChildrenLimit: boolean =
      !isNaN(childrenLimitPerGroup) &&
      childrenLimitPerGroup !== -1 &&
      childrenLimitPerGroup > 0;

    if (nestedTrees && nestedTrees.length > 0) {
      for (let i = 0; i < nestedTrees.length; i++) {
        const child = nestedTrees[i];

        layoutDirector.newCol(Alignment.EXPANDED, Alignment.START);
        layoutDirector.newMediumElementToCurrent(
          child.name,
          child.type,
          false,
          child.modelNodeId,
        );

        if (child.children && child.children.length > 0) {
          layoutDirector.newRow(Alignment.START, Alignment.EXPANDED);

          this.renderElements(child.children, layoutDirector);

          layoutDirector.navigateToParent();
        }

        layoutDirector.navigateToParent();

        // Breaking line
        if (thereIsChildrenLimit && (i + 1) % childrenLimitPerGroup === 0) {
          layoutDirector.navigateToParent();

          layoutDirector.newRow(Alignment.START, Alignment.EXPANDED);
        }
      }
    }
  }
}
