import { Settings } from "../../../src/libs/engine/layout_engine/settings";
import { LayoutDirector } from "../../../src/libs/engine/layout_engine/layout_builder/layout_director";
import { Alignment } from "../../../src/libs/common/alignment.enum";
import { LayoutTree } from "../../../src/libs/engine/layout_engine/layout_builder/layout_tree";
import { ElementBuilder } from "../../../src/libs/engine/layout_engine/layout_builder/element_builder";
import { LayoutRow } from "../../../src/libs/engine/layout_engine/layout_builder/layout_row";
import { LayoutCol } from "../../../src/libs/engine/layout_engine/layout_builder/layout_col";

describe("Mixed Rendering", () => {
  const settings = new Settings({
    layoutType: "hierarchy",
    maxHorizontalCount: 4,
    maxChildHorizontalCount: 2,
    spaceBetween: 5,
    leftPadding: 5,
    rightPadding: 5,
    topPadding: 5,
    bottomPadding: 5,
    spaceToOuterLabel: 10,
  });
  const elementBuilder = new ElementBuilder(settings);

  it("Horizontal - Row Resizing - After Insert Cols", async () => {
    let row1 = new LayoutRow(
      Alignment.EXPANDED,
      Alignment.EXPANDED,
      settings,
      null
    );
    let col1 = new LayoutCol(
      Alignment.EXPANDED,
      Alignment.EXPANDED,
      settings,
      null
    );
    let col2 = new LayoutCol(
      Alignment.EXPANDED,
      Alignment.EXPANDED,
      settings,
      null
    );

    col1.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 50,
        height: 25,
      })
    );
    col1.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 60,
        height: 50,
      })
    );
    col2.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 25,
        height: 60,
      })
    );

    row1.addContainer(col1);
    row1.addContainer(col2);

    const cols = row1.getChildren();
    const col1Children = cols[0].getChildren();
    const col2Children = cols[1].getChildren();

    expect(row1.getHeight()).toBe(100);
    expect(row1.getWidth()).toBe(120);
    expect(col1Children[0].getWidth()).toBe(col1.getUsedHeight());
    expect(col1Children[1].getWidth()).toBe(col1.getUsedHeight());
    expect(col2Children[0].getWidth()).toBe(col2.getUsedHeight());
  });

  it("Horizontal - Row Resizing - Imposed Size", async () => {
    let row1 = new LayoutRow(
      Alignment.EXPANDED,
      Alignment.EXPANDED,
      settings,
      null
    );
    let col1 = new LayoutCol(
      Alignment.EXPANDED,
      Alignment.EXPANDED,
      settings,
      null
    );
    let col2 = new LayoutCol(
      Alignment.EXPANDED,
      Alignment.EXPANDED,
      settings,
      null
    );

    col1.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 50,
        height: 25,
      })
    );
    col1.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 60,
        height: 50,
      })
    );
    col2.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 25,
        height: 60,
      })
    );

    row1.addContainer(col1);
    row1.addContainer(col2);

    row1.setWidth(200);
    row1.setHeight(125);

    const cols = row1.getChildren();
    const col1Children = cols[0].getChildren();
    const col2Children = cols[1].getChildren();

    expect(col1Children[0].getY()).toBe(0);
    expect(col1Children[1].getY()).toBe(55);
    expect(col2Children[0].getY()).toBe(0);
    expect(col1Children[0].getHeight()).toBe(50);
    expect(col1Children[1].getHeight()).toBe(50);
    expect(col2Children[0].getHeight()).toBe(105);
    expect(col1Children[0].getWidth()).toBe(col1.getUsedHeight());
    expect(col1Children[1].getWidth()).toBe(col1.getUsedHeight());
    expect(col2Children[0].getWidth()).toBe(col2.getUsedHeight());
    expect(row1.getHeight()).toBe(125);
    expect(row1.getWidth()).toBe(200);
  });

  it("Horizontal and Vertical - Simple Resizing", async () => {
    const layoutSettings = new Settings({
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

    const director = new LayoutDirector(layoutSettings);

    const row1 = director.newRow(Alignment.EXPANDED, Alignment.EXPANDED, true);
    const col1 = director.newCol(Alignment.START, Alignment.EXPANDED, true);
    director.addMediumElementToCurrent("A", "T", false);
    director.navigateToParent();
    const col2 = director.newCol(Alignment.START, Alignment.EXPANDED, true);
    director.addMediumElementToCurrent("A", "T", false);

    expect(row1.children.length).toBe(2);
    expect(col1.children.length).toBe(1);
    expect(col2.children.length).toBe(1);
    expect(col1.getWidth()).toBe(15);
    expect(col1.getHeight()).toBe(5);
    expect(col2.getWidth()).toBe(15);
    expect(col2.getHeight()).toBe(5);
    expect(row1.getWidth()).toBe(32);
    expect(row1.getHeight()).toBe(5);
  });

  it("Horizontal and Vertical - Mixed Elements Resizing", async () => {
    const layoutSettings = new Settings({
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

    const director = new LayoutDirector(layoutSettings);

    const row1 = director.newRow(Alignment.EXPANDED, Alignment.EXPANDED, true);
    const col1 = director.newCol(Alignment.START, Alignment.EXPANDED, true);
    const row2 = director.newRow(Alignment.EXPANDED, Alignment.EXPANDED, true);
    const col2 = director.newCol(Alignment.START, Alignment.EXPANDED, true);
    director.addMediumElementToCurrent("B", "T", false);
    director.navigateToParent();
    director.navigateToParent();
    director.addMediumElementToCurrent("A", "T", false);

    expect(row1.children.length).toBe(1);
    expect(col1.children.length).toBe(2);
    expect(row2.children.length).toBe(1);
    expect(col2.children.length).toBe(1);
    expect(col1.getWidth()).toBe(15);
    expect(col1.getHeight()).toBe(12);
    expect(row2.getWidth()).toBe(15);
    expect(row2.getHeight()).toBe(5);
    expect(col2.getWidth()).toBe(15);
    expect(col2.getHeight()).toBe(5);
    expect(row1.getWidth()).toBe(15);
    expect(row1.getHeight()).toBe(12);
  });

  it("Horizontal - Insertion Resize (Global Distribution)", async () => {
    const set = new LayoutTree(settings);

    const row1 = set.newRow(Alignment.START, Alignment.EXPANDED);
    const col1 = set.newCol(Alignment.START, Alignment.EXPANDED);
    const row2 = set.newRow(Alignment.START, Alignment.EXPANDED);
    const el1 = elementBuilder.buildElement({
      name: "A",
      width: 50,
      height: 30,
      x: 0,
      y: 0,
    });
    const el2 = elementBuilder.buildElement({
      name: "B",
      width: 75,
      height: 35,
      x: 0,
      y: 0,
    });

    set.addToCurrentGroup(el1);
    set.addToCurrentGroup(el2);
    set.navigateToParent();

    const row3 = set.newRow(Alignment.START, Alignment.EXPANDED);
    const el3 = elementBuilder.buildElement({
      name: "A",
      width: 60,
      height: 50,
      x: 0,
      y: 0,
    });

    set.addToCurrentGroup(el3);
    set.navigateToParent();
    set.navigateToParent();

    const col2 = set.newCol(Alignment.START, Alignment.EXPANDED);
    const row4 = set.newRow(Alignment.START, Alignment.EXPANDED);
    const el4 = elementBuilder.buildElement({
      name: "A",
      width: 100,
      height: 60,
      x: 0,
      y: 0,
    });

    set.addToCurrentGroup(el4);

    expect(row2.getHeight()).toBe(45);
    expect(row2.getWidth()).toBe(140);
    expect(row3.getHeight()).toBe(60);
    expect(row3.getWidth()).toBe(140);
    expect(col1.getHeight()).toBe(120);
    expect(col1.getWidth()).toBe(150);
    expect(row4.getHeight()).toBe(70);
    expect(row4.getWidth()).toBe(110);
    expect(col2.getHeight()).toBe(120);
    expect(col2.getWidth()).toBe(120);
    expect(row1.getHeight()).toBe(130);
    expect(row1.getWidth()).toBe(285);
    expect(el1.getHeight()).toBe(35);
    expect(el1.getWidth()).toBe(50);
    expect(el2.getHeight()).toBe(35);
    expect(el2.getWidth()).toBe(75);
    expect(el3.getHeight()).toBe(50);
    expect(el3.getWidth()).toBe(60);
    expect(el4.getHeight()).toBe(60);
    expect(el4.getWidth()).toBe(100);

    expect(el1.getX()).toBe(0);
    expect(el1.getY()).toBe(0);
    expect(el2.getX()).toBe(55);
    expect(el2.getY()).toBe(0);
    expect(el3.getX()).toBe(0);
    expect(el3.getY()).toBe(0);
    expect(el4.getX()).toBe(0);
    expect(el4.getY()).toBe(0);
  });
});
