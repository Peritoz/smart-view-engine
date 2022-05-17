import {SemanticEngine} from "../../../src/libs/engine/semantic_engine/semantic_engine";
import {PathElement} from "../../../src/libs/engine/smart_view_engine";

function validateSemanticTree(
  paths: Array<Array<PathElement>>,
  semanticEngine: SemanticEngine
) {
  for (let i = 0; i < paths.length; i++) {
    for (let j = 0; j < paths[i].length - 1; j++) {
      const parent = paths[i][j];
      const child = paths[i][j + 1];

      const parents = semanticEngine.getParents(child.identifier);
      const idsParents = parents.map((e) => e.identifier);

      if (!idsParents.includes(parent.identifier)) {
        return false;
      }

      const children = semanticEngine.getChildren(parent.identifier);
      const idsChildren = children.map((e) => e.identifier);

      if (!idsChildren.includes(child.identifier)) {
        return false;
      }
    }
  }

  return true;
}

describe("Semantic Engine", () => {
  describe("Paths Processing", () => {
    it("Happy input", (done) => {
      const paths = [
        [
          { identifier: "1", name: "A", type: "T1" },
          { identifier: "2", name: "B", type: "T2" },
        ],
        [
          { identifier: "3", name: "C", type: "T1" },
          { identifier: "4", name: "D", type: "T2" },
        ],
      ];
      const semanticEngine = new SemanticEngine(paths);

      semanticEngine.processPaths();

      const modelElements = semanticEngine.getElements();
      const leaves = semanticEngine.getLeaves();

      expect(modelElements.length).toBe(4);
      expect(leaves.length).toBe(2);
      expect(validateSemanticTree(paths, semanticEngine)).toBe(true);

      done();
    });

    it("Common parent", (done) => {
      const paths = [
        [
          { identifier: "1", name: "A", type: "T1" },
          { identifier: "2", name: "B", type: "T2" },
        ],
        [
          { identifier: "1", name: "A", type: "T1" },
          { identifier: "4", name: "D", type: "T2" },
        ],
      ];
      const semanticEngine = new SemanticEngine(paths);

      semanticEngine.processPaths();

      const modelElements = semanticEngine.getElements();
      const leaves = semanticEngine.getLeaves();

      expect(modelElements.length).toBe(3);
      expect(leaves.length).toBe(2);
      expect(validateSemanticTree(paths, semanticEngine)).toBe(true);

      done();
    });

    it("Common child", (done) => {
      const paths = [
        [
          { identifier: "1", name: "A", type: "T1" },
          { identifier: "4", name: "D", type: "T2" },
        ],
        [
          { identifier: "3", name: "C", type: "T1" },
          { identifier: "4", name: "D", type: "T2" },
        ],
      ];
      const semanticEngine = new SemanticEngine(paths);

      semanticEngine.processPaths();

      const modelElements = semanticEngine.getElements();
      const leaves = semanticEngine.getLeaves();

      expect(modelElements.length).toBe(3);
      expect(leaves.length).toBe(1);
      expect(validateSemanticTree(paths, semanticEngine)).toBe(true);

      done();
    });

    it("Mixed Cross Relationship: Common parent & Common child", (done) => {
      const paths = [
        [
          { identifier: "1", name: "A", type: "T1" },
          { identifier: "2", name: "B", type: "T2" },
        ],
        [
          { identifier: "1", name: "A", type: "T1" },
          { identifier: "4", name: "D", type: "T2" },
        ],
        [
          { identifier: "3", name: "C", type: "T1" },
          { identifier: "4", name: "D", type: "T2" },
        ],
      ];
      const semanticEngine = new SemanticEngine(paths);

      semanticEngine.processPaths();

      const modelElements = semanticEngine.getElements();
      const leaves = semanticEngine.getLeaves();
      expect(validateSemanticTree(paths, semanticEngine)).toBe(true);

      expect(modelElements.length).toBe(4);
      expect(leaves.length).toBe(2);

      done();
    });

    it("Heterogeneous Element Role: Parent and Child", (done) => {
      const paths = [
        [
          { identifier: "1", name: "A", type: "T1" },
          { identifier: "4", name: "D", type: "T2" },
        ],
        [
          { identifier: "3", name: "C", type: "T1" },
          { identifier: "1", name: "A", type: "T1" },
        ],
      ];
      const semanticEngine = new SemanticEngine(paths);

      semanticEngine.processPaths();

      const modelElements = semanticEngine.getElements();
      const leaves = semanticEngine.getLeaves();

      expect(modelElements.length).toBe(3);
      expect(leaves.length).toBe(1);
      expect(validateSemanticTree(paths, semanticEngine)).toBe(true);

      done();
    });

    it("Heterogeneous Input", (done) => {
      const paths = [
        [
          { identifier: "1", name: "A", type: "T1" },
          { identifier: "4", name: "D", type: "T2" },
          { identifier: "2", name: "B", type: "T2" },
        ],
        [
          { identifier: "3", name: "C", type: "T1" },
          { identifier: "4", name: "D", type: "T2" },
        ],
      ];
      const semanticEngine = new SemanticEngine(paths);

      semanticEngine.processPaths();

      const modelElements = semanticEngine.getElements();
      const leaves = semanticEngine.getLeaves();

      expect(modelElements.length).toBe(4);
      expect(leaves.length).toBe(1);
      expect(validateSemanticTree(paths, semanticEngine)).toBe(true);

      done();
    });
  });
});
