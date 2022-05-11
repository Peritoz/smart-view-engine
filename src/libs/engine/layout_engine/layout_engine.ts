import { Settings } from "@libs/engine/layout_engine/settings";
import { HydratedView } from "../../model/hydrated_view";
import { SemanticEngine } from "@libs/engine/semantic_engine/semantic_engine";
import { HydratedViewNode } from "@libs/model/view_node";

export class LayoutEngine {
  protected settings: Settings;
  protected semanticEngine: SemanticEngine;

  constructor(settings: Settings, semanticEngine: SemanticEngine) {
    this.settings = settings;
    this.semanticEngine = semanticEngine;
  }

  private generateView = (
    view: HydratedView,
    lowerElements: Array<HydratedViewNode>
  ) => {
    if (lowerElements) {
      lowerElements.forEach((childViewNode) => {
        let parents = this.semanticEngine.getParents(childViewNode.modelNodeId);
        let upperElements: Array<HydratedViewNode> = [];

        // Creating parents (viewNodes)
        if (parents) {
          parents.forEach((parent) => {
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
            if (childViewNode.parent) {
              // If already there is a set parent
              copyChildViewNode =
                view.copyViewNodeAndItsChildren(childViewNode);
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
          let viewNode = view.createViewNode(
            leaf.identifier,
            `${leaf.identifier}_1`,
            leaf.name,
            leaf.type,
            0,
            0,
            null
          );

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
