import { Alignment } from "../../../src/libs/common/alignment.enum";
import { ElementBuilder } from "../../../src/libs/engine/layout_engine/layout_builder/element_builder";
import { ContentBox } from "../../../src/libs/engine/layout_engine/layout_builder/content_box";
import { Direction } from "../../../src/libs/common/distribution.enum";
import { DEFAULT } from "../../../src/libs/common/size_reference.const";

const elementBuilder = new ElementBuilder(DEFAULT.SIZE_UNIT);

describe("Vertical Layout", () => {
  it("Vertical - Main Axis - Start Alignment", async () => {
    let group: ContentBox = new ContentBox(
      0,
      0,
      Direction.VERTICAL,
      Alignment.START,
      Alignment.START,
      5
    );

    group.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 25,
        height: 50,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 50,
        height: 100,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 60,
        height: 150,
      })
    );

    group.setHeight(500);

    const children = group.getChildren();

    expect(children[0].getX()).toBe(0);
    expect(children[1].getX()).toBe(0);
    expect(children[2].getX()).toBe(0);
    expect(children[0].getY()).toBe(0);
    expect(children[1].getY()).toBe(55);
    expect(children[2].getY()).toBe(160);
    expect(children[0].getWidth()).toBe(25);
    expect(children[1].getWidth()).toBe(50);
    expect(children[2].getWidth()).toBe(60);
    expect(children[0].getHeight()).toBe(50);
    expect(children[1].getHeight()).toBe(100);
    expect(children[2].getHeight()).toBe(150);
  });

  it("Vertical - Main Axis - End Alignment", async () => {
    let group: ContentBox = new ContentBox(
      0,
      0,
      Direction.VERTICAL,
      Alignment.START,
      Alignment.END,
      5
    );

    group.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 25,
        height: 50,
        x: 0,
        y: 0,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 50,
        height: 100,
        x: 0,
        y: 0,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 60,
        height: 150,
        x: 0,
        y: 0,
      })
    );

    group.setHeight(500);

    const children = group.getChildren();

    expect(children[0].getX()).toBe(0);
    expect(children[1].getX()).toBe(0);
    expect(children[2].getX()).toBe(0);
    expect(children[0].getY()).toBe(450);
    expect(children[1].getY()).toBe(345);
    expect(children[2].getY()).toBe(190);
    expect(children[0].getWidth()).toBe(25);
    expect(children[1].getWidth()).toBe(50);
    expect(children[2].getWidth()).toBe(60);
    expect(children[0].getHeight()).toBe(50);
    expect(children[1].getHeight()).toBe(100);
    expect(children[2].getHeight()).toBe(150);
  });

  it("Vertical - Main Axis - Center Alignment", async () => {
    let group: ContentBox = new ContentBox(
      0,
      0,
      Direction.VERTICAL,
      Alignment.START,
      Alignment.CENTER,
      5
    );

    group.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 25,
        height: 50,
        x: 0,
        y: 0,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 50,
        height: 50,
        x: 0,
        y: 0,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 60,
        height: 50,
        x: 0,
        y: 0,
      })
    );

    group.setHeight(500);

    const children = group.getChildren();

    expect(children[0].getX()).toBe(0);
    expect(children[1].getX()).toBe(0);
    expect(children[2].getX()).toBe(0);
    expect(children[0].getY()).toBe(170);
    expect(children[1].getY()).toBe(225);
    expect(children[2].getY()).toBe(280);
    expect(children[0].getWidth()).toBe(25);
    expect(children[1].getWidth()).toBe(50);
    expect(children[2].getWidth()).toBe(60);
    expect(children[0].getHeight()).toBe(50);
    expect(children[1].getHeight()).toBe(50);
    expect(children[2].getHeight()).toBe(50);
  });

  it("Vertical - Main Axis - Space Between Alignment", async () => {
    let group: ContentBox = new ContentBox(
      0,
      0,
      Direction.VERTICAL,
      Alignment.EXPANDED,
      Alignment.EXPANDED,
      5,
      { width: 60, height: 400 }
    );

    group.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 25,
        height: 50,
        x: 0,
        y: 0,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 50,
        height: 100,
        x: 0,
        y: 0,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 60,
        height: 150,
        x: 0,
        y: 0,
      })
    );

    const children = group.getChildren();

    expect(children[0].getX()).toBe(0);
    expect(children[1].getX()).toBe(0);
    expect(children[2].getX()).toBe(0);
    expect(children[0].getY()).toBe(0);
    expect(children[1].getY()).toBe(135);
    expect(children[2].getY()).toBe(270);
    expect(children[0].getWidth()).toBe(60);
    expect(children[1].getWidth()).toBe(60);
    expect(children[2].getWidth()).toBe(60);
    expect(children[0].getHeight()).toBe(130);
    expect(children[1].getHeight()).toBe(130);
    expect(children[2].getHeight()).toBe(130);
  });

  it("Vertical - Cross Axis - Start Alignment", async () => {
    let group: ContentBox = new ContentBox(
      0,
      0,
      Direction.VERTICAL,
      Alignment.START,
      Alignment.START,
      5
    );

    group.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 25,
        height: 50,
        x: 0,
        y: 0,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 50,
        height: 50,
        x: 0,
        y: 0,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 60,
        height: 50,
        x: 0,
        y: 0,
      })
    );

    group.setHeight(500);

    const children = group.getChildren();

    expect(children[0].getX()).toBe(0);
    expect(children[1].getX()).toBe(0);
    expect(children[2].getX()).toBe(0);
    expect(children[0].getY()).toBe(0);
    expect(children[1].getY()).toBe(55);
    expect(children[2].getY()).toBe(110);
    expect(children[0].getWidth()).toBe(25);
    expect(children[1].getWidth()).toBe(50);
    expect(children[2].getWidth()).toBe(60);
    expect(children[0].getHeight()).toBe(50);
    expect(children[1].getHeight()).toBe(50);
    expect(children[2].getHeight()).toBe(50);
  });

  it("Vertical - Cross Axis - End Alignment", async () => {
    let group: ContentBox = new ContentBox(
      0,
      0,
      Direction.VERTICAL,
      Alignment.END,
      Alignment.START,
      5
    );

    group.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 25,
        height: 50,
        x: 0,
        y: 0,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 50,
        height: 50,
        x: 0,
        y: 0,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 60,
        height: 50,
        x: 0,
        y: 0,
      })
    );

    group.setHeight(500);

    const children = group.getChildren();

    expect(children[0].getX()).toBe(35);
    expect(children[1].getX()).toBe(10);
    expect(children[2].getX()).toBe(0);
    expect(children[0].getY()).toBe(0);
    expect(children[1].getY()).toBe(55);
    expect(children[2].getY()).toBe(110);
    expect(children[0].getWidth()).toBe(25);
    expect(children[1].getWidth()).toBe(50);
    expect(children[2].getWidth()).toBe(60);
    expect(children[0].getHeight()).toBe(50);
    expect(children[1].getHeight()).toBe(50);
    expect(children[2].getHeight()).toBe(50);
  });

  it("Vertical - Cross Axis - Center Alignment", async () => {
    let group: ContentBox = new ContentBox(
      0,
      0,
      Direction.VERTICAL,
      Alignment.CENTER,
      Alignment.START,
      5
    );

    group.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 25,
        height: 50,
        x: 0,
        y: 0,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 50,
        height: 50,
        x: 0,
        y: 0,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 60,
        height: 50,
        x: 0,
        y: 0,
      })
    );

    group.setHeight(500);

    const children = group.getChildren();

    expect(children[0].getX()).toBe(17.5);
    expect(children[1].getX()).toBe(5);
    expect(children[2].getX()).toBe(0);
    expect(children[0].getY()).toBe(0);
    expect(children[1].getY()).toBe(55);
    expect(children[2].getY()).toBe(110);
    expect(children[0].getWidth()).toBe(25);
    expect(children[1].getWidth()).toBe(50);
    expect(children[2].getWidth()).toBe(60);
    expect(children[0].getHeight()).toBe(50);
    expect(children[1].getHeight()).toBe(50);
    expect(children[2].getHeight()).toBe(50);
  });

  it("Vertical - Cross Axis - Space Between Alignment", async () => {
    let group: ContentBox = new ContentBox(
      0,
      0,
      Direction.VERTICAL,
      Alignment.EXPANDED,
      Alignment.START,
      5,
      { width: 200 }
    );

    group.addContainer(
      elementBuilder.buildElement({
        name: "A",
        width: 25,
        height: 50,
        x: 0,
        y: 0,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "B",
        width: 50,
        height: 50,
        x: 0,
        y: 0,
      })
    );
    group.addContainer(
      elementBuilder.buildElement({
        name: "C",
        width: 60,
        height: 50,
        x: 0,
        y: 0,
      })
    );

    const children = group.getChildren();

    expect(children[0].getX()).toBe(0);
    expect(children[1].getX()).toBe(0);
    expect(children[2].getX()).toBe(0);
    expect(children[0].getY()).toBe(0);
    expect(children[1].getY()).toBe(55);
    expect(children[2].getY()).toBe(110);
    expect(children[0].getWidth()).toBe(200);
    expect(children[1].getWidth()).toBe(200);
    expect(children[2].getWidth()).toBe(200);
    expect(children[0].getHeight()).toBe(50);
    expect(children[1].getHeight()).toBe(50);
    expect(children[2].getHeight()).toBe(50);
  });
});
