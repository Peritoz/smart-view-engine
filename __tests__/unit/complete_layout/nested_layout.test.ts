import { LayoutTypes } from "../../../src/libs/common/layout_types.enum";
import { SmartViewEngine } from "../../../src";
import { View } from "../../../src/libs/model/view";
import { HydratedViewNode, ViewNode } from "../../../src/libs/model/view_node";
import { Settings } from "../../../src/libs/engine/layout_engine/settings";
import { LayoutDirector } from "../../../src/libs/engine/layout_engine/layout_builder/layout_director";
import { Alignment } from "../../../src/libs/common/alignment.enum";

const basicPaths = require("../../data/paths/basic.json");
const complexPaths = require("../../data/paths/complex.json");

describe("Nested Layout Rendering", () => {
  const layoutSettings = new Settings({
    layoutType: "nested",
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

  it("One row", (done) => {
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

    const engine = new SmartViewEngine(
      new Settings({
        layoutType: LayoutTypes.NESTED,
        maxHorizontalCount: 2,
        maxChildHorizontalCount: 2,
      })
    );

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
    expect(a1?.parentId).toBe(a.viewNodeId);
    expect(a2).toBeDefined();
    expect(a2?.parentId).toBe(a.viewNodeId);
    expect(b1).toBeDefined();
    expect(b1?.parentId).toBe(b.viewNodeId);
    expect(b2).toBeDefined();
    expect(b2?.parentId).toBe(b.viewNodeId);

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

    expect(A.width).toBe(59);
    expect(A.height).toBe(20);
    expect(A.x).toBe(0);
    expect(A.y).toBe(0);

    expect(B.width).toBe(38);
    expect(B.height).toBe(15);
    expect(B.x).toBe(1);
    expect(B.y).toBe(4);

    expect(C.width).toBe(17);
    expect(C.height).toBe(15);
    expect(C.x).toBe(41);
    expect(C.y).toBe(4);

    expect(B1.width).toBe(17);
    expect(B1.height).toBe(10);
    expect(B1.x).toBe(2);
    expect(B1.y).toBe(8);

    expect(B2.width).toBe(17);
    expect(B2.height).toBe(10);
    expect(B2.x).toBe(21);
    expect(B2.y).toBe(8);

    expect(C1.width).toBe(15);
    expect(C1.height).toBe(10);
    expect(C1.x).toBe(42);
    expect(C1.y).toBe(8);

    expect(B11.width).toBe(15);
    expect(B11.height).toBe(5);
    expect(B11.x).toBe(3);
    expect(B11.y).toBe(12);

    expect(B21.width).toBe(15);
    expect(B21.height).toBe(5);
    expect(B21.x).toBe(22);
    expect(B21.y).toBe(12);

    done();
  });

  it("Complex", (done) => {
    let smartView = new SmartViewEngine(layoutSettings);

    const view = smartView.generateView(complexPaths, "T1");

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
    expect(Analyst[0].width).toBe(72);
    expect(Analyst[0].height).toBe(15);
    expect(Analyst[0].x).toBe(0);
    expect(Analyst[0].y).toBe(0);

    expect(Guest[0].modelNodeId).toBe("89e202e0");
    expect(Guest[0].width).toBe(36);
    expect(Guest[0].height).toBe(15);
    expect(Guest[0].x).toBe(74);
    expect(Guest[0].y).toBe(0);

    expect(PerformAnalysis[0].modelNodeId).toBe("fe87eaab");
    expect(PerformAnalysis[0].width).toBe(51);
    expect(PerformAnalysis[0].height).toBe(10);
    expect(PerformAnalysis[0].x).toBe(1);
    expect(PerformAnalysis[0].y).toBe(4);

    expect(PerformAnalysis[1].modelNodeId).toBe("fe87eaab");
    expect(PerformAnalysis[1].width).toBe(34);
    expect(PerformAnalysis[1].height).toBe(10);
    expect(PerformAnalysis[1].x).toBe(75);
    expect(PerformAnalysis[1].y).toBe(4);

    expect(ProvideData[0].modelNodeId).toBe("7c4941eb");
    expect(ProvideData[0].width).toBe(17);
    expect(ProvideData[0].height).toBe(10);
    expect(ProvideData[0].x).toBe(54);
    expect(ProvideData[0].y).toBe(4);

    expect(ModellingTool[0].modelNodeId).toBe("d5ce0709");
    expect(ModellingTool[0].width).toBe(15);
    expect(ModellingTool[0].height).toBe(5);
    expect(ModellingTool[0].x).toBe(2);
    expect(ModellingTool[0].y).toBe(8);

    expect(ModellingTool[1].modelNodeId).toBe("d5ce0709");
    expect(ModellingTool[1].width).toBe(15);
    expect(ModellingTool[1].height).toBe(5);
    expect(ModellingTool[1].x).toBe(76);
    expect(ModellingTool[1].y).toBe(8);

    expect(GitClient[0].modelNodeId).toBe("d361cefb");
    expect(GitClient[0].width).toBe(15);
    expect(GitClient[0].height).toBe(5);
    expect(GitClient[0].x).toBe(19);
    expect(GitClient[0].y).toBe(8);

    expect(GitClient[1].modelNodeId).toBe("d361cefb");
    expect(GitClient[1].width).toBe(15);
    expect(GitClient[1].height).toBe(5);
    expect(GitClient[1].x).toBe(93);
    expect(GitClient[1].y).toBe(8);

    expect(Company[0].modelNodeId).toBe("63a1ccd0");
    expect(Company[0].width).toBe(15);
    expect(Company[0].height).toBe(5);
    expect(Company[0].x).toBe(36);
    expect(Company[0].y).toBe(8);

    expect(Company[1].modelNodeId).toBe("63a1ccd0");
    expect(Company[1].width).toBe(15);
    expect(Company[1].height).toBe(5);
    expect(Company[1].x).toBe(55);
    expect(Company[1].y).toBe(8);

    done();
  });

  it("Complex - Breaking Line", (done) => {
    let smartView = new SmartViewEngine(
      new Settings({
        layoutType: "nested",
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

    const view = smartView.generateView(complexPaths, "T1");

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
    expect(Analyst[0].width).toBe(72);
    expect(Analyst[0].height).toBe(15);
    expect(Analyst[0].x).toBe(0);
    expect(Analyst[0].y).toBe(0);

    expect(Guest[0].modelNodeId).toBe("89e202e0");
    expect(Guest[0].width).toBe(72);
    expect(Guest[0].height).toBe(15);
    expect(Guest[0].x).toBe(0);
    expect(Guest[0].y).toBe(17);

    expect(PerformAnalysis[0].modelNodeId).toBe("fe87eaab");
    expect(PerformAnalysis[0].width).toBe(51);
    expect(PerformAnalysis[0].height).toBe(10);
    expect(PerformAnalysis[0].x).toBe(1);
    expect(PerformAnalysis[0].y).toBe(4);

    expect(PerformAnalysis[1].modelNodeId).toBe("fe87eaab");
    expect(PerformAnalysis[1].width).toBe(34);
    expect(PerformAnalysis[1].height).toBe(10);
    expect(PerformAnalysis[1].x).toBe(1);
    expect(PerformAnalysis[1].y).toBe(21);

    expect(ProvideData[0].modelNodeId).toBe("7c4941eb");
    expect(ProvideData[0].width).toBe(17);
    expect(ProvideData[0].height).toBe(10);
    expect(ProvideData[0].x).toBe(54);
    expect(ProvideData[0].y).toBe(4);

    expect(ModellingTool[0].modelNodeId).toBe("d5ce0709");
    expect(ModellingTool[0].width).toBe(15);
    expect(ModellingTool[0].height).toBe(5);
    expect(ModellingTool[0].x).toBe(2);
    expect(ModellingTool[0].y).toBe(8);

    expect(ModellingTool[1].modelNodeId).toBe("d5ce0709");
    expect(ModellingTool[1].width).toBe(15);
    expect(ModellingTool[1].height).toBe(5);
    expect(ModellingTool[1].x).toBe(2);
    expect(ModellingTool[1].y).toBe(25);

    expect(GitClient[0].modelNodeId).toBe("d361cefb");
    expect(GitClient[0].width).toBe(15);
    expect(GitClient[0].height).toBe(5);
    expect(GitClient[0].x).toBe(19);
    expect(GitClient[0].y).toBe(8);

    expect(GitClient[1].modelNodeId).toBe("d361cefb");
    expect(GitClient[1].width).toBe(15);
    expect(GitClient[1].height).toBe(5);
    expect(GitClient[1].x).toBe(19);
    expect(GitClient[1].y).toBe(25);

    expect(Company[0].modelNodeId).toBe("63a1ccd0");
    expect(Company[0].width).toBe(15);
    expect(Company[0].height).toBe(5);
    expect(Company[0].x).toBe(36);
    expect(Company[0].y).toBe(8);

    expect(Company[1].modelNodeId).toBe("63a1ccd0");
    expect(Company[1].width).toBe(15);
    expect(Company[1].height).toBe(5);
    expect(Company[1].x).toBe(55);
    expect(Company[1].y).toBe(8);

    done();
  });

  it("Complex View Construction - Long Nested Chain", async () => {
    const director = new LayoutDirector(layoutSettings);

    const rowA1 = director.newRow(Alignment.START, Alignment.EXPANDED);
    const A = director.newVisibleRow(
      "A",
      "T",
      Alignment.START,
      Alignment.EXPANDED,
      false
    );
    const B = director.newVisibleRow(
      "B",
      "T",
      Alignment.START,
      Alignment.EXPANDED,
      false
    );
    const B1 = director.newVisibleRow(
      "B1",
      "T",
      Alignment.START,
      Alignment.EXPANDED,
      false
    );
    const B11 = director.addMediumElementToCurrent("B1-1", "T", false);

    director.navigateToParent(1);

    const B2 = director.newVisibleRow(
      "B2",
      "T",
      Alignment.START,
      Alignment.EXPANDED,
      false
    );
    const B21 = director.addMediumElementToCurrent("B2-1", "T", false);

    director.navigateToParent(2);

    const C = director.newVisibleRow(
      "C",
      "T",
      Alignment.START,
      Alignment.EXPANDED,
      false
    );
    const C1 = director.addMediumElementToCurrent("C1", "T", false);

    director.toAbsolutePosition();

    expect(A).toBeDefined();
    expect(B).toBeDefined();
    expect(B1).toBeDefined();
    expect(B11).toBeDefined();
    expect(B2).toBeDefined();
    expect(B21).toBeDefined();
    expect(C).toBeDefined();
    expect(C1).toBeDefined();

    expect(B11.getWidth()).toBe(15);
    expect(B11.getHeight()).toBe(5);
    expect(B11.getX()).toBe(3);
    expect(B11.getY()).toBe(12);

    expect(B1.getWidth()).toBe(17);
    expect(B1.getHeight()).toBe(10);
    expect(B1.getX()).toBe(2);
    expect(B1.getY()).toBe(8);

    expect(B21.getWidth()).toBe(15);
    expect(B21.getHeight()).toBe(5);
    expect(B21.getX()).toBe(22);
    expect(B21.getY()).toBe(12);

    expect(B2.getWidth()).toBe(17);
    expect(B2.getHeight()).toBe(10);
    expect(B2.getX()).toBe(21);
    expect(B2.getY()).toBe(8);

    expect(B.getWidth()).toBe(38);
    expect(B.getHeight()).toBe(15);
    expect(B.getX()).toBe(1);
    expect(B.getY()).toBe(4);

    expect(C1.getWidth()).toBe(15);
    expect(C1.getHeight()).toBe(10);
    expect(C1.getX()).toBe(42);
    expect(C1.getY()).toBe(8);

    expect(C.getWidth()).toBe(17);
    expect(C.getHeight()).toBe(15);
    expect(C.getX()).toBe(41);
    expect(C.getY()).toBe(4);

    expect(A.getWidth()).toBe(59);
    expect(A.getHeight()).toBe(20);
    expect(A.getX()).toBe(0);
    expect(A.getY()).toBe(0);
  });
});
