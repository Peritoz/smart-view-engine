import { Settings } from "../../../src/libs/engine/layout_engine/settings";
import { LayoutDirector } from "../../../src/libs/engine/layout_engine/layout_builder/layout_director";
import { Alignment } from "../../../src/libs/common/alignment.enum";
import { SmartViewEngine } from "../../../src";
import { HydratedViewNode } from "../../../src/libs/model/view_node";
import { HierarchyLayoutEngine } from "../../../src/libs/engine/layout_engine/linear/hierarchical/specialized/hierarchy_layout_engine";
import { SemanticEngine } from "../../../src/libs/engine/semantic_engine/semantic_engine";
import { HydratedView } from "../../../src/libs/model/hydrated_view";

const basicPaths = require("../../data/paths/basic.json");
const complexPaths = require("../../data/paths/complex.json");

describe("Hierarchical Layout Rendering", () => {
  const layoutSettings = new Settings({
    layoutType: "hierarchy",
    maxHorizontalCount: 4,
    maxChildHorizontalCount: 2,
    spaceBetween: 2,
    sizeUnit: 5,
    leftPadding: 1,
    rightPadding: 1,
    topPadding: 1,
    bottomPadding: 1,
    spaceToOuterLabel: 1,
    labelWidth: 4,
    labelHeight: 2,
  });

  it("Inserting different elements in a Row", (done) => {
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

  it("Basic", (done) => {
    let smartView = new SmartViewEngine(layoutSettings);

    const view = smartView.generateView(basicPaths, "T1");

    const A = view.viewNodes.find((n: HydratedViewNode) => n.name === "A");
    const B = view.viewNodes.find((n: HydratedViewNode) => n.name === "B");
    const B1 = view.viewNodes.find((n: HydratedViewNode) => n.name === "B1");
    const B11 = view.viewNodes.find((n: HydratedViewNode) => n.name === "B1-1");
    const B2 = view.viewNodes.find((n: HydratedViewNode) => n.name === "B2");
    const B21 = view.viewNodes.find((n: HydratedViewNode) => n.name === "B2-1");
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
    const ModellingTool = view.viewNodes.find(
      (n: HydratedViewNode) => n.name === "Modelling Tool"
    );
    const GitClient = view.viewNodes.find(
      (n: HydratedViewNode) => n.name === "Git Client"
    );
    const Company = view.viewNodes.find(
      (n: HydratedViewNode) => n.name === "Company"
    );

    expect(Analyst).toBeDefined();
    expect(Guest).toBeDefined();
    expect(PerformAnalysis).toBeDefined();
    expect(ProvideData).toBeDefined();
    expect(ModellingTool).toBeDefined();
    expect(GitClient).toBeDefined();
    expect(Company).toBeDefined();

    expect(Analyst.width).toBe(49);
    expect(Analyst.height).toBe(5);
    expect(Analyst.x).toBe(0);
    expect(Analyst.y).toBe(0);

    expect(Guest.width).toBe(32);
    expect(Guest.height).toBe(5);
    expect(Guest.x).toBe(0);
    expect(Guest.y).toBe(7);

    expect(PerformAnalysis.width).toBe(15);
    expect(PerformAnalysis.height).toBe(5);
    expect(PerformAnalysis.x).toBe(0);
    expect(PerformAnalysis.y).toBe(14);

    expect(ProvideData.width).toBe(15);
    expect(ProvideData.height).toBe(5);
    expect(ProvideData.x).toBe(0);
    expect(ProvideData.y).toBe(21);

    expect(ModellingTool.width).toBe(15);
    expect(ModellingTool.height).toBe(5);
    expect(ModellingTool.x).toBe(17);
    expect(ModellingTool.y).toBe(14);

    expect(GitClient.width).toBe(15);
    expect(GitClient.height).toBe(5);
    expect(GitClient.x).toBe(17);
    expect(GitClient.y).toBe(21);

    expect(Company.width).toBe(15);
    expect(Company.height).toBe(5);
    expect(Company.x).toBe(34);
    expect(Company.y).toBe(7);

    done();
  });

  it("Complex View Construction - Long Hierarchical Chain", async () => {
    const director = new LayoutDirector(layoutSettings);

    const rowA1 = director.newRow(Alignment.EXPANDED, Alignment.EXPANDED);
    const colA1 = director.newCol(Alignment.START, Alignment.EXPANDED);
    const rowA2 = director.newRow(Alignment.EXPANDED, Alignment.EXPANDED);
    const colB1 = director.newCol(Alignment.START, Alignment.EXPANDED);
    const rowB1 = director.newRow(Alignment.EXPANDED, Alignment.EXPANDED);
    const colB2 = director.newCol(Alignment.START, Alignment.EXPANDED);
    const rowB2 = director.newRow(Alignment.EXPANDED, Alignment.EXPANDED);
    director.addMediumElementToCurrent("B1-1", "T", false);
    director.navigateToParent();
    director.addMediumElementToCurrent("B1", "T", false);
    director.navigateToParent();
    const colB3 = director.newCol(Alignment.START, Alignment.EXPANDED);
    const rowB3 = director.newRow(Alignment.EXPANDED, Alignment.EXPANDED);
    director.addMediumElementToCurrent("B2-1", "T", false);
    director.navigateToParent();
    director.addMediumElementToCurrent("B2", "T", false);
    director.navigateToParent(2);
    director.addMediumElementToCurrent("B", "T", false);
    director.navigateToParent();
    const colC1 = director.newCol(Alignment.START, Alignment.EXPANDED);
    const rowC1 = director.newRow(Alignment.EXPANDED, Alignment.EXPANDED);
    director.addMediumElementToCurrent("C1", "T", false);
    director.navigateToParent();
    director.addMediumElementToCurrent("C", "T", false);
    director.navigateToParent(2);
    director.addMediumElementToCurrent("A", "T", false);

    director.toAbsolutePosition();

    expect(rowA1.children.length).toBe(1);
    expect(colA1.children.length).toBe(2);
    expect(colA1.children[1].getName()).toBe("A");
    expect(colA1.children[1].getWidth()).toBe(66);
    expect(colA1.children[1].getHeight()).toBe(5);
    expect(colA1.getSubTreeCounting()).toBe(7);
    expect(rowA2.children.length).toBe(2);
    expect(colB1.children.length).toBe(2);
    expect(colB1.children[1].getName()).toBe("B");
    expect(colB1.children[1].getWidth()).toBe(32);
    expect(colB1.children[1].getHeight()).toBe(5);
    expect(colB1.getSubTreeCounting()).toBe(4);
    expect(rowB1.children.length).toBe(2);
    expect(colB2.children.length).toBe(2);
    expect(colB2.children[1].getName()).toBe("B1");
    expect(colB2.children[1].getWidth()).toBe(15);
    expect(colB2.children[1].getHeight()).toBe(5);
    expect(colB2.getSubTreeCounting()).toBe(1);
    expect(rowB2.children.length).toBe(1);
    expect(rowB2.children[0].getName()).toBe("B1-1");
    expect(rowB2.children[0].getWidth()).toBe(15);
    expect(rowB2.children[0].getHeight()).toBe(5);
    expect(rowB2.getSubTreeCounting()).toBe(0);
    expect(colB3.children.length).toBe(2);
    expect(colB3.children[1].getName()).toBe("B2");
    expect(colB3.children[1].getWidth()).toBe(15);
    expect(colB3.children[1].getHeight()).toBe(5);
    expect(colB3.getSubTreeCounting()).toBe(1);
    expect(rowB3.children.length).toBe(1);
    expect(rowB3.children[0].getName()).toBe("B2-1");
    expect(rowB3.children[0].getWidth()).toBe(15);
    expect(rowB3.children[0].getHeight()).toBe(5);
    expect(rowB3.getSubTreeCounting()).toBe(0);
    expect(colC1.children.length).toBe(2);
    expect(colC1.children[1].getName()).toBe("C");
    expect(colC1.children[1].getWidth()).toBe(32);
    expect(colC1.children[1].getHeight()).toBe(5);
    expect(colC1.getSubTreeCounting()).toBe(1);
    expect(rowC1.children.length).toBe(1);
    expect(rowC1.children[0].getName()).toBe("C1");
    expect(rowC1.children[0].getWidth()).toBe(32);
    expect(rowC1.children[0].getHeight()).toBe(5);
    expect(rowC1.getSubTreeCounting()).toBe(0);
  });
});
