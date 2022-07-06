import { HierarchicalLayoutEngine } from "../hierarchical_layout_engine";
import { Settings } from "@libs/engine/settings";
import { SemanticEngine } from "@libs/engine/semantic_engine/semantic_engine";
import { HydratedViewNode } from "@libs/model/view_node";
import { LayoutDirector } from "@libs/engine/layout_engine/builder/layout_director";
import { Alignment } from "@libs/common/alignment.enum";

export class NestedLayoutEngine extends HierarchicalLayoutEngine {
  constructor(settings: Settings, semanticEngine: SemanticEngine) {
    super(settings, semanticEngine);
  }

  private renderNestedChildrenElements(
    nestedTrees: Array<HydratedViewNode>,
    layoutDirector: LayoutDirector,
    childrenLimitPerGroup: number = -1
  ): void {
    const thereIsChildrenLimit: boolean =
      !isNaN(childrenLimitPerGroup) &&
      childrenLimitPerGroup !== -1 &&
      childrenLimitPerGroup > 0;
    const treesLength = nestedTrees.length;

    if (nestedTrees && treesLength > 0) {
      for (let i = 0; i < treesLength; i++) {
        const currentElement = nestedTrees[i];
        const isLastElement = i === treesLength - 1;

        // Rendering element. If contains children, then render as a Visible Row, else render as Base Element
        if (currentElement.children && currentElement.children.length > 0) {
          layoutDirector.newVisibleRow(
            currentElement.name,
            currentElement.type,
            Alignment.START,
            Alignment.EXPANDED,
            false,
            currentElement.modelNodeId
          );

          layoutDirector.newCol(Alignment.EXPANDED, Alignment.START);
          layoutDirector.newRow(Alignment.START, Alignment.EXPANDED);

          this.renderNestedChildrenElements(
            currentElement.children,
            layoutDirector,
            this.settings.maxChildHorizontalCount
          );

          layoutDirector.navigateToParent(3);
        } else {
          layoutDirector.newMediumElementToCurrent(
            currentElement.name,
            currentElement.type,
            false,
            currentElement.modelNodeId
          );
        }

        // Breaking line
        if (
          thereIsChildrenLimit &&
          (i + 1) % childrenLimitPerGroup === 0 &&
          !isLastElement
        ) {
          layoutDirector.navigateToParent();
          layoutDirector.newRow(Alignment.START, Alignment.EXPANDED);
        }
      }
    }
  }

  /**
   * Layouts a given view adjusting its nodes' dimensions and position. Processes the top level elements only
   * @param nestedTrees Array of trees containing View Node data and some extra metadata for better processing
   * @param layoutDirector Orchestrator for layout building
   * @param childrenLimitPerGroup The maximum number of children per group. When exceeded another group will be created after
   * @protected
   */
  protected renderElements(
    nestedTrees: Array<HydratedViewNode>,
    layoutDirector: LayoutDirector,
    childrenLimitPerGroup: number = -1
  ): void {
    const thereIsChildrenLimit: boolean =
      !isNaN(childrenLimitPerGroup) &&
      childrenLimitPerGroup !== -1 &&
      childrenLimitPerGroup > 0;
    const treesLength = nestedTrees.length;

    if (nestedTrees && treesLength > 0) {
      for (let i = 0; i < treesLength; i++) {
        const child = nestedTrees[i];
        const isLastElement = i === treesLength - 1;

        // Rendering element
        this.renderNestedChildrenElements(
          [child],
          layoutDirector,
          this.settings.maxChildHorizontalCount
        );

        // Breaking line
        if (
          thereIsChildrenLimit &&
          (i + 1) % childrenLimitPerGroup === 0 &&
          !isLastElement
        ) {
          layoutDirector.navigateToParent();
          layoutDirector.newRow(Alignment.START, Alignment.EXPANDED);
        }
      }
    }
  }
}
