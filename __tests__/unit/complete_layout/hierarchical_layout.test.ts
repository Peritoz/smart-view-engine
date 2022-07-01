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

  it("One Row", (done) => {
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
    expect(outputView.getVerticalBounds().max).toBe(5);

    done();
  });

  it("Basic", (done) => {
    let smartView = new SmartViewEngine(layoutSettings);

    const view = smartView.generateViewFromPaths(basicPaths, "T1");

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

    const view = smartView.generateViewFromPaths(complexPaths, "T1");

    const Analyst = view.viewNodes.filter(
      (n: HydratedViewNode) => n.name === "Analyst"
    );
    const Guest = view.viewNodes.filter(
      (n: HydratedViewNode) => n.name === "Guest"
    );
    const PerformAnalysis = view.viewNodes.filter(
      (n: HydratedViewNode) => n.name === "Perform Corporative Analysis"
    );
    const ProvideData = view.viewNodes.filter(
      (n: HydratedViewNode) => n.name === "Provide Updated Data"
    );
    const ModellingTool = view.viewNodes.filter(
      (n: HydratedViewNode) => n.name === "Modelling Tool"
    );
    const GitClient = view.viewNodes.filter(
      (n: HydratedViewNode) => n.name === "Git Client"
    );
    const Company = view.viewNodes.filter(
      (n: HydratedViewNode) => n.name === "Company"
    );

    expect(Analyst[0]).toBeDefined();
    expect(Guest[0]).toBeDefined();
    expect(PerformAnalysis[0]).toBeDefined();
    expect(ProvideData[0]).toBeDefined();
    expect(ModellingTool[0]).toBeDefined();
    expect(GitClient[0]).toBeDefined();
    expect(Company[0]).toBeDefined();

    expect(Analyst[0].modelNodeId).toBe("cf933aa8");
    expect(Analyst[0].width).toBe(66);
    expect(Analyst[0].height).toBe(5);
    expect(Analyst[0].x).toBe(0);
    expect(Analyst[0].y).toBe(0);

    expect(Guest[0].modelNodeId).toBe("89e202e0");
    expect(Guest[0].width).toBe(32);
    expect(Guest[0].height).toBe(5);
    expect(Guest[0].x).toBe(68);
    expect(Guest[0].y).toBe(0);

    expect(PerformAnalysis[0].modelNodeId).toBe("fe87eaab");
    expect(PerformAnalysis[0].width).toBe(49);
    expect(PerformAnalysis[0].height).toBe(5);
    expect(PerformAnalysis[0].x).toBe(0);
    expect(PerformAnalysis[0].y).toBe(7);

    expect(PerformAnalysis[1].modelNodeId).toBe("fe87eaab");
    expect(PerformAnalysis[1].width).toBe(32);
    expect(PerformAnalysis[1].height).toBe(5);
    expect(PerformAnalysis[1].x).toBe(68);
    expect(PerformAnalysis[1].y).toBe(7);

    expect(ProvideData[0].modelNodeId).toBe("7c4941eb");
    expect(ProvideData[0].width).toBe(15);
    expect(ProvideData[0].height).toBe(5);
    expect(ProvideData[0].x).toBe(51);
    expect(ProvideData[0].y).toBe(7);

    expect(ModellingTool[0].modelNodeId).toBe("d5ce0709");
    expect(ModellingTool[0].width).toBe(15);
    expect(ModellingTool[0].height).toBe(5);
    expect(ModellingTool[0].x).toBe(0);
    expect(ModellingTool[0].y).toBe(14);

    expect(ModellingTool[1].modelNodeId).toBe("d5ce0709");
    expect(ModellingTool[1].width).toBe(15);
    expect(ModellingTool[1].height).toBe(5);
    expect(ModellingTool[1].x).toBe(68);
    expect(ModellingTool[1].y).toBe(14);

    expect(GitClient[0].modelNodeId).toBe("d361cefb");
    expect(GitClient[0].width).toBe(15);
    expect(GitClient[0].height).toBe(5);
    expect(GitClient[0].x).toBe(17);
    expect(GitClient[0].y).toBe(14);

    expect(GitClient[1].modelNodeId).toBe("d361cefb");
    expect(GitClient[1].width).toBe(15);
    expect(GitClient[1].height).toBe(5);
    expect(GitClient[1].x).toBe(85);
    expect(GitClient[1].y).toBe(14);

    expect(Company[0].modelNodeId).toBe("63a1ccd0");
    expect(Company[0].width).toBe(15);
    expect(Company[0].height).toBe(5);
    expect(Company[0].x).toBe(34);
    expect(Company[0].y).toBe(14);

    expect(Company[1].modelNodeId).toBe("63a1ccd0");
    expect(Company[1].width).toBe(15);
    expect(Company[1].height).toBe(5);
    expect(Company[1].x).toBe(51);
    expect(Company[1].y).toBe(14);

    done();
  });

  it("Complex - Breaking line", (done) => {
    let smartView = new SmartViewEngine(
      new Settings({
        layoutType: "hierarchy",
        maxHorizontalCount: 1,
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
      })
    );

    const view = smartView.generateViewFromPaths(complexPaths, "T1");

    const Analyst = view.viewNodes.filter(
      (n: HydratedViewNode) => n.name === "Analyst"
    );
    const Guest = view.viewNodes.filter(
      (n: HydratedViewNode) => n.name === "Guest"
    );
    const PerformAnalysis = view.viewNodes.filter(
      (n: HydratedViewNode) => n.name === "Perform Corporative Analysis"
    );
    const ProvideData = view.viewNodes.filter(
      (n: HydratedViewNode) => n.name === "Provide Updated Data"
    );
    const ModellingTool = view.viewNodes.filter(
      (n: HydratedViewNode) => n.name === "Modelling Tool"
    );
    const GitClient = view.viewNodes.filter(
      (n: HydratedViewNode) => n.name === "Git Client"
    );
    const Company = view.viewNodes.filter(
      (n: HydratedViewNode) => n.name === "Company"
    );

    expect(Analyst[0]).toBeDefined();
    expect(Guest[0]).toBeDefined();
    expect(PerformAnalysis[0]).toBeDefined();
    expect(ProvideData[0]).toBeDefined();
    expect(ModellingTool[0]).toBeDefined();
    expect(GitClient[0]).toBeDefined();
    expect(Company[0]).toBeDefined();

    expect(Analyst[0].modelNodeId).toBe("cf933aa8");
    expect(Analyst[0].width).toBe(66);
    expect(Analyst[0].height).toBe(5);
    expect(Analyst[0].x).toBe(0);
    expect(Analyst[0].y).toBe(0);

    expect(Guest[0].modelNodeId).toBe("89e202e0");
    expect(Guest[0].width).toBe(32);
    expect(Guest[0].height).toBe(5);
    expect(Guest[0].x).toBe(0);
    expect(Guest[0].y).toBe(21);

    expect(PerformAnalysis[0].modelNodeId).toBe("fe87eaab");
    expect(PerformAnalysis[0].width).toBe(49);
    expect(PerformAnalysis[0].height).toBe(5);
    expect(PerformAnalysis[0].x).toBe(0);
    expect(PerformAnalysis[0].y).toBe(7);

    expect(PerformAnalysis[1].modelNodeId).toBe("fe87eaab");
    expect(PerformAnalysis[1].width).toBe(32);
    expect(PerformAnalysis[1].height).toBe(5);
    expect(PerformAnalysis[1].x).toBe(0);
    expect(PerformAnalysis[1].y).toBe(28);

    expect(ProvideData[0].modelNodeId).toBe("7c4941eb");
    expect(ProvideData[0].width).toBe(15);
    expect(ProvideData[0].height).toBe(5);
    expect(ProvideData[0].x).toBe(51);
    expect(ProvideData[0].y).toBe(7);

    expect(ModellingTool[0].modelNodeId).toBe("d5ce0709");
    expect(ModellingTool[0].width).toBe(15);
    expect(ModellingTool[0].height).toBe(5);
    expect(ModellingTool[0].x).toBe(0);
    expect(ModellingTool[0].y).toBe(14);

    expect(ModellingTool[1].modelNodeId).toBe("d5ce0709");
    expect(ModellingTool[1].width).toBe(15);
    expect(ModellingTool[1].height).toBe(5);
    expect(ModellingTool[1].x).toBe(0);
    expect(ModellingTool[1].y).toBe(35);

    expect(GitClient[0].modelNodeId).toBe("d361cefb");
    expect(GitClient[0].width).toBe(15);
    expect(GitClient[0].height).toBe(5);
    expect(GitClient[0].x).toBe(17);
    expect(GitClient[0].y).toBe(14);

    expect(GitClient[1].modelNodeId).toBe("d361cefb");
    expect(GitClient[1].width).toBe(15);
    expect(GitClient[1].height).toBe(5);
    expect(GitClient[1].x).toBe(17);
    expect(GitClient[1].y).toBe(35);

    expect(Company[0].modelNodeId).toBe("63a1ccd0");
    expect(Company[0].width).toBe(15);
    expect(Company[0].height).toBe(5);
    expect(Company[0].x).toBe(34);
    expect(Company[0].y).toBe(14);

    expect(Company[1].modelNodeId).toBe("63a1ccd0");
    expect(Company[1].width).toBe(15);
    expect(Company[1].height).toBe(5);
    expect(Company[1].x).toBe(51);
    expect(Company[1].y).toBe(14);

    done();
  });

  it("Complex View Construction - Long Hierarchical Chain", async () => {
    const director = new LayoutDirector(layoutSettings);

    const rowA1 = director.newRow(Alignment.START, Alignment.EXPANDED);
    const colA1 = director.newCol(Alignment.EXPANDED, Alignment.START);
    const rowA2 = director.newRow(Alignment.START, Alignment.EXPANDED);
    const colB1 = director.newCol(Alignment.EXPANDED, Alignment.START);
    const rowB1 = director.newRow(Alignment.START, Alignment.EXPANDED);
    const colB2 = director.newCol(Alignment.EXPANDED, Alignment.START);
    const rowB2 = director.newRow(Alignment.START, Alignment.EXPANDED);
    director.newMediumElementToCurrent("B1-1", "T", false);
    director.navigateToParent();
    director.newMediumElementToCurrent("B1", "T", false);
    director.navigateToParent();
    const colB3 = director.newCol(Alignment.EXPANDED, Alignment.START);
    const rowB3 = director.newRow(Alignment.START, Alignment.EXPANDED);
    director.newMediumElementToCurrent("B2-1", "T", false);
    director.navigateToParent();
    director.newMediumElementToCurrent("B2", "T", false);
    director.navigateToParent(2);
    director.newMediumElementToCurrent("B", "T", false);
    director.navigateToParent();
    const colC1 = director.newCol(Alignment.EXPANDED, Alignment.START);
    const rowC1 = director.newRow(Alignment.START, Alignment.EXPANDED);
    director.newMediumElementToCurrent("C1", "T", false);
    director.navigateToParent();
    director.newMediumElementToCurrent("C", "T", false);
    director.navigateToParent(2);
    director.newMediumElementToCurrent("A", "T", false);

    director.toAbsolutePosition();

    expect(rowA1.getChildren().length).toBe(1);
    expect(colA1.getChildren().length).toBe(2);
    expect(colA1.getChildren()[1].getName()).toBe("A");
    expect(colA1.getChildren()[1].getWidth()).toBe(49);
    expect(colA1.getChildren()[1].getHeight()).toBe(5);
    expect(colA1.getSubTreeCounting()).toBe(7);
    expect(rowA2.getChildren().length).toBe(2);
    expect(colB1.getChildren().length).toBe(2);
    expect(colB1.getChildren()[1].getName()).toBe("B");
    expect(colB1.getChildren()[1].getWidth()).toBe(32);
    expect(colB1.getChildren()[1].getHeight()).toBe(5);
    expect(colB1.getSubTreeCounting()).toBe(4);
    expect(rowB1.getChildren().length).toBe(2);
    expect(colB2.getChildren().length).toBe(2);
    expect(colB2.getChildren()[1].getName()).toBe("B1");
    expect(colB2.getChildren()[1].getWidth()).toBe(15);
    expect(colB2.getChildren()[1].getHeight()).toBe(5);
    expect(colB2.getSubTreeCounting()).toBe(1);
    expect(rowB2.getChildren().length).toBe(1);
    expect(rowB2.getChildren()[0].getName()).toBe("B1-1");
    expect(rowB2.getChildren()[0].getWidth()).toBe(15);
    expect(rowB2.getChildren()[0].getHeight()).toBe(5);
    expect(rowB2.getSubTreeCounting()).toBe(0);
    expect(colB3.getChildren().length).toBe(2);
    expect(colB3.getChildren()[1].getName()).toBe("B2");
    expect(colB3.getChildren()[1].getWidth()).toBe(15);
    expect(colB3.getChildren()[1].getHeight()).toBe(5);
    expect(colB3.getSubTreeCounting()).toBe(1);
    expect(rowB3.getChildren().length).toBe(1);
    expect(rowB3.getChildren()[0].getName()).toBe("B2-1");
    expect(rowB3.getChildren()[0].getWidth()).toBe(15);
    expect(rowB3.getChildren()[0].getHeight()).toBe(5);
    expect(rowB3.getSubTreeCounting()).toBe(0);
    expect(colC1.getChildren().length).toBe(2);
    expect(colC1.getChildren()[1].getName()).toBe("C");
    expect(colC1.getChildren()[1].getWidth()).toBe(15);
    expect(colC1.getChildren()[1].getHeight()).toBe(5);
    expect(colC1.getSubTreeCounting()).toBe(1);
    expect(rowC1.getChildren().length).toBe(1);
    expect(rowC1.getChildren()[0].getName()).toBe("C1");
    expect(rowC1.getChildren()[0].getWidth()).toBe(15);
    expect(rowC1.getChildren()[0].getHeight()).toBe(5);
    expect(rowC1.getSubTreeCounting()).toBe(0);
  });
});
