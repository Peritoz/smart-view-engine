import { LayoutDirector } from "../../../src/libs/engine/layout_engine/layout_builder/layout_director";
import { Settings } from "../../../src/libs/engine/layout_engine/settings";
import { Alignment } from "../../../src/libs/common/alignment.enum";
import { LayoutRow } from "../../../src/libs/engine/layout_engine/layout_builder/layout_row";
import { LayoutCol } from "../../../src/libs/engine/layout_engine/layout_builder/layout_col";
import { LayoutSet } from "../../../src/libs/engine/layout_engine/layout_builder/layout_set";
import { ElementBuilder } from "../../../src/libs/engine/layout_engine/layout_builder/element_builder";

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

describe("Horizontal Rendering", () => {
  it("Horizontal - Main Axis - Start Alignment", async () => {
    let group = new LayoutRow(
      Alignment.START,
      Alignment.START,
      settings,
      null
    );

    group.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 50,
        height: 25,
        x: 0,
        y: 0,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 100,
        height: 50
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 150,
        height: 60
      })
    );

    group.setWidth(500);

    const children = group.getChildren();

    expect(children[0].getX()).toBe(0);
    expect(children[1].getX()).toBe(55);
    expect(children[2].getX()).toBe(160);
    expect(children[0].getHeight()).toBe(25);
    expect(children[1].getHeight()).toBe(50);
    expect(children[2].getHeight()).toBe(60);
  });

  it("Horizontal - Main Axis - End Alignment", async () => {
    let group = new LayoutRow(
      Alignment.END,
      Alignment.START,
      settings,
      null
    );

    group.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 50,
        height: 25
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 100,
        height: 50
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 150,
        height: 60
      })
    );

    group.setWidth(500);

    const children = group.getChildren();

    expect(children[0].getX()).toBe(450);
    expect(children[1].getX()).toBe(345);
    expect(children[2].getX()).toBe(190);
    expect(children[0].getHeight()).toBe(25);
    expect(children[1].getHeight()).toBe(50);
    expect(children[2].getHeight()).toBe(60);
  });

  it("Horizontal - Main Axis - Center Alignment", async () => {
    let group = new LayoutRow(
      Alignment.CENTER,
      Alignment.START,
      settings,
      null
    );

    group.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 50,
        height: 25
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 50,
        height: 50
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 50,
        height: 60
      })
    );

    group.setWidth(500);

    const children = group.getChildren();

    expect(children[0].getX()).toBe(170);
    expect(children[1].getX()).toBe(225);
    expect(children[2].getX()).toBe(280);
    expect(children[0].getHeight()).toBe(25);
    expect(children[1].getHeight()).toBe(50);
    expect(children[2].getHeight()).toBe(60);
  });

  it("Horizontal - Main Axis - Space Between Alignment", async () => {
    let group = new LayoutRow(
      Alignment.EXPANDED,
      Alignment.EXPANDED,
      settings,
      null
    );

    group.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 50,
        height: 25
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 100,
        height: 50
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 150,
        height: 60
      })
    );

    group.setWidth(400);

    const children = group.getChildren();

    expect(children[0].getX()).toBe(0);
    expect(children[1].getX()).toBe(135);
    expect(children[2].getX()).toBe(270);
    expect(children[0].getHeight()).toBe(group.getUsedHeight());
    expect(children[1].getHeight()).toBe(group.getUsedHeight());
    expect(children[2].getHeight()).toBe(group.getUsedHeight());
  });

  it("Horizontal - Cross Axis - Start Alignment", async () => {
    let group = new LayoutRow(
      Alignment.START,
      Alignment.START,
      settings,
      null
    );

    group.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 50,
        height: 25
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 50,
        height: 50
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 50,
        height: 60
      })
    );

    group.setWidth(500);

    const children = group.getChildren();

    expect(children[0].getY()).toBe(0);
    expect(children[1].getY()).toBe(0);
    expect(children[2].getY()).toBe(0);
    expect(children[0].getHeight()).toBe(25);
    expect(children[1].getHeight()).toBe(50);
    expect(children[2].getHeight()).toBe(60);
  });

  it("Horizontal - Cross Axis - End Alignment", async () => {
    let group = new LayoutRow(
      Alignment.START,
      Alignment.END,
      settings,
      null
    );

    group.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 50,
        height: 25
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 50,
        height: 50
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 50,
        height: 60
      })
    );

    group.setWidth(500);

    const children = group.getChildren();

    expect(children[0].getY()).toBe(35);
    expect(children[1].getY()).toBe(10);
    expect(children[2].getY()).toBe(0);
    expect(children[0].getHeight()).toBe(25);
    expect(children[1].getHeight()).toBe(50);
    expect(children[2].getHeight()).toBe(60);
  });

  it("Horizontal - Cross Axis - Center Alignment", async () => {
    let group = new LayoutRow(
      Alignment.START,
      Alignment.CENTER,
      settings,
      null
    );

    group.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 50,
        height: 25
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 50,
        height: 50
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 50,
        height: 60
      })
    );

    group.setWidth(500);

    const children = group.getChildren();

    expect(children[0].getY()).toBe(17.5);
    expect(children[1].getY()).toBe(5);
    expect(children[2].getY()).toBe(0);
    expect(children[0].getHeight()).toBe(25);
    expect(children[1].getHeight()).toBe(50);
    expect(children[2].getHeight()).toBe(60);
  });

  it("Horizontal - Cross Axis - Space Between Alignment", async () => {
    let group = new LayoutRow(
      Alignment.START,
      Alignment.EXPANDED,
      settings,
      null
    );

    group.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 50,
        height: 25
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 50,
        height: 50
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 50,
        height: 60
      })
    );

    group.setWidth(500);

    const children = group.getChildren();

    expect(children[0].getY()).toBe(0);
    expect(children[1].getY()).toBe(0);
    expect(children[2].getY()).toBe(0);
    expect(children[0].getHeight()).toBe(group.getUsedHeight());
    expect(children[1].getHeight()).toBe(group.getUsedHeight());
    expect(children[2].getHeight()).toBe(group.getUsedHeight());
  });

  it("Horizontal - Row Resizing - Elements Adjust to the Size", async () => {
    let group = new LayoutRow(
      Alignment.EXPANDED,
      Alignment.EXPANDED,
      settings,
      null
    );

    group.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 50,
        height: 25
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 50,
        height: 50
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 50,
        height: 60
      })
    );

    group.setWidth(410);
    group.setHeight(100);

    const children = group.getChildren();

    expect(children[0].getX()).toBe(0);
    expect(children[1].getX()).toBe(135);
    expect(children[2].getX()).toBe(270);
    expect(children[0].getHeight()).toBe(group.getUsedHeight());
    expect(children[1].getHeight()).toBe(group.getUsedHeight());
    expect(children[2].getHeight()).toBe(group.getUsedHeight());
    expect(group.getHeight()).toBe(100);
    expect(group.getWidth()).toBe(410);
  });
});
