import { Settings } from "../../../src/libs/engine/layout_engine/settings";
import { Alignment } from "../../../src/libs/common/alignment.enum";
import { VisibleLayoutCol } from "../../../src/libs/engine/layout_engine/layout_builder/visible_layout_col";
import { BaseElement } from "../../../src/libs/model/base_element";

const settings = new Settings({
  layoutType: "nested",
  maxHorizontalCount: 4,
  maxChildHorizontalCount: 2,
  spaceBetween: 5,
  marginX: 5,
  marginY: 5,
  spaceToOuterLabel: 10,
});

describe("Visible Layout Col", () => {
  describe("Simple Visible Col - Top Label - Only Base Elements", () => {
    let group = new VisibleLayoutCol(
      Alignment.EXPANDED,
      Alignment.EXPANDED,
      settings,
      null,
      "COL",
      "T1",
      false
    );
    let children = [];

    it("Should Create a Visible Col", (done) => {
      expect(group).toBeDefined();

      done();
    });

    it("Should Get Name", (done) => {
      expect(group.getName()).toBe("COL");

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
          x: 0,
          y: 0,
          width: 10,
          height: 5,
          parentId: null,
        })
      );
      group.addContainer(
        new BaseElement({
          name: "B",
          type: "T",
          x: 0,
          y: 0,
          width: 20,
          height: 5,
          parentId: null,
        })
      );
      group.addContainer(
        new BaseElement({
          name: "C",
          type: "T",
          x: 0,
          y: 0,
          width: 30,
          height: 5,
          parentId: null,
        })
      );

      children = group.getChildren();

      expect(children.length).toBe(3);
      expect(children[0].getName()).toBe("A");
      expect(children[1].getName()).toBe("B");
      expect(children[2].getName()).toBe("C");
      expect(children[0].getX()).toBe(5);
      expect(children[1].getX()).toBe(5);
      expect(children[2].getX()).toBe(5);
      expect(children[0].getY()).toBe(25);
      expect(children[1].getY()).toBe(35);
      expect(children[2].getY()).toBe(45);

      done();
    });

    it("Should Adjust Width", (done) => {
      group.setWidth(40);

      expect(group.getWidth()).toBe(40);
      expect(children.length).toBe(3);
      expect(children[0].getName()).toBe("A");
      expect(children[1].getName()).toBe("B");
      expect(children[2].getName()).toBe("C");
      expect(children[0].getWidth()).toBe(30);
      expect(children[1].getWidth()).toBe(30);
      expect(children[2].getWidth()).toBe(30);
      expect(children[0].getX()).toBe(5);
      expect(children[1].getX()).toBe(5);
      expect(children[2].getX()).toBe(5);
      expect(children[0].getY()).toBe(25);
      expect(children[1].getY()).toBe(35);
      expect(children[2].getY()).toBe(45);

      done();
    });

    it("Should Adjust Height", (done) => {
      group.setHeight(100);

      expect(group.getHeight()).toBe(100);
      expect(children.length).toBe(3);
      expect(children[0].getName()).toBe("A");
      expect(children[1].getName()).toBe("B");
      expect(children[2].getName()).toBe("C");
      expect(children[0].getHeight()).toBe(20);
      expect(children[1].getHeight()).toBe(20);
      expect(children[2].getHeight()).toBe(20);
      expect(children[0].getX()).toBe(5);
      expect(children[1].getX()).toBe(5);
      expect(children[2].getX()).toBe(5);
      expect(children[0].getY()).toBe(25);
      expect(children[1].getY()).toBe(50);
      expect(children[2].getY()).toBe(75);

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
      expect(children[1].getX()).toBe(15);
      expect(children[2].getX()).toBe(15);
      expect(children[0].getY()).toBe(35);
      expect(children[1].getY()).toBe(60);
      expect(children[2].getY()).toBe(85);

      done();
    });
  });

  describe("Simple Visible Col - Lateral Label - Only Base Elements", () => {
    let group = new VisibleLayoutCol(
      Alignment.EXPANDED,
      Alignment.EXPANDED,
      settings,
      null,
      "COL",
      "T1",
      true
    );
    let children = [];

    it("Should Add 3 Nodes", (done) => {
      group.addContainer(
        new BaseElement({
          name: "A",
          type: "T",
          x: 0,
          y: 0,
          width: 10,
          height: 5,
          parentId: null,
        })
      );
      group.addContainer(
        new BaseElement({
          name: "B",
          type: "T",
          x: 0,
          y: 0,
          width: 20,
          height: 5,
          parentId: null,
        })
      );
      group.addContainer(
        new BaseElement({
          name: "C",
          type: "T",
          x: 0,
          y: 0,
          width: 30,
          height: 5,
          parentId: null,
        })
      );

      children = group.getChildren();

      expect(children.length).toBe(3);
      expect(children[0].getName()).toBe("A");
      expect(children[1].getName()).toBe("B");
      expect(children[2].getName()).toBe("C");
      expect(children[0].getX()).toBe(45);
      expect(children[1].getX()).toBe(45);
      expect(children[2].getX()).toBe(45);
      expect(children[0].getY()).toBe(5);
      expect(children[1].getY()).toBe(15);
      expect(children[2].getY()).toBe(25);

      done();
    });

    it("Should Adjust Width", (done) => {
      group.setWidth(100);

      expect(group.getWidth()).toBe(100);
      expect(children.length).toBe(3);
      expect(children[0].getName()).toBe("A");
      expect(children[1].getName()).toBe("B");
      expect(children[2].getName()).toBe("C");
      expect(children[0].getWidth()).toBe(40);
      expect(children[1].getWidth()).toBe(40);
      expect(children[2].getWidth()).toBe(40);
      expect(children[0].getX()).toBe(45);
      expect(children[1].getX()).toBe(45);
      expect(children[2].getX()).toBe(45);
      expect(children[0].getY()).toBe(5);
      expect(children[1].getY()).toBe(15);
      expect(children[2].getY()).toBe(25);

      done();
    });

    it("Should Adjust Height", (done) => {
      group.setHeight(80);

      expect(group.getHeight()).toBe(80);
      expect(children.length).toBe(3);
      expect(children[0].getName()).toBe("A");
      expect(children[1].getName()).toBe("B");
      expect(children[2].getName()).toBe("C");
      expect(children[0].getHeight()).toBe(20);
      expect(children[1].getHeight()).toBe(20);
      expect(children[2].getHeight()).toBe(20);
      expect(children[0].getX()).toBe(45);
      expect(children[1].getX()).toBe(45);
      expect(children[2].getX()).toBe(45);
      expect(children[0].getY()).toBe(5);
      expect(children[1].getY()).toBe(30);
      expect(children[2].getY()).toBe(55);

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
      expect(children[1].getX()).toBe(55);
      expect(children[2].getX()).toBe(55);
      expect(children[0].getY()).toBe(15);
      expect(children[1].getY()).toBe(40);
      expect(children[2].getY()).toBe(65);

      done();
    });
  });
});
