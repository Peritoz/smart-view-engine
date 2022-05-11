const chai = require('chai');

const SemanticEngine = require("../../business/smartViewEngine/semanticEngine/SemanticEngine");
const SmartView = require("../../business/smartViewEngine/SmartView");
const basicPaths = require("../data/paths/basic.json");
const complexPaths = require("../data/paths/complex.json");
const NestedLayoutProcessor = require("../../business/smartViewEngine/layoutProcessor/specializedLayoutProcessors/LinearLayoutProcessor/HierarchicalLayoutProcessor/specializedLayout/NestedLayoutProcessor");
const HierarchyLayoutProcessor = require("../../business/smartViewEngine/layoutProcessor/specializedLayoutProcessors/LinearLayoutProcessor/HierarchicalLayoutProcessor/specializedLayout/HierarchyLayoutProcessor");
const SmartViewSettings = require("../../business/smartViewEngine/layoutProcessor/layoutManager/SmartViewSettings");
const ModelView = require("../../business/smartViewEngine/viewFactory/ModelView");

describe('Smart View Rendering', () => {
    describe('Basic Layouts', () => {
        it('Inserting different elements in a Row', done => {
            const layoutSettings = new SmartViewSettings(
                {
                    layoutType: "hierarchy",
                    maxHorizontalCount: 4,
                    maxChildHorizontalCount: 2,
                    spaceBetween: 2,
                    sizeUnit: 5,
                    marginX: 1,
                    marginY: 1,
                    spaceToOuterLabel: 1,
                    labelWidth: 4,
                    labelHeight: 2
                }
            );

            const hierarchyLayoutProcessor = new HierarchyLayoutProcessor(layoutSettings);
            const view = new ModelView("1", "test");

            view.addViewNode(view.createViewNode("1", "1", "1", "EL1", "T"));
            view.addViewNode(view.createViewNode("2", "2", "2", "EL2", "T"));
            view.addViewNode(view.createViewNode("3", "3", "3", "EL3", "T"));

            const outputView = hierarchyLayoutProcessor.processLayout(view);

            chai.expect(outputView.getId()).not.undefined;
            chai.expect(outputView.getName()).not.undefined;
            chai.expect(outputView.getViewNodes().length).eql(3);
            chai.expect(outputView.getHorizontalBounds().max).eql(49);

            done();
        });
    });

    describe('Hierarchical Rendering', () => {
        const layoutSettings = new SmartViewSettings(
            {
                layoutType: "hierarchy",
                maxHorizontalCount: 4,
                maxChildHorizontalCount: 2,
                spaceBetween: 2,
                sizeUnit: 5,
                marginX: 1,
                marginY: 1,
                spaceToOuterLabel: 1,
                labelWidth: 4,
                labelHeight: 2
            }
        );

        it('Basic', done => {
            const semanticEngine = new SemanticEngine(basicPaths);
            semanticEngine.processPaths();

            let smartView = new SmartView("T1", new HierarchyLayoutProcessor(layoutSettings), semanticEngine);
            smartView.generate();

            const view = smartView.getView();

            const A = view.viewnodes.find((n) => n.name === "A");
            const B = view.viewnodes.find((n) => n.name === "B");
            const B1 = view.viewnodes.find((n) => n.name === "B1");
            const B11 = view.viewnodes.find((n) => n.name === "B1-1");
            const B2 = view.viewnodes.find((n) => n.name === "B2");
            const B21 = view.viewnodes.find((n) => n.name === "B2-1");
            const C = view.viewnodes.find((n) => n.name === "C");
            const C1 = view.viewnodes.find((n) => n.name === "C1");

            chai.expect(A).not.undefined;
            chai.expect(B).not.undefined;
            chai.expect(B1).not.undefined;
            chai.expect(B11).not.undefined;
            chai.expect(B2).not.undefined;
            chai.expect(B21).not.undefined;
            chai.expect(C).not.undefined;
            chai.expect(C1).not.undefined;

            chai.expect(A.width).eql(49);
            chai.expect(A.height).eql(5);
            chai.expect(A.x).eql(0);
            chai.expect(A.y).eql(0);

            chai.expect(B.width).eql(32);
            chai.expect(B.height).eql(5);
            chai.expect(B.x).eql(0);
            chai.expect(B.y).eql(7);

            chai.expect(B1.width).eql(15);
            chai.expect(B1.height).eql(5);
            chai.expect(B1.x).eql(0);
            chai.expect(B1.y).eql(14);

            chai.expect(B11.width).eql(15);
            chai.expect(B11.height).eql(5);
            chai.expect(B11.x).eql(0);
            chai.expect(B11.y).eql(21);

            chai.expect(B2.width).eql(15);
            chai.expect(B2.height).eql(5);
            chai.expect(B2.x).eql(17);
            chai.expect(B2.y).eql(14);

            chai.expect(B21.width).eql(15);
            chai.expect(B21.height).eql(5);
            chai.expect(B21.x).eql(17);
            chai.expect(B21.y).eql(21);

            chai.expect(C.width).eql(15);
            chai.expect(C.height).eql(5);
            chai.expect(C.x).eql(34);
            chai.expect(C.y).eql(7);

            chai.expect(C1.width).eql(15);
            chai.expect(C1.height).eql(5);
            chai.expect(C1.x).eql(34);
            chai.expect(C1.y).eql(14);

            done();
        });

        it('Complex', done => {
            const semanticEngine = new SemanticEngine(complexPaths);
            semanticEngine.processPaths();

            let smartView = new SmartView("T1", new HierarchyLayoutProcessor(layoutSettings), semanticEngine);
            smartView.generate();

            const view = smartView.getView();

            const Analyst = view.viewnodes.find((n) => n.name === "Analyst");
            const Guest = view.viewnodes.find((n) => n.name === "Guest");
            const PerformAnalysis = view.viewnodes.find((n) => n.name === "Perform Corporative Analysis");
            const ProvideData = view.viewnodes.find((n) => n.name === "Provide Updated Data");
            const Archi = view.viewnodes.find((n) => n.name === "Archi");
            const GitClient = view.viewnodes.find((n) => n.name === "Git Client");
            const Arktect = view.viewnodes.find((n) => n.name === "Arktect");

            chai.expect(Analyst).not.undefined;
            chai.expect(Guest).not.undefined;
            chai.expect(PerformAnalysis).not.undefined;
            chai.expect(ProvideData).not.undefined;
            chai.expect(Archi).not.undefined;
            chai.expect(GitClient).not.undefined;
            chai.expect(Arktect).not.undefined;

            // chai.expect(Analyst.width).eql(49);
            // chai.expect(Analyst.height).eql(5);
            // chai.expect(Analyst.x).eql(0);
            // chai.expect(Analyst.y).eql(0);
            //
            // chai.expect(Guest.width).eql(32);
            // chai.expect(Guest.height).eql(5);
            // chai.expect(Guest.x).eql(0);
            // chai.expect(Guest.y).eql(7);
            //
            // chai.expect(PerformAnalysis.width).eql(15);
            // chai.expect(PerformAnalysis.height).eql(5);
            // chai.expect(PerformAnalysis.x).eql(0);
            // chai.expect(PerformAnalysis.y).eql(14);
            //
            // chai.expect(ProvideData.width).eql(15);
            // chai.expect(ProvideData.height).eql(5);
            // chai.expect(ProvideData.x).eql(0);
            // chai.expect(ProvideData.y).eql(21);
            //
            // chai.expect(Archi.width).eql(15);
            // chai.expect(Archi.height).eql(5);
            // chai.expect(Archi.x).eql(17);
            // chai.expect(Archi.y).eql(14);
            //
            // chai.expect(GitClient.width).eql(15);
            // chai.expect(GitClient.height).eql(5);
            // chai.expect(GitClient.x).eql(17);
            // chai.expect(GitClient.y).eql(21);
            //
            // chai.expect(Arktect.width).eql(15);
            // chai.expect(Arktect.height).eql(5);
            // chai.expect(Arktect.x).eql(34);
            // chai.expect(Arktect.y).eql(7);

            done();
        });
    });

    describe('Nested Rendering', () => {
        const layoutSettings = new SmartViewSettings(
            {
                layoutType: "nested",
                maxHorizontalCount: 4,
                maxChildHorizontalCount: 2,
                spaceBetween: 2,
                sizeUnit: 5,
                marginX: 1,
                marginY: 1,
                spaceToOuterLabel: 1,
                labelWidth: 4,
                labelHeight: 2
            }
        );

        it('Basic', done => {
            const semanticEngine = new SemanticEngine(basicPaths);
            semanticEngine.processPaths();

            let smartView = new SmartView("T1", new NestedLayoutProcessor(layoutSettings), semanticEngine);
            smartView.generate();

            const view = smartView.getView();

            const A = view.viewnodes.find((n) => n.name === "A");
            const B = view.viewnodes.find((n) => n.name === "B");
            const B1 = view.viewnodes.find((n) => n.name === "B1");
            const B11 = view.viewnodes.find((n) => n.name === "B1-1");
            const B2 = view.viewnodes.find((n) => n.name === "B2");
            const B21 = view.viewnodes.find((n) => n.name === "B2-1");
            const C = view.viewnodes.find((n) => n.name === "C");
            const C1 = view.viewnodes.find((n) => n.name === "C1");

            chai.expect(A).not.undefined;
            chai.expect(B).not.undefined;
            chai.expect(B1).not.undefined;
            chai.expect(B11).not.undefined;
            chai.expect(B2).not.undefined;
            chai.expect(B21).not.undefined;
            chai.expect(C).not.undefined;
            chai.expect(C1).not.undefined;

            chai.expect(B11.width).eql(15);
            chai.expect(B11.height).eql(5);
            chai.expect(B11.x).eql(3);
            chai.expect(B11.y).eql(12);

            chai.expect(B1.width).eql(17);
            chai.expect(B1.height).eql(10);
            chai.expect(B1.x).eql(2);
            chai.expect(B1.y).eql(8);

            chai.expect(B21.width).eql(15);
            chai.expect(B21.height).eql(5)
            chai.expect(B21.x).eql(22);
            chai.expect(B21.y).eql(12);

            chai.expect(B2.width).eql(17);
            chai.expect(B2.height).eql(10);
            chai.expect(B2.x).eql(21);
            chai.expect(B2.y).eql(8);

            chai.expect(B.width).eql(38);
            chai.expect(B.height).eql(15);
            chai.expect(B.x).eql(1);
            chai.expect(B.y).eql(4);

            chai.expect(C1.width).eql(15);
            chai.expect(C1.height).eql(10);
            chai.expect(C1.x).eql(42);
            chai.expect(C1.y).eql(8);

            chai.expect(C.width).eql(17);
            chai.expect(C.height).eql(15);
            chai.expect(C.x).eql(41);
            chai.expect(C.y).eql(4);

            chai.expect(A.width).eql(59);
            chai.expect(A.height).eql(20);
            chai.expect(A.x).eql(0);
            chai.expect(A.y).eql(0);

            done();
        });

        it('Complex', done => {
            const semanticEngine = new SemanticEngine(complexPaths);
            semanticEngine.processPaths();

            let smartView = new SmartView("T1", new NestedLayoutProcessor(layoutSettings), semanticEngine);
            smartView.generate();

            const view = smartView.getView();

            const Analyst = view.viewnodes.find((n) => n.name === "Analyst");
            const Guest = view.viewnodes.find((n) => n.name === "Guest");
            const PerformAnalysis = view.viewnodes.find((n) => n.name === "Perform Corporative Analysis");
            const ProvideData = view.viewnodes.find((n) => n.name === "Provide Updated Data");
            const Archi = view.viewnodes.find((n) => n.name === "Archi");
            const GitClient = view.viewnodes.find((n) => n.name === "Git Client");
            const Arktect = view.viewnodes.find((n) => n.name === "Arktect");

            chai.expect(Analyst).not.undefined;
            chai.expect(Guest).not.undefined;
            chai.expect(PerformAnalysis).not.undefined;
            chai.expect(ProvideData).not.undefined;
            chai.expect(Archi).not.undefined;
            chai.expect(GitClient).not.undefined;
            chai.expect(Arktect).not.undefined;

            // chai.expect(Analyst.width).eql(49);
            // chai.expect(Analyst.height).eql(5);
            // chai.expect(Analyst.x).eql(0);
            // chai.expect(Analyst.y).eql(0);
            //
            // chai.expect(Guest.width).eql(32);
            // chai.expect(Guest.height).eql(5);
            // chai.expect(Guest.x).eql(0);
            // chai.expect(Guest.y).eql(7);
            //
            // chai.expect(PerformAnalysis.width).eql(15);
            // chai.expect(PerformAnalysis.height).eql(5);
            // chai.expect(PerformAnalysis.x).eql(0);
            // chai.expect(PerformAnalysis.y).eql(14);
            //
            // chai.expect(ProvideData.width).eql(15);
            // chai.expect(ProvideData.height).eql(5);
            // chai.expect(ProvideData.x).eql(0);
            // chai.expect(ProvideData.y).eql(21);
            //
            // chai.expect(Archi.width).eql(15);
            // chai.expect(Archi.height).eql(5);
            // chai.expect(Archi.x).eql(17);
            // chai.expect(Archi.y).eql(14);
            //
            // chai.expect(GitClient.width).eql(15);
            // chai.expect(GitClient.height).eql(5);
            // chai.expect(GitClient.x).eql(17);
            // chai.expect(GitClient.y).eql(21);
            //
            // chai.expect(Arktect.width).eql(15);
            // chai.expect(Arktect.height).eql(5);
            // chai.expect(Arktect.x).eql(34);
            // chai.expect(Arktect.y).eql(7);

            done();
        });
    });
});
