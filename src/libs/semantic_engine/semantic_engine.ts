import {PathElement} from "@libs/smart_view_engine";

export class SemanticEngine {
    protected paths: any;
    protected modelElements: any[];
    protected hash: { nodes: { [key: string]: PathElement }; parents: { [key: string]: Array<string> } };
    protected leaves: any[];

    constructor(queryResult: Array<Array<PathElement>>) {
        this.paths = queryResult;
        this.modelElements = [];
        this.hash = {
            nodes: {}, // Key = identifier, Value = Node
            parents: {}, // Key = identifier, Value = Parents Identifiers
        };
        this.leaves = [];
    }

    _findLeaves = () => {
        this.modelElements.forEach((element) => {
            if (element.children.length === 0) {
                this.leaves.push(element.parent.identifier);
            }
        });
    };

    /**
     * Extracts all Level 0 elements from query response
     * @returns {[]}
     */
    processPaths = () => {
        let objectMap: { [key: string]: number } = {};
        let indexFirstElementFound, indexSecondElementFound, indexChildFound;

        // Separates parent nodes, with its children
        this.paths.forEach((path: Array<PathElement>) => {
            if (path.length >= 2) {
                for (let j = 0; j < path.length - 1; j++) {
                    let firstElement: PathElement = path[j];
                    let secondElement: PathElement = path[j + 1];

                    indexFirstElementFound = objectMap[firstElement.identifier];
                    indexSecondElementFound = objectMap[secondElement.identifier];

                    if (indexFirstElementFound === undefined) {
                        objectMap[firstElement.identifier] = this.modelElements.length;

                        this.modelElements.push({
                            parent: firstElement,
                            children: [
                                secondElement
                            ],
                            isRoot: j === 0
                        });

                        // Including in Hash for fast lookup
                        if (!this.hash.nodes[secondElement.identifier]) {
                            this.hash.nodes[secondElement.identifier] = secondElement;
                        }

                        if (!this.hash.nodes[firstElement.identifier]) {
                            this.hash.nodes[firstElement.identifier] = firstElement;
                        }
                    } else {
                        indexChildFound = this.modelElements[indexFirstElementFound].children.findIndex(
                            (e: PathElement) => e.identifier === secondElement.identifier
                        );

                        if (indexChildFound === -1) {
                            this.modelElements[indexFirstElementFound].children.push(secondElement);
                        }
                    }

                    // Mapping parents
                    if (this.hash.parents[secondElement.identifier]) {
                        // @ts-ignore
                        this.hash.parents[secondElement.identifier] = [...new Set([
                            ...this.hash.parents[secondElement.identifier], firstElement.identifier])
                        ];
                    } else {
                        this.hash.parents[secondElement.identifier] = [firstElement.identifier];
                    }

                    if (indexSecondElementFound === undefined) {
                        objectMap[secondElement.identifier] = this.modelElements.length;

                        this.modelElements.push({
                            parent: secondElement,
                            children: [],
                            isRoot: false
                        });

                        // Including in Hash for fast lookup
                        if (!this.hash.nodes[secondElement.identifier]) {
                            this.hash.nodes[secondElement.identifier] = secondElement;
                        }
                    }
                }
            }
        });

        this._findLeaves();

        this.paths = [];
    };

    getElements = () => {
        return this.modelElements;
    }

    getParents = (identifier: string) => {
        let parentsIds = this.hash.parents[identifier];
        let parents: Array<PathElement> = [];

        if (parentsIds) {
            parentsIds.forEach((parentId) => {
                const parent = this.hash.nodes[parentId];

                if (parent) {
                    parents.push(parent);
                }
            });
        }

        return parents;
    };

    getLeaves = () => {
        let leavesIds = this.leaves;
        let leaves: Array<PathElement> = [];

        if (leavesIds) {
            leavesIds.forEach((leafId) => {
                const leaf = this.hash.nodes[leafId];

                if (leaf) {
                    leaves.push(leaf);
                }
            });
        }

        return leaves;
    }
}