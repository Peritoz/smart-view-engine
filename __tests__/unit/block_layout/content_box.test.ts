import { Settings } from "../../../src/libs/engine/layout_engine/settings";
import { Alignment } from "../../../src/libs/common/alignment.enum";
import { BaseElement } from "../../../src/libs/model/base_element";
import { VisibleLayoutRow } from "../../../src/libs/engine/layout_engine/layout_builder/visible_layout_row";
import { LayoutDirector } from "../../../src/libs/engine/layout_engine/layout_builder/layout_director";
import { VisibleLayoutCol } from "../../../src/libs/engine/layout_engine/layout_builder/visible_layout_col";

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

describe("Content Box", () => {
  describe("Row - Top Label", function () {
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

  describe("Row - Lateral Label", function () {
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

  describe("Col - Top Label", function () {
    const director = new LayoutDirector(settings);
    const row: VisibleLayoutCol = director.newVisibleRow(
      "C1",
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

  describe("Col - Lateral Label", function () {
    const director = new LayoutDirector(settings);
    const row: VisibleLayoutCol = director.newVisibleRow(
      "C1",
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
});
