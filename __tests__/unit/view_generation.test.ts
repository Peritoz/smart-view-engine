import {SemanticEngine} from "../../src/libs/engine/semantic_engine/semantic_engine";
import {
    HierarchyLayoutEngine
} from "../../src/libs/engine/layout_engine/linear/hierarchical/specialized/hierarchy_layout_engine";
import {HydratedView} from "../../src/libs/model/hydrated_view";
import {Settings} from "../../src/libs/engine/layout_engine/settings";
import {SmartViewEngine} from "../../src";
import {HydratedViewNode} from "../../src/libs/model/view_node";

const basicPaths = require("../data/paths/basic.json");
const complexPaths = require("../data/paths/complex.json");

describe("Smart View Rendering", () => {
    describe("Basic Layouts", () => {
        it("Inserting different elements in a Row", (done) => {
            const layoutSettings = new Settings({
                layoutType: "hierarchy",
                maxHorizontalCount: 4,
                maxChildHorizontalCount: 2,
                spaceBetween: 2,
                sizeUnit: 5,
                marginX: 1,
                marginY: 1,
                spaceToOuterLabel: 1,
                labelWidth: 4,
                labelHeight: 2,
            });

            const hierarchyLayoutProcessor = new HierarchyLayoutEngine(
                layoutSettings,
                new SemanticEngine([])
            );
            const view = new HydratedView("1", "test");

            view.addViewNode(view.createViewNode("1", "1", "EL1", "T"));
            view.addViewNode(view.createViewNode("2", "2", "EL2", "T"));
            view.addViewNode(view.createViewNode("3", "3", "EL3", "T"));

            const outputView = hierarchyLayoutProcessor.processLayout(view);

            expect(outputView.getId()).toBeDefined();
            expect(outputView.getName()).toBeDefined();
            expect(outputView.getViewNodes().length).toBe(3);
            expect(outputView.getHorizontalBounds().max).toBe(49);

            done();
        });
    });

    describe("Hierarchical Rendering", () => {
        const layoutSettings = new Settings({
            layoutType: "hierarchy",
            maxHorizontalCount: 4,
            maxChildHorizontalCount: 2,
            spaceBetween: 2,
            sizeUnit: 5,
            marginX: 1,
            marginY: 1,
            spaceToOuterLabel: 1,
            labelWidth: 4,
            labelHeight: 2,
        });

        it("Basic", (done) => {
            let smartView = new SmartViewEngine(layoutSettings);

            const view = smartView.generateView(basicPaths, "T1");

            const A = view.viewNodes.find((n: HydratedViewNode) => n.name === "A");
            const B = view.viewNodes.find((n: HydratedViewNode) => n.name === "B");
            const B1 = view.viewNodes.find((n: HydratedViewNode) => n.name === "B1");
            const B11 = view.viewNodes.find(
                (n: HydratedViewNode) => n.name === "B1-1"
            );
            const B2 = view.viewNodes.find((n: HydratedViewNode) => n.name === "B2");
            const B21 = view.viewNodes.find(
                (n: HydratedViewNode) => n.name === "B2-1"
            );
            const C = view.viewNodes.find((n: HydratedViewNode) => n.name === "C");
            const C1 = view.viewNodes.find((n: HydratedViewNode) => n.name === "C1");

            expect(A).toBeDefined();
            expect(B).toBeDefined();
            expect(B1).toBeDefined();
            expect(B11).toBeDefined();
            expect(B2).toBeDefined();
            expect(B21).toBeDefined();
            expect(C).toBeDefined();
            expect(C1).toBeDefined();

            expect(A.width).toBe(49);
            expect(A.height).toBe(5);
            expect(A.x).toBe(0);
            expect(A.y).toBe(0);

            expect(B.width).toBe(32);
            expect(B.height).toBe(5);
            expect(B.x).toBe(0);
            expect(B.y).toBe(7);

            expect(B1.width).toBe(15);
            expect(B1.height).toBe(5);
            expect(B1.x).toBe(0);
            expect(B1.y).toBe(14);

            expect(B11.width).toBe(15);
            expect(B11.height).toBe(5);
            expect(B11.x).toBe(0);
            expect(B11.y).toBe(21);

            expect(B2.width).toBe(15);
            expect(B2.height).toBe(5);
            expect(B2.x).toBe(17);
            expect(B2.y).toBe(14);

            expect(B21.width).toBe(15);
            expect(B21.height).toBe(5);
            expect(B21.x).toBe(17);
            expect(B21.y).toBe(21);

            expect(C.width).toBe(15);
            expect(C.height).toBe(5);
            expect(C.x).toBe(34);
            expect(C.y).toBe(7);

            expect(C1.width).toBe(15);
            expect(C1.height).toBe(5);
            expect(C1.x).toBe(34);
            expect(C1.y).toBe(14);

            done();
        });

        it("Complex", (done) => {
            let smartView = new SmartViewEngine(layoutSettings);

            const view = smartView.generateView(complexPaths, "T1");

            const Analyst = view.viewNodes.find(
                (n: HydratedViewNode) => n.name === "Analyst"
            );
            const Guest = view.viewNodes.find(
                (n: HydratedViewNode) => n.name === "Guest"
            );
            const PerformAnalysis = view.viewNodes.find(
                (n: HydratedViewNode) => n.name === "Perform Corporative Analysis"
            );
            const ProvideData = view.viewNodes.find(
                (n: HydratedViewNode) => n.name === "Provide Updated Data"
            );
            const Archi = view.viewNodes.find(
                (n: HydratedViewNode) => n.name === "Archi"
            );
            const GitClient = view.viewNodes.find(
                (n: HydratedViewNode) => n.name === "Git Client"
            );
            const Arktect = view.viewNodes.find(
                (n: HydratedViewNode) => n.name === "Arktect"
            );

            expect(Analyst).toBeDefined();
            expect(Guest).toBeDefined();
            expect(PerformAnalysis).toBeDefined();
            expect(ProvideData).toBeDefined();
            expect(Archi).toBeDefined();
            expect(GitClient).toBeDefined();
            expect(Arktect).toBeDefined();

            // expect(Analyst.width).toBe(49);
            // expect(Analyst.height).toBe(5);
            // expect(Analyst.x).toBe(0);
            // expect(Analyst.y).toBe(0);
            //
            // expect(Guest.width).toBe(32);
            // expect(Guest.height).toBe(5);
            // expect(Guest.x).toBe(0);
            // expect(Guest.y).toBe(7);
            //
            // expect(PerformAnalysis.width).toBe(15);
            // expect(PerformAnalysis.height).toBe(5);
            // expect(PerformAnalysis.x).toBe(0);
            // expect(PerformAnalysis.y).toBe(14);
            //
            // expect(ProvideData.width).toBe(15);
            // expect(ProvideData.height).toBe(5);
            // expect(ProvideData.x).toBe(0);
            // expect(ProvideData.y).toBe(21);
            //
            // expect(Archi.width).toBe(15);
            // expect(Archi.height).toBe(5);
            // expect(Archi.x).toBe(17);
            // expect(Archi.y).toBe(14);
            //
            // expect(GitClient.width).toBe(15);
            // expect(GitClient.height).toBe(5);
            // expect(GitClient.x).toBe(17);
            // expect(GitClient.y).toBe(21);
            //
            // expect(Arktect.width).toBe(15);
            // expect(Arktect.height).toBe(5);
            // expect(Arktect.x).toBe(34);
            // expect(Arktect.y).toBe(7);

            done();
        });
    });

    describe("Nested Rendering", () => {
        const layoutSettings = new Settings({
            layoutType: "nested",
            maxHorizontalCount: 4,
            maxChildHorizontalCount: 2,
            spaceBetween: 2,
            sizeUnit: 5,
            marginX: 1,
            marginY: 1,
            spaceToOuterLabel: 1,
            labelWidth: 4,
            labelHeight: 2,
        });

        it("Basic", (done) => {
            let smartView = new SmartViewEngine(layoutSettings);

            const view = smartView.generateView(basicPaths, "T1");

            const A = view.viewNodes.find((n: HydratedViewNode) => n.name === "A");
            const B = view.viewNodes.find((n: HydratedViewNode) => n.name === "B");
            const B1 = view.viewNodes.find((n: HydratedViewNode) => n.name === "B1");
            const B11 = view.viewNodes.find(
                (n: HydratedViewNode) => n.name === "B1-1"
            );
            const B2 = view.viewNodes.find((n: HydratedViewNode) => n.name === "B2");
            const B21 = view.viewNodes.find(
                (n: HydratedViewNode) => n.name === "B2-1"
            );
            const C = view.viewNodes.find((n: HydratedViewNode) => n.name === "C");
            const C1 = view.viewNodes.find((n: HydratedViewNode) => n.name === "C1");

            expect(A).toBeDefined();
            expect(B).toBeDefined();
            expect(B1).toBeDefined();
            expect(B11).toBeDefined();
            expect(B2).toBeDefined();
            expect(B21).toBeDefined();
            expect(C).toBeDefined();
            expect(C1).toBeDefined();

            expect(B11.width).toBe(15);
            expect(B11.height).toBe(5);
            expect(B11.x).toBe(3);
            expect(B11.y).toBe(12);

            expect(B1.width).toBe(17);
            expect(B1.height).toBe(10);
            expect(B1.x).toBe(2);
            expect(B1.y).toBe(8);

            expect(B21.width).toBe(15);
            expect(B21.height).toBe(5);
            expect(B21.x).toBe(22);
            expect(B21.y).toBe(12);

            expect(B2.width).toBe(17);
            expect(B2.height).toBe(10);
            expect(B2.x).toBe(21);
            expect(B2.y).toBe(8);

            expect(B.width).toBe(38);
            expect(B.height).toBe(15);
            expect(B.x).toBe(1);
            expect(B.y).toBe(4);

            expect(C1.width).toBe(15);
            expect(C1.height).toBe(10);
            expect(C1.x).toBe(42);
            expect(C1.y).toBe(8);

            expect(C.width).toBe(17);
            expect(C.height).toBe(15);
            expect(C.x).toBe(41);
            expect(C.y).toBe(4);

            expect(A.width).toBe(59);
            expect(A.height).toBe(20);
            expect(A.x).toBe(0);
            expect(A.y).toBe(0);

            done();
        });

        it("Complex", (done) => {
            let smartView = new SmartViewEngine(layoutSettings);

            const view = smartView.generateView(complexPaths, "T1");

            const Analyst = view.viewNodes.find(
                (n: HydratedViewNode) => n.name === "Analyst"
            );
            const Guest = view.viewNodes.find(
                (n: HydratedViewNode) => n.name === "Guest"
            );
            const PerformAnalysis = view.viewNodes.find(
                (n: HydratedViewNode) => n.name === "Perform Corporative Analysis"
            );
            const ProvideData = view.viewNodes.find(
                (n: HydratedViewNode) => n.name === "Provide Updated Data"
            );
            const Archi = view.viewNodes.find(
                (n: HydratedViewNode) => n.name === "Archi"
            );
            const GitClient = view.viewNodes.find(
                (n: HydratedViewNode) => n.name === "Git Client"
            );
            const Arktect = view.viewNodes.find(
                (n: HydratedViewNode) => n.name === "Arktect"
            );

            expect(Analyst).toBeDefined();
            expect(Guest).toBeDefined();
            expect(PerformAnalysis).toBeDefined();
            expect(ProvideData).toBeDefined();
            expect(Archi).toBeDefined();
            expect(GitClient).toBeDefined();
            expect(Arktect).toBeDefined();

            // expect(Analyst.width).toBe(49);
            // expect(Analyst.height).toBe(5);
            // expect(Analyst.x).toBe(0);
            // expect(Analyst.y).toBe(0);
            //
            // expect(Guest.width).toBe(32);
            // expect(Guest.height).toBe(5);
            // expect(Guest.x).toBe(0);
            // expect(Guest.y).toBe(7);
            //
            // expect(PerformAnalysis.width).toBe(15);
            // expect(PerformAnalysis.height).toBe(5);
            // expect(PerformAnalysis.x).toBe(0);
            // expect(PerformAnalysis.y).toBe(14);
            //
            // expect(ProvideData.width).toBe(15);
            // expect(ProvideData.height).toBe(5);
            // expect(ProvideData.x).toBe(0);
            // expect(ProvideData.y).toBe(21);
            //
            // expect(Archi.width).toBe(15);
            // expect(Archi.height).toBe(5);
            // expect(Archi.x).toBe(17);
            // expect(Archi.y).toBe(14);
            //
            // expect(GitClient.width).toBe(15);
            // expect(GitClient.height).toBe(5);
            // expect(GitClient.x).toBe(17);
            // expect(GitClient.y).toBe(21);
            //
            // expect(Arktect.width).toBe(15);
            // expect(Arktect.height).toBe(5);
            // expect(Arktect.x).toBe(34);
            // expect(Arktect.y).toBe(7);

            done();
        });
    });
});
