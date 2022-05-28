import { Alignment } from "../../../src/libs/common/alignment.enum";
import { ElementBuilder } from "../../../src/libs/engine/layout_engine/layout_builder/element_builder";
import { ContentBox } from "../../../src/libs/engine/layout_engine/layout_builder/content_box";
import { Direction } from "../../../src/libs/common/distribution.enum";
import {DEFAULT} from "../../../src/libs/common/size_reference.const";

const elementBuilder = new ElementBuilder(DEFAULT.SIZE_UNIT);

describe("Horizontal Layout", () => {
  it("Horizontal - Main Axis - Start Alignment", async () => {
    let group: ContentBox = new ContentBox(
      5,
      5,
      Direction.HORIZONTAL,
      Alignment.START,
      Alignment.START,
      5
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
        height: 50,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 150,
        height: 60,
      })
    );

    group.setWidth(500);

    const children = group.getChildren();

    expect(children[0].getX()).toBe(0);
    expect(children[1].getX()).toBe(55);
    expect(children[2].getX()).toBe(160);
    expect(children[0].getY()).toBe(0);
    expect(children[1].getY()).toBe(0);
    expect(children[2].getY()).toBe(0);
    expect(children[0].getWidth()).toBe(50);
    expect(children[1].getWidth()).toBe(100);
    expect(children[2].getWidth()).toBe(150);
    expect(children[0].getHeight()).toBe(25);
    expect(children[1].getHeight()).toBe(50);
    expect(children[2].getHeight()).toBe(60);
  });

  it("Horizontal - Main Axis - End Alignment", async () => {
    let group: ContentBox = new ContentBox(
      5,
      5,
      Direction.HORIZONTAL,
      Alignment.END,
      Alignment.START,
      5
    );

    group.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 50,
        height: 25,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 100,
        height: 50,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 150,
        height: 60,
      })
    );

    group.setWidth(500);

    const children = group.getChildren();

    expect(children[0].getX()).toBe(450);
    expect(children[1].getX()).toBe(345);
    expect(children[2].getX()).toBe(190);
    expect(children[0].getY()).toBe(0);
    expect(children[1].getY()).toBe(0);
    expect(children[2].getY()).toBe(0);
    expect(children[0].getWidth()).toBe(50);
    expect(children[1].getWidth()).toBe(100);
    expect(children[2].getWidth()).toBe(150);
    expect(children[0].getHeight()).toBe(25);
    expect(children[1].getHeight()).toBe(50);
    expect(children[2].getHeight()).toBe(60);
  });

  it("Horizontal - Main Axis - Center Alignment", async () => {
    let group: ContentBox = new ContentBox(
      5,
      5,
      Direction.HORIZONTAL,
      Alignment.CENTER,
      Alignment.START,
      5
    );

    group.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 50,
        height: 25,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 50,
        height: 50,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 50,
        height: 60,
      })
    );

    group.setWidth(500);

    const children = group.getChildren();

    expect(children[0].getX()).toBe(170);
    expect(children[1].getX()).toBe(225);
    expect(children[2].getX()).toBe(280);
    expect(children[0].getY()).toBe(0);
    expect(children[1].getY()).toBe(0);
    expect(children[2].getY()).toBe(0);
    expect(children[0].getWidth()).toBe(50);
    expect(children[1].getWidth()).toBe(50);
    expect(children[2].getWidth()).toBe(50);
    expect(children[0].getHeight()).toBe(25);
    expect(children[1].getHeight()).toBe(50);
    expect(children[2].getHeight()).toBe(60);
  });

  it("Horizontal - Main Axis - Space Between Alignment", async () => {
    let group: ContentBox = new ContentBox(
      5,
      5,
      Direction.HORIZONTAL,
      Alignment.EXPANDED,
      Alignment.EXPANDED,
      5
    );

    group.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 50,
        height: 25,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 100,
        height: 50,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 150,
        height: 60,
      })
    );

    group.setWidth(400);

    const children = group.getChildren();

    expect(children[0].getX()).toBe(0);
    expect(children[1].getX()).toBe(135);
    expect(children[2].getX()).toBe(270);
    expect(children[0].getY()).toBe(0);
    expect(children[1].getY()).toBe(0);
    expect(children[2].getY()).toBe(0);
    expect(children[0].getWidth()).toBe(130);
    expect(children[1].getWidth()).toBe(130);
    expect(children[2].getWidth()).toBe(130);
    expect(children[0].getHeight()).toBe(60);
    expect(children[1].getHeight()).toBe(60);
    expect(children[2].getHeight()).toBe(60);
  });

  it("Horizontal - Cross Axis - Start Alignment", async () => {
    let group: ContentBox = new ContentBox(
      5,
      5,
      Direction.HORIZONTAL,
      Alignment.START,
      Alignment.START,
      5
    );

    group.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 50,
        height: 25,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 50,
        height: 50,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 50,
        height: 60,
      })
    );

    group.setWidth(500);

    const children = group.getChildren();

    expect(children[0].getX()).toBe(0);
    expect(children[1].getX()).toBe(55);
    expect(children[2].getX()).toBe(110);
    expect(children[0].getY()).toBe(0);
    expect(children[1].getY()).toBe(0);
    expect(children[2].getY()).toBe(0);
    expect(children[0].getWidth()).toBe(50);
    expect(children[1].getWidth()).toBe(50);
    expect(children[2].getWidth()).toBe(50);
    expect(children[0].getHeight()).toBe(25);
    expect(children[1].getHeight()).toBe(50);
    expect(children[2].getHeight()).toBe(60);
  });

  it("Horizontal - Cross Axis - End Alignment", async () => {
    let group: ContentBox = new ContentBox(
      5,
      5,
      Direction.HORIZONTAL,
      Alignment.START,
      Alignment.END,
      5
    );

    group.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 50,
        height: 25,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 50,
        height: 50,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 50,
        height: 60,
      })
    );

    group.setWidth(500);

    const children = group.getChildren();

    expect(children[0].getX()).toBe(0);
    expect(children[1].getX()).toBe(55);
    expect(children[2].getX()).toBe(110);
    expect(children[0].getY()).toBe(35);
    expect(children[1].getY()).toBe(10);
    expect(children[2].getY()).toBe(0);
    expect(children[0].getWidth()).toBe(50);
    expect(children[1].getWidth()).toBe(50);
    expect(children[2].getWidth()).toBe(50);
    expect(children[0].getHeight()).toBe(25);
    expect(children[1].getHeight()).toBe(50);
    expect(children[2].getHeight()).toBe(60);
  });

  it("Horizontal - Cross Axis - Center Alignment", async () => {
    let group: ContentBox = new ContentBox(
      5,
      5,
      Direction.HORIZONTAL,
      Alignment.START,
      Alignment.CENTER,
      5
    );

    group.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 50,
        height: 25,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 50,
        height: 50,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 50,
        height: 60,
      })
    );

    group.setWidth(500);

    const children = group.getChildren();

    expect(children[0].getX()).toBe(0);
    expect(children[1].getX()).toBe(55);
    expect(children[2].getX()).toBe(110);
    expect(children[0].getY()).toBe(17.5);
    expect(children[1].getY()).toBe(5);
    expect(children[2].getY()).toBe(0);
    expect(children[0].getWidth()).toBe(50);
    expect(children[1].getWidth()).toBe(50);
    expect(children[2].getWidth()).toBe(50);
    expect(children[0].getHeight()).toBe(25);
    expect(children[1].getHeight()).toBe(50);
    expect(children[2].getHeight()).toBe(60);
  });

  it("Horizontal - Cross Axis - Space Between Alignment", async () => {
    let group: ContentBox = new ContentBox(
      5,
      5,
      Direction.HORIZONTAL,
      Alignment.START,
      Alignment.EXPANDED,
      5
    );

    group.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 50,
        height: 25,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 50,
        height: 50,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 50,
        height: 60,
      })
    );

    group.setWidth(500);

    const children = group.getChildren();

    expect(children[0].getX()).toBe(0);
    expect(children[1].getX()).toBe(55);
    expect(children[2].getX()).toBe(110);
    expect(children[0].getY()).toBe(0);
    expect(children[1].getY()).toBe(0);
    expect(children[2].getY()).toBe(0);
    expect(children[0].getWidth()).toBe(50);
    expect(children[1].getWidth()).toBe(50);
    expect(children[2].getWidth()).toBe(50);
    expect(children[0].getHeight()).toBe(60);
    expect(children[1].getHeight()).toBe(60);
    expect(children[2].getHeight()).toBe(60);
  });

  it("Horizontal - Row Resizing - Elements Adjust to the Size", async () => {
    let group: ContentBox = new ContentBox(
      5,
      5,
      Direction.HORIZONTAL,
      Alignment.EXPANDED,
      Alignment.EXPANDED,
      5
    );

    group.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 50,
        height: 25,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 50,
        height: 50,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 50,
        height: 60,
      })
    );

    group.setWidth(400);
    group.setHeight(100);

    const children = group.getChildren();

    expect(children[0].getX()).toBe(0);
    expect(children[1].getX()).toBe(135);
    expect(children[2].getX()).toBe(270);
    expect(children[0].getY()).toBe(0);
    expect(children[1].getY()).toBe(0);
    expect(children[2].getY()).toBe(0);
    expect(children[0].getWidth()).toBe(130);
    expect(children[1].getWidth()).toBe(130);
    expect(children[2].getWidth()).toBe(130);
    expect(children[0].getHeight()).toBe(100);
    expect(children[1].getHeight()).toBe(100);
    expect(children[2].getHeight()).toBe(100);
    expect(group.getHeight()).toBe(100);
    expect(group.getWidth()).toBe(400);
  });
});
