import { Settings } from "../../../src/libs/engine/layout_engine/settings";
import { Alignment } from "../../../src/libs/common/alignment.enum";
import { BaseElement } from "../../../src/libs/model/base_element";
import { VisibleLayoutRow } from "../../../src/libs/engine/layout_engine/layout_builder/visible_layout_row";
import { LayoutDirector } from "../../../src/libs/engine/layout_engine/layout_builder/layout_director";

const settings = new Settings({
  layoutType: "nested",
  maxHorizontalCount: 4,
  maxChildHorizontalCount: 2,
  spaceBetween: 5,
  leftPadding: 5,
  rightPadding: 5,
  topPadding: 5,
  bottomPadding: 5,
  spaceToOuterLabel: 10,
});

describe("Visible Layout Row", () => {
  describe("Simple Visible Row - Top Label - Only Base Elements", () => {
    let group = new VisibleLayoutRow(
      Alignment.EXPANDED,
      Alignment.EXPANDED,
      settings,
      null,
      "ROW",
      "T1",
      false
    );
    let children = [];

    it("Should Create a Visible Row", (done) => {
      expect(group).toBeDefined();

      done();
    });

    it("Should Get Name", (done) => {
      expect(group.getName()).toBe("ROW");

      done();
    });

    it("Should Get Type", (done) => {
      expect(group.getType()).toBe("T1");

      done();
    });

    it("Should Add 3 Nodes", (done) => {
      group.addContainer(
        new BaseElement({
          name: "A",
          type: "T",
          width: 10,
          height: 10,
        })
      );
      group.addContainer(
        new BaseElement({
          name: "B",
          type: "T",
          width: 20,
          height: 5,
        })
      );
      group.addContainer(
        new BaseElement({
          name: "C",
          type: "T",
          width: 30,
          height: 15,
        })
      );

      children = group.getChildren();

      expect(children.length).toBe(3);
      expect(children[0].getName()).toBe("A");
      expect(children[1].getName()).toBe("B");
      expect(children[2].getName()).toBe("C");
      expect(children[0].getWidth()).toBe(20);
      expect(children[1].getWidth()).toBe(20);
      expect(children[2].getWidth()).toBe(20);
      expect(children[0].getHeight()).toBe(15);
      expect(children[1].getHeight()).toBe(15);
      expect(children[2].getHeight()).toBe(15);
      expect(children[0].getX()).toBe(5);
      expect(children[1].getX()).toBe(30);
      expect(children[2].getX()).toBe(55);
      expect(children[0].getY()).toBe(25);
      expect(children[1].getY()).toBe(25);
      expect(children[2].getY()).toBe(25);

      done();
    });

    it("Should Adjust Width", (done) => {
      group.setWidth(140);

      expect(group.getWidth()).toBe(140);
      expect(children.length).toBe(3);
      expect(children[0].getName()).toBe("A");
      expect(children[1].getName()).toBe("B");
      expect(children[2].getName()).toBe("C");
      expect(children[0].getWidth()).toBe(40);
      expect(children[1].getWidth()).toBe(40);
      expect(children[2].getWidth()).toBe(40);
      expect(children[0].getHeight()).toBe(15);
      expect(children[1].getHeight()).toBe(15);
      expect(children[2].getHeight()).toBe(15);
      expect(children[0].getX()).toBe(5);
      expect(children[1].getX()).toBe(50);
      expect(children[2].getX()).toBe(95);
      expect(children[0].getY()).toBe(25);
      expect(children[1].getY()).toBe(25);
      expect(children[2].getY()).toBe(25);

      done();
    });

    it("Should Adjust Height", (done) => {
      group.setHeight(50);

      expect(group.getHeight()).toBe(50);
      expect(children.length).toBe(3);
      expect(children[0].getName()).toBe("A");
      expect(children[1].getName()).toBe("B");
      expect(children[2].getName()).toBe("C");
      expect(children[0].getWidth()).toBe(40);
      expect(children[1].getWidth()).toBe(40);
      expect(children[2].getWidth()).toBe(40);
      expect(children[0].getHeight()).toBe(20);
      expect(children[1].getHeight()).toBe(20);
      expect(children[2].getHeight()).toBe(20);
      expect(children[0].getX()).toBe(5);
      expect(children[1].getX()).toBe(50);
      expect(children[2].getX()).toBe(95);
      expect(children[0].getY()).toBe(25);
      expect(children[1].getY()).toBe(25);
      expect(children[2].getY()).toBe(25);

      done();
    });

    it("Should Translate Position", (done) => {
      group.translatePosition(10, 10);

      children = group.getChildren();

      expect(group.getX()).toBe(10);
      expect(group.getY()).toBe(10);
      expect(children.length).toBe(3);
      expect(children[0].getName()).toBe("A");
      expect(children[1].getName()).toBe("B");
      expect(children[2].getName()).toBe("C");
      expect(children[0].getX()).toBe(15);
      expect(children[1].getX()).toBe(60);
      expect(children[2].getX()).toBe(105);
      expect(children[0].getY()).toBe(35);
      expect(children[1].getY()).toBe(35);
      expect(children[2].getY()).toBe(35);

      done();
    });
  });

  describe("Simple Visible Row - Lateral Label - Only Base Elements", () => {
    let group = new VisibleLayoutRow(
      Alignment.EXPANDED,
      Alignment.EXPANDED,
      settings,
      null,
      "ROW",
      "T1",
      true
    );
    let children = [];

    it("Should Add 3 Nodes", (done) => {
      group.addContainer(
        new BaseElement({
          name: "A",
          type: "T",
          width: 10,
          height: 10,
        })
      );
      group.addContainer(
        new BaseElement({
          name: "B",
          type: "T",
          width: 20,
          height: 5,
        })
      );
      group.addContainer(
        new BaseElement({
          name: "C",
          type: "T",
          width: 30,
          height: 15,
        })
      );

      children = group.getChildren();

      expect(children.length).toBe(3);
      expect(children[0].getName()).toBe("A");
      expect(children[1].getName()).toBe("B");
      expect(children[2].getName()).toBe("C");
      expect(children[0].getWidth()).toBe(20);
      expect(children[1].getWidth()).toBe(20);
      expect(children[2].getWidth()).toBe(20);
      expect(children[0].getHeight()).toBe(15);
      expect(children[1].getHeight()).toBe(15);
      expect(children[2].getHeight()).toBe(15);
      expect(children[0].getX()).toBe(45);
      expect(children[1].getX()).toBe(70);
      expect(children[2].getX()).toBe(95);
      expect(children[0].getY()).toBe(5);
      expect(children[1].getY()).toBe(5);
      expect(children[2].getY()).toBe(5);

      done();
    });

    it("Should Adjust Width", (done) => {
      group.setWidth(180);

      expect(group.getWidth()).toBe(180);
      expect(children.length).toBe(3);
      expect(children[0].getName()).toBe("A");
      expect(children[1].getName()).toBe("B");
      expect(children[2].getName()).toBe("C");
      expect(children[0].getWidth()).toBe(40);
      expect(children[1].getWidth()).toBe(40);
      expect(children[2].getWidth()).toBe(40);
      expect(children[0].getHeight()).toBe(15);
      expect(children[1].getHeight()).toBe(15);
      expect(children[2].getHeight()).toBe(15);
      expect(children[0].getX()).toBe(45);
      expect(children[1].getX()).toBe(90);
      expect(children[2].getX()).toBe(135);
      expect(children[0].getY()).toBe(5);
      expect(children[1].getY()).toBe(5);
      expect(children[2].getY()).toBe(5);

      done();
    });

    it("Should Adjust Height", (done) => {
      group.setHeight(80);

      expect(group.getHeight()).toBe(80);
      expect(children.length).toBe(3);
      expect(children[0].getName()).toBe("A");
      expect(children[1].getName()).toBe("B");
      expect(children[2].getName()).toBe("C");
      expect(children[0].getWidth()).toBe(40);
      expect(children[1].getWidth()).toBe(40);
      expect(children[2].getWidth()).toBe(40);
      expect(children[0].getHeight()).toBe(25);
      expect(children[1].getHeight()).toBe(25);
      expect(children[2].getHeight()).toBe(25);
      expect(children[0].getX()).toBe(45);
      expect(children[1].getX()).toBe(90);
      expect(children[2].getX()).toBe(135);
      expect(children[0].getY()).toBe(5);
      expect(children[1].getY()).toBe(5);
      expect(children[2].getY()).toBe(5);

      done();
    });

    it("Should Translate Position", (done) => {
      group.translatePosition(10, 10);

      children = group.getChildren();

      expect(group.getX()).toBe(10);
      expect(group.getY()).toBe(10);
      expect(children.length).toBe(3);
      expect(children[0].getName()).toBe("A");
      expect(children[1].getName()).toBe("B");
      expect(children[2].getName()).toBe("C");
      expect(children[0].getX()).toBe(55);
      expect(children[1].getX()).toBe(100);
      expect(children[2].getX()).toBe(145);
      expect(children[0].getY()).toBe(15);
      expect(children[1].getY()).toBe(15);
      expect(children[2].getY()).toBe(15);

      done();
    });
  });

  describe("Content Box - Top Label", function () {
    const director = new LayoutDirector(settings);
    const row: VisibleLayoutRow = director.newVisibleRow(
      "R1",
      "T",
      Alignment.START,
      Alignment.START,
      false
    );

    it("Should initialize and update main length content box reference", async () => {
      row.setWidth(100);

      expect(row.contentBox.topLeft.x).toBe(5);
      expect(row.contentBox.bottomRight.x).toBe(95);
    });

    it("Should initialize and update cross length content box reference", async () => {
      row.setHeight(100);

      expect(row.contentBox.topLeft.y).toBe(25);
      expect(row.contentBox.bottomRight.y).toBe(95);
    });
  });

  describe("Content Box - Lateral Label", function () {
    const director = new LayoutDirector(settings);
    const row: VisibleLayoutRow = director.newVisibleRow(
        "R1",
        "T",
        Alignment.START,
        Alignment.START,
        true
    );

    it("Should initialize and update main length content box reference", async () => {
      row.setWidth(100);

      expect(row.contentBox.topLeft.x).toBe(45);
      expect(row.contentBox.bottomRight.x).toBe(95);
    });

    it("Should initialize and update cross length content box reference", async () => {
      row.setHeight(100);

      expect(row.contentBox.topLeft.y).toBe(5);
      expect(row.contentBox.bottomRight.y).toBe(95);
    });
  });

  describe("Row Alignment Test", () => {
    it("Initial Element Position - Main Axis START - Cross Axis START", async () => {
      const director = new LayoutDirector(settings);
      const row: VisibleLayoutRow = director.newVisibleRow(
        "R1",
        "T",
        Alignment.START,
        Alignment.START,
        true
      );

      row.setWidth(100);
      director.addTinyElementToCurrent("A", "T");

      const children = row.getChildren();

      expect(children[0].getX()).toBe(5);
      expect(children[0].getY()).toBe(25);
    });

    it("Initial Element Position - Main Axis END - Cross Axis START", async () => {
      const director = new LayoutDirector(settings);
      const row: VisibleLayoutRow = director.newVisibleRow(
        "R1",
        "T",
        Alignment.END,
        Alignment.START,
        true
      );

      row.setWidth(100);
      director.addTinyElementToCurrent("A", "T");

      const children = row.getChildren();

      expect(children[0].getX()).toBe(90);
      expect(children[0].getY()).toBe(25);
    });

    it("Initial Element Position - Main Axis CENTER - Cross Axis START", async () => {
      const director = new LayoutDirector(settings);
      const row: VisibleLayoutRow = director.newVisibleRow(
        "R1",
        "T",
        Alignment.CENTER,
        Alignment.START,
        true
      );

      row.setWidth(100);
      director.addTinyElementToCurrent("A", "T");

      const children = row.getChildren();

      expect(children[0].getX()).toBe(47.5);
      expect(children[0].getY()).toBe(25);
    });

    it("Initial Element Position - Main Axis EXPANDED - Cross Axis START", async () => {
      const director = new LayoutDirector(settings);
      const row: VisibleLayoutRow = director.newVisibleRow(
        "R1",
        "T",
        Alignment.EXPANDED,
        Alignment.START,
        true
      );

      row.setWidth(100);
      director.addTinyElementToCurrent("A", "T");

      const children = row.getChildren();

      expect(children[0].getX()).toBe(5);
      expect(children[0].getY()).toBe(25);
    });
  });
});
