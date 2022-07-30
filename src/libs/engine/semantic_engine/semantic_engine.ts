import { PathElement } from "@libs/engine/smart_view_engine";

export interface SemanticElement {
  parent: PathElement;
  children: Array<PathElement>;
  isRoot: boolean;
}

export class SemanticEngine {
  protected paths: Array<Array<PathElement>>;
  protected modelElements: Array<SemanticElement>;
  protected maps: {
    nodes: Map<string, PathElement>;
    parents: Map<string, Array<string>>;
  };
  protected leaves: Array<string>;

  constructor(paths: Array<Array<PathElement>>) {
    this.paths = paths;
    this.modelElements = [];
    this.maps = {
      nodes: new Map(), // Key = identifier, Value = Node
      parents: new Map(), // Key = identifier, Value = Parents Identifiers
    };
    this.leaves = [];
  }

  findLeaves = () => {
    this.modelElements.forEach((element) => {
      if (element.children.length === 0) {
        this.leaves.push(element.parent.identifier);
      }
    });
  };

  private addNode(
    isRoot: boolean,
    objectMap: Map<string, number>,
    node: PathElement,
    child?: PathElement
  ) {
    objectMap.set(node.identifier, this.modelElements.length);

    this.modelElements.push({
      parent: node,
      children: child ? [child] : [],
      isRoot: isRoot,
    });

    // Mapping node for fast lookup
    if (!this.maps.nodes.get(node.identifier)) {
      this.maps.nodes.set(node.identifier, node);
    }

    // Mapping child for fast lookup
    if (child) {
      if (!this.maps.nodes.get(child.identifier)) {
        this.maps.nodes.set(child.identifier, child);
      }
    }
  }

  private addChildToNode(
    indexFirstElement: number,
    secondElement: PathElement
  ) {
    const indexChild: number | undefined = this.modelElements[
      indexFirstElement
    ].children.findIndex(
      (e: PathElement) => e.identifier === secondElement.identifier
    );

    if (indexChild === -1) {
      this.modelElements[indexFirstElement].children.push(secondElement);
    }
  }

  /**
   * Extracts all Level 0 elements from paths
   */
  processPaths = (): void => {
    let objectMap: Map<string, number> = new Map();
    let indexFirstElement, indexSecondElement;

    // Separates parent nodes, with its children
    this.paths.forEach((path: Array<PathElement>) => {
      // Length >= 2: it handles the parent/child chain
      if (path.length >= 2) {
        for (let j = 0; j < path.length - 1; j++) {
          const firstElement: PathElement = path[j];
          const secondElement: PathElement = path[j + 1];

          indexFirstElement = objectMap.get(firstElement.identifier);
          indexSecondElement = objectMap.get(secondElement.identifier);

          // If Semantic element doesn't exist then create it
          if (indexFirstElement === undefined) {
            this.addNode(j === 0, objectMap, firstElement, secondElement);
          } else {
            this.addChildToNode(indexFirstElement, secondElement);
          }

          // Mapping parents
          if (this.maps.parents.get(secondElement.identifier)) {
            const parents = this.maps.parents.get(secondElement.identifier);

            const updatedParents = parents
              ? [...new Set([...parents, firstElement.identifier])]
              : [firstElement.identifier];

            this.maps.parents.set(secondElement.identifier, updatedParents);
          } else {
            this.maps.parents.set(secondElement.identifier, [
              firstElement.identifier,
            ]);
          }

          // If the second element doesn't exist then create it
          if (indexSecondElement === undefined) {
            this.addNode(false, objectMap, secondElement);
          }
        }
      } else if (path.length === 1) { // Length === 1: it handles elements with no children
        const element: PathElement = path[0];
        const indexElement = objectMap.get(element.identifier);

        if (indexElement === undefined) {
          this.addNode(true, objectMap, element);
        }
      }
    });

    this.findLeaves();

    this.paths = [];
  };

  getElements = () => {
    return this.modelElements;
  };

  getParents = (identifier: string) => {
    let parentsIds = this.maps.parents.get(identifier);
    let parents: Array<PathElement> = [];

    if (parentsIds) {
      parentsIds.forEach((parentId) => {
        const parent = this.maps.nodes.get(parentId);

        if (parent) {
          parents.push(parent);
        }
      });
    }

    return parents;
  };

  getChildren = (identifier: string) => {
    const element = this.modelElements.find(
      (e) => e.parent.identifier === identifier
    );

    if (element) {
      return element.children;
    } else {
      return [];
    }
  };

  getLeaves = () => {
    let leavesIds = this.leaves;
    let leaves: Array<PathElement> = [];

    if (leavesIds) {
      leavesIds.forEach((leafId) => {
        const leaf = this.maps.nodes.get(leafId);

        if (leaf) {
          leaves.push(leaf);
        }
      });
    }

    return leaves;
  };
}
