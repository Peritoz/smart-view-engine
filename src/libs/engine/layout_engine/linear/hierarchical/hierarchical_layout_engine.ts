import { LayoutEngine } from "../../layout_engine";
import { LayoutDirector } from "@libs/engine/layout_engine/layout_builder/layout_director";
import { Alignment } from "@libs/common/alignment.enum";
import { HydratedViewNode } from "@libs/model/view_node";
import { Settings } from "@libs/engine/layout_engine/settings";
import { SemanticEngine } from "@libs/engine/semantic_engine/semantic_engine";
import { HydratedView } from "@libs/model/hydrated_view";

export class HierarchicalLayoutEngine extends LayoutEngine {
  constructor(settings: Settings, semanticEngine: SemanticEngine) {
    super(settings, semanticEngine);
  }

  /**
   * Groups all parent elements with its children
   * @param viewNodes View Nodes subset
   * @returns Tree representing the elements grouping
   */
  groupParentNodes = (viewNodes: Array<HydratedViewNode>) => {
    let map: { [key: string]: number } = {};
    let node: HydratedViewNode;
    let roots: Array<HydratedViewNode> = [];

    // First pass: Creates an object that represents a hash table of indexes
    for (let i = 0; i < viewNodes.length; i++) {
      map[viewNodes[i].viewNodeId] = i; // Initialize the map
      viewNodes[i].children = []; // Initialize children
      viewNodes[i].nestedCount = 0; // Initialize nested counter
    }

    // Second pass: Creates the tree
    for (let i = 0; i < viewNodes.length; i++) {
      node = viewNodes[i];
      if (node.parentId !== null) {
        let parent = viewNodes[map[node.parentId]];

        if (parent) {
          parent.children.push(node);
        }
      } else {
        roots.push(node);
      }
    }

    // Third pass: Calculates nested count
    this.calculateNestedCount(roots);

    return roots;
  };

  /**
   * Calculates how many elements are in a subtree
   * @param nestedTree Subtree
   * @return Number of elements in a subtree
   * @private
   */
  private calculateNestedCount(nestedTree: Array<HydratedViewNode>): number { // TODO: Optimize algorithm
    let upperNestedCount = 0;

    for (let i = 0; i < nestedTree.length; i++) {
      let node = nestedTree[i];

      if (node.children.length > 0) {
        let lowerNestedCount = this.calculateNestedCount(node.children);

        if (node.nestedCount) {
          node.nestedCount += lowerNestedCount;
        } else {
          node.nestedCount = lowerNestedCount;
        }

        upperNestedCount += lowerNestedCount + 1;
      } else {
        upperNestedCount++;
      }
    }

    return upperNestedCount;
  }

  /**
   * Layouts a given view adjusting its nodes' dimensions and position
   * @param nestedTree Tree containing View Node data and some extra metadata for better processing
   * @param layoutDirector Orchestrator for layout building
   * @protected
   */
  protected renderElements(
    nestedTree: Array<HydratedViewNode>,
    layoutDirector: LayoutDirector
  ): void {
    throw new Error(
      "Base class can't render Hierarchy properly. Use specialized class instead."
    );
  }

  /**
   * Orchestrates the complete layout processing. It's the start point to adjust the dimension and position of the nodes
   * from a given View passed as parameter
   * @param inputView View to be processed
   * @return View with new layout
   */
  processLayout(inputView: HydratedView): HydratedView {
    // Generating a tree of nested elements
    let nestedTree = this.groupParentNodes(inputView.getViewNodes());

    // Initializing layout
    const director = new LayoutDirector(this.settings);

    director.newCol(Alignment.EXPANDED, Alignment.START);
    director.newRow(Alignment.START, Alignment.EXPANDED);

    this.renderElements(nestedTree, director);

    director.toAbsolutePosition();

    const outputView = director.convertToView(
      inputView.getName(),
      inputView.getId()
    );

    // Setting the "paper" dimension
    outputView.setBounds(director.getPageWidth(), director.getPageHeight());

    return outputView;
  }
}
