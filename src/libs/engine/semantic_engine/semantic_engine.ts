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

  /**
   * Extracts all Level 0 elements from query response
   */
  processPaths = (): void => {
    let objectMap: Map<string, number> = new Map();
    let indexFirstElementFound, indexSecondElementFound, indexChildFound;

    // Separates parent nodes, with its children
    this.paths.forEach((path: Array<PathElement>) => {
      if (path.length >= 2) {
        for (let j = 0; j < path.length - 1; j++) {
          let firstElement: PathElement = path[j];
          let secondElement: PathElement = path[j + 1];

          indexFirstElementFound = objectMap.get(firstElement.identifier);
          indexSecondElementFound = objectMap.get(secondElement.identifier);

          // If Semantic element doesn't exists then create it
          if (indexFirstElementFound === undefined) {
            objectMap.set(firstElement.identifier, this.modelElements.length);

            this.modelElements.push({
              parent: firstElement,
              children: [secondElement],
              isRoot: j === 0,
            });

            // Including in Hash for fast lookup
            if (!this.maps.nodes.get(secondElement.identifier)) {
              this.maps.nodes.set(secondElement.identifier, secondElement);
            }

            if (!this.maps.nodes.get(firstElement.identifier)) {
              this.maps.nodes.set(firstElement.identifier, firstElement);
            }
          } else {
            indexChildFound = this.modelElements[
              indexFirstElementFound
            ].children.findIndex(
              (e: PathElement) => e.identifier === secondElement.identifier
            );

            if (indexChildFound === -1) {
              this.modelElements[indexFirstElementFound].children.push(
                secondElement
              );
            }
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

          // If the second element doesn't exists then create it
          if (indexSecondElementFound === undefined) {
            objectMap.set(secondElement.identifier, this.modelElements.length);

            this.modelElements.push({
              parent: secondElement,
              children: [],
              isRoot: false,
            });

            // Mapping for fast lookup
            if (!this.maps.nodes.get(secondElement.identifier)) {
              this.maps.nodes.set(secondElement.identifier, secondElement);
            }
          }
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
