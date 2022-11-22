import {
  ContentBoxDimension,
} from '../../../src/libs/engine/layout_engine/builder/groups/content_box/content_box_dimension';
import { Direction } from '../../../src/libs/common/distribution.enum';

describe('Content Box Dimension', () => {
  let contentBoxDimension = null;

  describe('Horizontal', () => {
    it('Should create a Content Box Dimension', (done) => {
      contentBoxDimension = new ContentBoxDimension(
        10,
        5,
        Direction.HORIZONTAL,
        5,
        false,
        false,
      );

      expect(contentBoxDimension).toBeDefined();

      done();
    });

    it('Should add the first content and update used width and height', (done) => {
      contentBoxDimension.addContent({ width: 15, height: 10 }, true);

      expect(contentBoxDimension.getUsedWidth()).toBe(15);
      expect(contentBoxDimension.getUsedHeight()).toBe(10);
      expect(contentBoxDimension.getBoxManager().getRightBoundary()).toBe(20);
      expect(contentBoxDimension.getBoxManager().getBottomBoundary()).toBe(20);

      done();
    });

    it('Should add the second content and update used width and height', (done) => {
      contentBoxDimension.addContent({ width: 10, height: 15 });

      expect(contentBoxDimension.getUsedWidth()).toBe(30);
      expect(contentBoxDimension.getUsedHeight()).toBe(15);
      expect(contentBoxDimension.getBoxManager().getRightBoundary()).toBe(35);
      expect(contentBoxDimension.getBoxManager().getBottomBoundary()).toBe(25);

      done();
    });

    it('Should add the third content and update used width and height', (done) => {
      contentBoxDimension.addContent({ width: 20, height: 10 });

      expect(contentBoxDimension.getUsedWidth()).toBe(55);
      expect(contentBoxDimension.getUsedHeight()).toBe(15);
      expect(contentBoxDimension.getBoxManager().getRightBoundary()).toBe(60);
      expect(contentBoxDimension.getBoxManager().getBottomBoundary()).toBe(25);

      done();
    });

    it('Should set the right boundary and keep the same used with', (done) => {
      contentBoxDimension.setContentBoxWidth(60);

      expect(contentBoxDimension.getUsedWidth()).toBe(55);
      expect(contentBoxDimension.getContentBoxWidth()).toBe(60);
      expect(contentBoxDimension.getBoxManager().getRightBoundary()).toBe(65);

      done();
    });

    it('Should set the bottom boundary and keep the same used with', (done) => {
      contentBoxDimension.setContentBoxHeight(20);

      expect(contentBoxDimension.getUsedHeight()).toBe(15);
      expect(contentBoxDimension.getContentBoxHeight()).toBe(20);
      expect(contentBoxDimension.getBoxManager().getBottomBoundary()).toBe(30);

      done();
    });

    it('Should add the last content and update used width and height', (done) => {
      contentBoxDimension.addContent({ width: 10, height: 30 });

      expect(contentBoxDimension.getUsedWidth()).toBe(70);
      expect(contentBoxDimension.getUsedHeight()).toBe(30);
      expect(contentBoxDimension.getBoxManager().getRightBoundary()).toBe(75);
      expect(contentBoxDimension.getBoxManager().getBottomBoundary()).toBe(40);

      done();
    });
  });

  describe('Fixed Horizontal', () => {
    const MAX_WIDTH = 30;

    it('Should create a Content Box Dimension', (done) => {
      contentBoxDimension = new ContentBoxDimension(
        5,
        10,
        Direction.HORIZONTAL,
        5,
        true,
        false,
        { width: MAX_WIDTH },
      );

      expect(contentBoxDimension).toBeDefined();
      expect(contentBoxDimension.getContentBoxWidth()).toBe(MAX_WIDTH);

      done();
    });

    it('Should add the first content and keep up the same height', (done) => {
      contentBoxDimension.addContent({ width: 15, height: 10 }, true);

      expect(contentBoxDimension.getUsedWidth()).toBe(15);
      expect(contentBoxDimension.getUsedHeight()).toBe(10);
      expect(contentBoxDimension.getBoxManager().getBottomBoundary()).toBe(15);
      expect(contentBoxDimension.getBoxManager().getContentBoxWidth()).toBe(MAX_WIDTH);

      done();
    });

    it('Should add the second content and update used width and height', (done) => {
      contentBoxDimension.addContent({ width: 10, height: 15 });

      expect(contentBoxDimension.getUsedWidth()).toBe(30);
      expect(contentBoxDimension.getUsedHeight()).toBe(15);
      expect(contentBoxDimension.getBoxManager().getBottomBoundary()).toBe(20);
      expect(contentBoxDimension.getBoxManager().getContentBoxWidth()).toBe(MAX_WIDTH);

      done();
    });

    it('Should throw an overflow error', (done) => {
      expect(() => {
        contentBoxDimension.addContent({ width: 10, height: 15 });
      }).toThrow(
        `Dimension overflow. Maximum size is ${MAX_WIDTH}`,
      );

      done();
    });
  });

  describe('Vertical', () => {
    it('Should create a Content Box Dimension', (done) => {
      contentBoxDimension = new ContentBoxDimension(
        10,
        5,
        Direction.VERTICAL,
        5,
        false,
        false,
      );

      expect(contentBoxDimension).toBeDefined();

      done();
    });

    it('Should add the first content and update used width and height', (done) => {
      contentBoxDimension.addContent({ width: 10, height: 15 }, true);

      expect(contentBoxDimension.getUsedWidth()).toBe(10);
      expect(contentBoxDimension.getUsedHeight()).toBe(15);
      expect(contentBoxDimension.getBoxManager().getRightBoundary()).toBe(15);
      expect(contentBoxDimension.getBoxManager().getBottomBoundary()).toBe(25);

      done();
    });

    it('Should add the second content and update used width and height', (done) => {
      contentBoxDimension.addContent({ width: 15, height: 10 });

      expect(contentBoxDimension.getUsedWidth()).toBe(15);
      expect(contentBoxDimension.getUsedHeight()).toBe(30);
      expect(contentBoxDimension.getBoxManager().getRightBoundary()).toBe(20);
      expect(contentBoxDimension.getBoxManager().getBottomBoundary()).toBe(40);

      done();
    });

    it('Should add the third content and update used width and height', (done) => {
      contentBoxDimension.addContent({ width: 10, height: 20 });

      expect(contentBoxDimension.getUsedWidth()).toBe(15);
      expect(contentBoxDimension.getUsedHeight()).toBe(55);
      expect(contentBoxDimension.getBoxManager().getRightBoundary()).toBe(20);
      expect(contentBoxDimension.getBoxManager().getBottomBoundary()).toBe(65);

      done();
    });

    it('Should set the right boundary and keep the same used with', (done) => {
      contentBoxDimension.setContentBoxWidth(20);

      expect(contentBoxDimension.getUsedWidth()).toBe(15);
      expect(contentBoxDimension.getContentBoxWidth()).toBe(20);
      expect(contentBoxDimension.getBoxManager().getRightBoundary()).toBe(25);

      done();
    });

    it('Should set the bottom boundary and keep the same used with', (done) => {
      contentBoxDimension.setContentBoxHeight(60);

      expect(contentBoxDimension.getUsedHeight()).toBe(55);
      expect(contentBoxDimension.getContentBoxHeight()).toBe(60);
      expect(contentBoxDimension.getBoxManager().getBottomBoundary()).toBe(70);

      done();
    });

    it('Should add the last content and update used width and height', (done) => {
      contentBoxDimension.addContent({ width: 30, height: 10 });

      expect(contentBoxDimension.getUsedWidth()).toBe(30);
      expect(contentBoxDimension.getUsedHeight()).toBe(70);
      expect(contentBoxDimension.getBoxManager().getRightBoundary()).toBe(35);
      expect(contentBoxDimension.getBoxManager().getBottomBoundary()).toBe(80);

      done();
    });
  });

  describe('Fixed Vertical', () => {
    const MAX_HEIGHT = 30;

    it('Should create a Content Box Dimension', (done) => {
      contentBoxDimension = new ContentBoxDimension(
        10,
        5,
        Direction.VERTICAL,
        5,
        false,
        true,
        { height: MAX_HEIGHT },
      );

      expect(contentBoxDimension).toBeDefined();
      expect(contentBoxDimension.getContentBoxHeight()).toBe(MAX_HEIGHT);

      done();
    });

    it('Should add the first content and keep up the same height', (done) => {
      contentBoxDimension.addContent({ width: 10, height: 15 }, true);

      expect(contentBoxDimension.getUsedWidth()).toBe(10);
      expect(contentBoxDimension.getUsedHeight()).toBe(15);
      expect(contentBoxDimension.getBoxManager().getRightBoundary()).toBe(15);
      expect(contentBoxDimension.getContentBoxHeight()).toBe(MAX_HEIGHT);

      done();
    });

    it('Should add the second content and update used width and height', (done) => {
      contentBoxDimension.addContent({ width: 15, height: 10 });

      expect(contentBoxDimension.getUsedWidth()).toBe(15);
      expect(contentBoxDimension.getUsedHeight()).toBe(30);
      expect(contentBoxDimension.getBoxManager().getRightBoundary()).toBe(20);
      expect(contentBoxDimension.getContentBoxHeight()).toBe(MAX_HEIGHT);

      done();
    });

    it('Should throw an overflow error', (done) => {
      expect(() => {
        contentBoxDimension.addContent({ width: 15, height: 10 });
      }).toThrow(
        `Dimension overflow. Maximum size is ${MAX_HEIGHT}`,
      );

      done();
    });
  });
});
