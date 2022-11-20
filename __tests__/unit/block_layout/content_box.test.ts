import { Alignment } from '../../../src/libs/common/alignment.enum';
import { ContentBox } from '../../../src/libs/engine/layout_engine/builder/groups/content_box/content_box';
import { Direction } from '../../../src/libs/common/distribution.enum';

describe('Content Box', () => {
  describe('Row - Top Label', function() {
    const contentBox = new ContentBox(
      25,
      5,
      Direction.HORIZONTAL,
      Alignment.START,
      Alignment.START,
      5, () => {
      }, () => {
      },
    );

    it('Should initialize and update main length content box reference', async () => {
      contentBox.setWidth(100);

      expect(contentBox.getDimension().getLeftBoundary()).toBe(5);
      expect(contentBox.getDimension().getRightBoundary()).toBe(105);
    });

    it('Should initialize and update cross length content box reference', async () => {
      contentBox.setHeight(100);

      expect(contentBox.getDimension().getTopBoundary()).toBe(25);
      expect(contentBox.getDimension().getBottomBoundary()).toBe(125);
    });
  });

  describe('Row - Lateral Label', function() {
    const contentBox = new ContentBox(
      5,
      45,
      Direction.HORIZONTAL,
      Alignment.START,
      Alignment.START,
      5, () => {
      }, () => {
      },
    );

    it('Should initialize and update main length content box reference', async () => {
      contentBox.setWidth(100);

      expect(contentBox.getDimension().getLeftBoundary()).toBe(45);
      expect(contentBox.getDimension().getRightBoundary()).toBe(145);
    });

    it('Should initialize and update cross length content box reference', async () => {
      contentBox.setHeight(100);

      expect(contentBox.getDimension().getTopBoundary()).toBe(5);
      expect(contentBox.getDimension().getBottomBoundary()).toBe(105);
    });
  });

  describe('Col - Top Label', function() {
    const contentBox = new ContentBox(
      25,
      5,
      Direction.VERTICAL,
      Alignment.START,
      Alignment.START,
      5, () => {
      }, () => {
      },
    );

    it('Should initialize and update main length content box reference', async () => {
      contentBox.setWidth(100);

      expect(contentBox.getDimension().getLeftBoundary()).toBe(5);
      expect(contentBox.getDimension().getRightBoundary()).toBe(105);
    });

    it('Should initialize and update cross length content box reference', async () => {
      contentBox.setHeight(100);

      expect(contentBox.getDimension().getTopBoundary()).toBe(25);
      expect(contentBox.getDimension().getBottomBoundary()).toBe(125);
    });
  });

  describe('Col - Lateral Label', function() {
    const contentBox = new ContentBox(
      5,
      45,
      Direction.HORIZONTAL,
      Alignment.START,
      Alignment.START,
      5,
      () => {
      },
      () => {
      },
    );

    it('Should initialize and update main length content box reference', async () => {
      contentBox.setWidth(100);

      expect(contentBox.getDimension().getLeftBoundary()).toBe(45);
      expect(contentBox.getDimension().getRightBoundary()).toBe(145);
    });

    it('Should initialize and update cross length content box reference', async () => {
      contentBox.setHeight(100);

      expect(contentBox.getDimension().getTopBoundary()).toBe(5);
      expect(contentBox.getDimension().getBottomBoundary()).toBe(105);
    });
  });
});
