import { LayoutTypes } from "../../src/libs/common/layout_types.enum";
import { SmartViewEngine } from "../../src/libs/smart_view_engine";
import { View, ViewNode } from "../../src/libs/view/hydrated_view";

describe("Nested Layout Rendering", () => {
  describe("Homogeneous Input", () => {
    it("Case A: One row", async () => {
      const paths = [
        [
          { identifier: "A", name: "A", type: "T1" },
          { identifier: "A1", name: "A1", type: "T2" },
        ],
        [
          { identifier: "A", name: "A", type: "T1" },
          { identifier: "A2", name: "A2", type: "T2" },
        ],
        [
          { identifier: "B", name: "B", type: "T1" },
          { identifier: "B1", name: "B1", type: "T2" },
        ],
        [
          { identifier: "B", name: "B", type: "T1" },
          { identifier: "B2", name: "B2", type: "T2" },
        ],
      ];

      const engine = new SmartViewEngine({
        layoutType: LayoutTypes.NESTED,
        maxHorizontalCount: 2,
        maxChildHorizontalCount: 2,
      });

      const view: View = await engine.generateView(paths, "Case A");
      const nodes = view.viewNodes;
      const a = nodes.find((node: ViewNode) => node.modelNodeId === "A");
      const b = nodes.find((node: ViewNode) => node.modelNodeId === "B");
      const a1 = nodes.find((node: ViewNode) => node.modelNodeId === "A1");
      const b1 = nodes.find((node: ViewNode) => node.modelNodeId === "B1");
      const a2 = nodes.find((node: ViewNode) => node.modelNodeId === "A2");
      const b2 = nodes.find((node: ViewNode) => node.modelNodeId === "B2");

      expect(nodes.length).toBe(6);
      expect(a).toBeDefined();
      expect(a?.parent).toBeNull();
      expect(b).toBeDefined();
      expect(b?.parent).toBeNull();
      expect(a1).toBeDefined();
      expect(a1?.parent).toBe("A");
      expect(a2).toBeDefined();
      expect(a2?.parent).toBe("A");
      expect(b1).toBeDefined();
      expect(b1?.parent).toBe("B");
      expect(b2).toBeDefined();
      expect(b2?.parent).toBe("B");

      console.log(view.viewNodes);
    });
  });
});
