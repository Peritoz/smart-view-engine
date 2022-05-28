import { ContentBoxDimension } from "../../../src/libs/model/content_box_dimension";
import { Direction } from "../../../src/libs/common/distribution.enum";

describe("Content Box Dimension", () => {
  let contentBoxDimension = null;

  describe("Horizontal", () => {
    it("Should create a Content Box Dimension", (done) => {
      contentBoxDimension = new ContentBoxDimension(
        10,
        5,
        0,
        0,
        Direction.HORIZONTAL,
        5
      );

      expect(contentBoxDimension).toBeDefined();

      done();
    });

    it("Should add the first content and update used width and height", (done) => {
      contentBoxDimension.addContent({ width: 15, height: 10 }, true);

      expect(contentBoxDimension.getUsedWidth()).toBe(15);
      expect(contentBoxDimension.getUsedHeight()).toBe(10);
      expect(contentBoxDimension.getRightBoundary()).toBe(20);
      expect(contentBoxDimension.getBottomBoundary()).toBe(20);

      done();
    });

    it("Should add the second content and update used width and height", (done) => {
      contentBoxDimension.addContent({ width: 10, height: 15 });

      expect(contentBoxDimension.getUsedWidth()).toBe(30);
      expect(contentBoxDimension.getUsedHeight()).toBe(15);
      expect(contentBoxDimension.getRightBoundary()).toBe(35);
      expect(contentBoxDimension.getBottomBoundary()).toBe(25);

      done();
    });

    it("Should add the third content and update used width and height", (done) => {
      contentBoxDimension.addContent({ width: 20, height: 10 });

      expect(contentBoxDimension.getUsedWidth()).toBe(55);
      expect(contentBoxDimension.getUsedHeight()).toBe(15);
      expect(contentBoxDimension.getRightBoundary()).toBe(60);
      expect(contentBoxDimension.getBottomBoundary()).toBe(25);

      done();
    });

    it("Should set the right boundary and keep the same used with", (done) => {
      contentBoxDimension.setContentBoxWidth(60);

      expect(contentBoxDimension.getUsedWidth()).toBe(55);
      expect(contentBoxDimension.getContentBoxWidth()).toBe(60);
      expect(contentBoxDimension.getRightBoundary()).toBe(65);

      done();
    });

    it("Should set the bottom boundary and keep the same used with", (done) => {
      contentBoxDimension.setContentBoxHeight(20);

      expect(contentBoxDimension.getUsedHeight()).toBe(15);
      expect(contentBoxDimension.getContentBoxHeight()).toBe(20);
      expect(contentBoxDimension.getBottomBoundary()).toBe(30);

      done();
    });

    it("Should add the last content and update used width and height", (done) => {
      contentBoxDimension.addContent({ width: 10, height: 30 });

      expect(contentBoxDimension.getUsedWidth()).toBe(70);
      expect(contentBoxDimension.getUsedHeight()).toBe(30);
      expect(contentBoxDimension.getRightBoundary()).toBe(75);
      expect(contentBoxDimension.getBottomBoundary()).toBe(40);

      done();
    });
  });

  describe("Vertical", () => {
    it("Should create a Content Box Dimension", (done) => {
      contentBoxDimension = new ContentBoxDimension(
        10,
        5,
        0,
        0,
        Direction.VERTICAL,
        5
      );

      expect(contentBoxDimension).toBeDefined();

      done();
    });

    it("Should add the first content and update used width and height", (done) => {
      contentBoxDimension.addContent({ width: 10, height: 15 }, true);

      expect(contentBoxDimension.getUsedWidth()).toBe(10);
      expect(contentBoxDimension.getUsedHeight()).toBe(15);
      expect(contentBoxDimension.getRightBoundary()).toBe(15);
      expect(contentBoxDimension.getBottomBoundary()).toBe(25);

      done();
    });

    it("Should add the second content and update used width and height", (done) => {
      contentBoxDimension.addContent({ width: 15, height: 10 });

      expect(contentBoxDimension.getUsedWidth()).toBe(15);
      expect(contentBoxDimension.getUsedHeight()).toBe(30);
      expect(contentBoxDimension.getRightBoundary()).toBe(20);
      expect(contentBoxDimension.getBottomBoundary()).toBe(40);

      done();
    });

    it("Should add the third content and update used width and height", (done) => {
      contentBoxDimension.addContent({ width: 10, height: 20 });

      expect(contentBoxDimension.getUsedWidth()).toBe(15);
      expect(contentBoxDimension.getUsedHeight()).toBe(55);
      expect(contentBoxDimension.getRightBoundary()).toBe(20);
      expect(contentBoxDimension.getBottomBoundary()).toBe(65);

      done();
    });

    it("Should set the right boundary and keep the same used with", (done) => {
      contentBoxDimension.setContentBoxWidth(20);

      expect(contentBoxDimension.getUsedWidth()).toBe(15);
      expect(contentBoxDimension.getContentBoxWidth()).toBe(20);
      expect(contentBoxDimension.getRightBoundary()).toBe(25);

      done();
    });

    it("Should set the bottom boundary and keep the same used with", (done) => {
      contentBoxDimension.setContentBoxHeight(60);

      expect(contentBoxDimension.getUsedHeight()).toBe(55);
      expect(contentBoxDimension.getContentBoxHeight()).toBe(60);
      expect(contentBoxDimension.getBottomBoundary()).toBe(70);

      done();
    });

    it("Should add the last content and update used width and height", (done) => {
      contentBoxDimension.addContent({ width: 30, height: 10 });

      expect(contentBoxDimension.getUsedWidth()).toBe(30);
      expect(contentBoxDimension.getUsedHeight()).toBe(70);
      expect(contentBoxDimension.getRightBoundary()).toBe(35);
      expect(contentBoxDimension.getBottomBoundary()).toBe(80);

      done();
    });
  });
});
