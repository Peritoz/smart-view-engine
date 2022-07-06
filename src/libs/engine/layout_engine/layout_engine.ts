import { Settings } from "@libs/engine/settings";
import { HydratedView } from "../../model/hydrated_view";
import { SemanticEngine } from "@libs/engine/semantic_engine/semantic_engine";
import { HydratedViewNode } from "@libs/model/view_node";
import uniqId from "uniqid";

export class LayoutEngine {
  protected settings: Settings;
  protected semanticEngine: SemanticEngine;

  constructor(settings: Settings, semanticEngine: SemanticEngine) {
    this.settings = settings;
    this.semanticEngine = semanticEngine;
  }

  /**
   * Applies the chosen layout to a given View recursively
   * @param view Input view to be processed
   * @param children Current level elements
   */
  private applyLayoutToView = (
    view: HydratedView,
    children: Array<HydratedViewNode>
  ) => {
    if (children) {
      for (let i = 0; i < children.length; i++) {
        const childViewNode = children[i];
        let parents = this.semanticEngine.getParents(childViewNode.modelNodeId);
        let upperElements: Array<HydratedViewNode> = [];

        // Creating parents (viewNodes)
        if (parents) {
          for (let j = 0; j < parents.length; j++) {
            const parent = parents[j];
            let parentViewNode = view.createViewNode(
              parent.identifier,
              parent.identifier,
              parent.name,
              parent.type,
              0,
              0,
              null
            );
            let copyChildViewNode = childViewNode;

            view.addViewNode(parentViewNode);
            upperElements.push(parentViewNode);

            // Creating deep copy of Child node and its children
            if (childViewNode.parentId) {
              // If already there is a set parent
              copyChildViewNode =
                view.copyViewNodeAndItsChildren(childViewNode);
            }

            // Relating with parent
            view.nestViewNode(parentViewNode, copyChildViewNode);
          }

          this.applyLayoutToView(view, upperElements);
        }
      }
    }
  };

  /**
   * Generates an initial View. The elements (View Nodes) are created with default dimension and position
   * @param viewName View name
   * @return HydratedView
   */
  convertPathsToView = (viewName: string): HydratedView => {
    try {
      let view = new HydratedView(viewName, viewName);
      let leaves = this.semanticEngine.getLeaves();
      let children: Array<HydratedViewNode> = [];

      // Initializing the creation of all leaves (viewNodes)
      if (leaves) {
        leaves.forEach((leaf) => {
          let viewNode = view.createViewNode(
            leaf.identifier,
            `${leaf.identifier}-${uniqId()}`,
            leaf.name,
            leaf.type,
            0,
            0,
            null
          );

          view.addViewNode(viewNode);

          children.push(viewNode);
        });
      }

      // Recursive processing for create View
      this.applyLayoutToView(view, children);

      return view;
    } catch (e) {
      throw e;
    }
  };
}
