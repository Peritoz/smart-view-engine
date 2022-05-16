import {LayoutTypes} from "../../src/libs/common/layout_types.enum";
import {SmartViewEngine} from "../../src";
import {View} from "../../src/libs/model/view";
import {ViewNode} from "../../src/libs/model/view_node";

describe("Nested Layout Rendering", () => {
    describe("Homogeneous Input", () => {
        it("Case A: One row", (done) => {
            const paths = [
                [
                    {identifier: "A", name: "A", type: "T1"},
                    {identifier: "A1", name: "A1", type: "T2"},
                ],
                [
                    {identifier: "A", name: "A", type: "T1"},
                    {identifier: "A2", name: "A2", type: "T2"},
                ],
                [
                    {identifier: "B", name: "B", type: "T1"},
                    {identifier: "B1", name: "B1", type: "T2"},
                ],
                [
                    {identifier: "B", name: "B", type: "T1"},
                    {identifier: "B2", name: "B2", type: "T2"},
                ],
            ];

            const engine = new SmartViewEngine({
                layoutType: LayoutTypes.NESTED,
                maxHorizontalCount: 2,
                maxChildHorizontalCount: 2,
            });

            const view: View = engine.generateView(paths, "Case A");
            const nodes = view.viewNodes;
            const a = nodes.find((node: ViewNode) => node.name === "A");
            const b = nodes.find((node: ViewNode) => node.name === "B");
            const a1 = nodes.find((node: ViewNode) => node.name === "A1");
            const b1 = nodes.find((node: ViewNode) => node.name === "B1");
            const a2 = nodes.find((node: ViewNode) => node.name === "A2");
            const b2 = nodes.find((node: ViewNode) => node.name === "B2");

            expect(nodes.length).toBe(6);
            expect(a).toBeDefined();
            expect(a?.parentId).toBeNull();
            expect(b).toBeDefined();
            expect(b?.parentId).toBeNull();
            expect(a1).toBeDefined();
            expect(a1?.parentId).toBe(a.modelNodeId);
            expect(a2).toBeDefined();
            expect(a2?.parentId).toBe(a.modelNodeId);
            expect(b1).toBeDefined();
            expect(b1?.parentId).toBe(b.modelNodeId);
            expect(b2).toBeDefined();
            expect(b2?.parentId).toBe(b.modelNodeId);

            done();
        });
    });
});
