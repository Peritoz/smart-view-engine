import { Settings } from '../../../src/libs/engine/settings';
import { LayoutDirector } from '../../../src/libs/engine/layout_engine/builder/layout_director';
import { Alignment } from '../../../src/libs/common/alignment.enum';
import { LayoutTree } from '../../../src/libs/engine/layout_engine/builder/groups/layout_tree';
import { ElementBuilder } from '../../../src/libs/engine/layout_engine/builder/element_builder';
import { LayoutRow } from '../../../src/libs/engine/layout_engine/builder/groups/layout_row';
import { LayoutCol } from '../../../src/libs/engine/layout_engine/builder/groups/layout_col';
import { DEFAULT } from '../../../src/libs/common/size_reference.const';

describe('Mixed Rendering', () => {
  const settings = new Settings({
    layoutType: 'hierarchy',
    maxHorizontalCount: 4,
    maxChildrenHorizontalCount: 2,
    spaceBetween: 5,
    leftPadding: 5,
    rightPadding: 5,
    topPadding: 5,
    bottomPadding: 5,
    spaceToOuterLabel: 10,
  });
  const elementBuilder = new ElementBuilder(DEFAULT.SIZE_UNIT);

  it('Horizontal - Row Resizing - After Insert Cols', async () => {
    let row1 = new LayoutRow(
      null,
      Alignment.START,
      Alignment.START,
      settings,
      null,
    );
    let col1 = new LayoutCol(
      null,
      Alignment.START,
      Alignment.START,
      settings,
      null,
    );
    let col2 = new LayoutCol(
      null,
      Alignment.START,
      Alignment.START,
      settings,
      null,
    );

    row1.addContainer(col1);
    row1.addContainer(col2);

    col1.addContainer(
      elementBuilder.buildElement({
        name: 'A',
        width: 50,
        height: 25,
      }),
    );
    col1.addContainer(
      elementBuilder.buildElement({
        name: 'B',
        width: 60,
        height: 50,
      }),
    );
    col2.addContainer(
      elementBuilder.buildElement({
        name: 'C',
        width: 25,
        height: 60,
      }),
    );

    const cols = row1.getChildren();
    const col1Children = cols[0].getChildren();
    const col2Children = cols[1].getChildren();

    expect(col1Children[0].getWidth()).toBe(50);
    expect(col1Children[0].getHeight()).toBe(25);
    expect(col1Children[0].getX()).toBe(0);
    expect(col1Children[0].getY()).toBe(0);

    expect(col1Children[1].getWidth()).toBe(60);
    expect(col1Children[1].getHeight()).toBe(50);
    expect(col1Children[1].getX()).toBe(0);
    expect(col1Children[1].getY()).toBe(30);

    expect(col2Children[0].getWidth()).toBe(25);
    expect(col2Children[0].getHeight()).toBe(60);
    expect(col2Children[0].getX()).toBe(0);
    expect(col2Children[0].getY()).toBe(0);

    expect(col1.getWidth()).toBe(60);
    expect(col1.getHeight()).toBe(80);
    expect(col1.getX()).toBe(0);
    expect(col1.getY()).toBe(0);

    expect(col2.getWidth()).toBe(25);
    expect(col2.getHeight()).toBe(60);
    expect(col2.getX()).toBe(65);
    expect(col2.getY()).toBe(0);

    expect(row1.getWidth()).toBe(90);
    expect(row1.getHeight()).toBe(80);
    expect(row1.getX()).toBe(0);
    expect(row1.getY()).toBe(0);
  });

  it('Horizontal - Row Resizing - Imposed Size', async () => {
    let row1 = new LayoutRow(
      null,
      Alignment.START,
      Alignment.START,
      settings,
      null,
    );
    let col1 = new LayoutCol(
      null,
      Alignment.START,
      Alignment.START,
      settings,
      null,
    );
    let col2 = new LayoutCol(
      null,
      Alignment.START,
      Alignment.START,
      settings,
      null,
    );

    col1.addContainer(
      elementBuilder.buildElement({
        name: 'A',
        width: 50,
        height: 25,
      }),
    );
    col1.addContainer(
      elementBuilder.buildElement({
        name: 'B',
        width: 60,
        height: 50,
      }),
    );
    col2.addContainer(
      elementBuilder.buildElement({
        name: 'C',
        width: 25,
        height: 60,
      }),
    );

    row1.addContainer(col1);
    row1.addContainer(col2);

    row1.setWidth(120);
    row1.setHeight(100);

    const cols = row1.getChildren();
    const col1Children = cols[0].getChildren();
    const col2Children = cols[1].getChildren();

    expect(col1Children[0].getWidth()).toBe(50);
    expect(col1Children[0].getHeight()).toBe(25);
    expect(col1Children[0].getX()).toBe(0);
    expect(col1Children[0].getY()).toBe(0);

    expect(col1Children[1].getWidth()).toBe(60);
    expect(col1Children[1].getHeight()).toBe(50);
    expect(col1Children[1].getX()).toBe(0);
    expect(col1Children[1].getY()).toBe(30);

    expect(col2Children[0].getWidth()).toBe(25);
    expect(col2Children[0].getHeight()).toBe(60);
    expect(col2Children[0].getX()).toBe(0);
    expect(col2Children[0].getY()).toBe(0);

    expect(col1.getWidth()).toBe(60);
    expect(col1.getHeight()).toBe(80);
    expect(col1.getX()).toBe(0);
    expect(col1.getY()).toBe(0);

    expect(col2.getWidth()).toBe(25);
    expect(col2.getHeight()).toBe(60);
    expect(col2.getX()).toBe(65);
    expect(col2.getY()).toBe(0);

    expect(row1.getWidth()).toBe(120);
    expect(row1.getHeight()).toBe(100);
    expect(row1.getX()).toBe(0);
    expect(row1.getY()).toBe(0);
  });

  it('Horizontal and Vertical - Simple Resizing', async () => {
    const layoutSettings = new Settings({
      maxHorizontalCount: 4,
      maxChildrenHorizontalCount: 2,
      spaceBetween: 5,
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

    const row1 = director.newRow(Alignment.START, Alignment.START);
    const col1 = director.newCol(Alignment.START, Alignment.START);
    director.newMediumElementToCurrent('A', 'T', false);
    director.navigateToParent();
    const col2 = director.newCol(Alignment.START, Alignment.START);
    director.newMediumElementToCurrent('A', 'T', false);

    const row1Children = row1.getChildren();
    const col1Children = col1.getChildren();
    const col2Children = col2.getChildren();

    expect(row1Children.length).toBe(2);
    expect(col1Children.length).toBe(1);
    expect(col2Children.length).toBe(1);

    expect(col1.getWidth()).toBe(15);
    expect(col1.getHeight()).toBe(5);
    expect(col1.getX()).toBe(0);
    expect(col1.getY()).toBe(0);

    expect(col2.getWidth()).toBe(15);
    expect(col2.getHeight()).toBe(5);
    expect(col2.getX()).toBe(20);
    expect(col2.getY()).toBe(0);

    expect(row1.getWidth()).toBe(35);
    expect(row1.getHeight()).toBe(5);
    expect(row1.getX()).toBe(0);
    expect(row1.getY()).toBe(0);
  });

  it('Horizontal and Vertical - Mixed Elements Resizing', async () => {
    const layoutSettings = new Settings({
      maxHorizontalCount: 4,
      maxChildrenHorizontalCount: 2,
      spaceBetween: 5,
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

    const row1 = director.newRow(Alignment.START, Alignment.START);
    const col1 = director.newCol(Alignment.START, Alignment.START);
    const row2 = director.newRow(Alignment.START, Alignment.START);
    const col2 = director.newCol(Alignment.START, Alignment.START);
    director.newMediumElementToCurrent('B', 'T', false);
    director.navigateToParent();
    director.navigateToParent();
    director.newMediumElementToCurrent('A', 'T', false);

    const row1Children = row1.getChildren();
    const col1Children = col1.getChildren();
    const row2Children = row2.getChildren();
    const col2Children = col2.getChildren();

    expect(row1Children.length).toBe(1);
    expect(col1Children.length).toBe(2);
    expect(row2Children.length).toBe(1);
    expect(col2Children.length).toBe(1);

    expect(col2Children[0].getWidth()).toBe(15);
    expect(col2Children[0].getHeight()).toBe(5);
    expect(col2Children[0].getX()).toBe(0);
    expect(col2Children[0].getY()).toBe(0);

    expect(col1Children[1].getWidth()).toBe(15);
    expect(col1Children[1].getHeight()).toBe(5);
    expect(col1Children[1].getX()).toBe(0);
    expect(col1Children[1].getY()).toBe(10);

    expect(col1.getWidth()).toBe(15);
    expect(col1.getHeight()).toBe(15);
    expect(col1.getX()).toBe(0);
    expect(col1.getY()).toBe(0);

    expect(row2.getWidth()).toBe(15);
    expect(row2.getHeight()).toBe(5);
    expect(row2.getX()).toBe(0);
    expect(row2.getY()).toBe(0);

    expect(col2.getWidth()).toBe(15);
    expect(col2.getHeight()).toBe(5);
    expect(col2.getX()).toBe(0);
    expect(col2.getY()).toBe(0);

    expect(row1.getWidth()).toBe(15);
    expect(row1.getHeight()).toBe(15);
    expect(row1.getX()).toBe(0);
    expect(row1.getY()).toBe(0);
  });

  it('Nested Chain with Many Layers', async () => {
    const layoutSettings = new Settings({
      maxHorizontalCount: 4,
      maxChildrenHorizontalCount: 2,
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

    const col1 = director.newCol(Alignment.EXPANDED, Alignment.START);
    const row1 = director.newRow(Alignment.START, Alignment.EXPANDED);
    const A = director.newVisibleRow(
      'A',
      'T',
      Alignment.START,
      Alignment.EXPANDED,
      false,
    );
    const col2 = director.newCol(Alignment.EXPANDED, Alignment.START);
    const row2 = director.newRow(Alignment.START, Alignment.EXPANDED);
    const B = director.newVisibleRow(
      'B',
      'T',
      Alignment.START,
      Alignment.EXPANDED,
      false,
    );
    const col3 = director.newCol(Alignment.EXPANDED, Alignment.START);
    const row3 = director.newRow(Alignment.START, Alignment.EXPANDED);
    const C = director.newMediumElementToCurrent('C', 'T', false);

    director.toAbsolutePosition();

    expect(col1.getContentBox().getChildren().length).toBe(1);
    expect(row1.getContentBox().getChildren().length).toBe(1);
    expect(col2.getContentBox().getChildren().length).toBe(1);
    expect(row2.getContentBox().getChildren().length).toBe(1);
    expect(col3.getContentBox().getChildren().length).toBe(1);
    expect(row3.getContentBox().getChildren().length).toBe(1);

    expect(A.getWidth()).toBe(19);
    expect(A.getHeight()).toBe(15);
    expect(A.getX()).toBe(0);
    expect(A.getY()).toBe(0);

    expect(B.getWidth()).toBe(17);
    expect(B.getHeight()).toBe(10);
    expect(B.getX()).toBe(1);
    expect(B.getY()).toBe(4);

    expect(C.getWidth()).toBe(15);
    expect(C.getHeight()).toBe(5);
    expect(C.getX()).toBe(2);
    expect(C.getY()).toBe(8);
  });

  it('Horizontal - Insertion Resize (Global Distribution)', async () => {
    const set = new LayoutTree(settings);

    const row1 = set.newRow(Alignment.START, Alignment.START);
    const col1 = set.newCol(Alignment.START, Alignment.START);
    const row2 = set.newRow(Alignment.START, Alignment.START);
    const el1 = elementBuilder.buildElement({
      name: 'A',
      width: 30,
      height: 10,
    });
    const el2 = elementBuilder.buildElement({
      name: 'B',
      width: 40,
      height: 15,
    });

    set.addToCurrentGroup(el1);
    set.addToCurrentGroup(el2);
    set.navigateToParent();

    const row3 = set.newRow(Alignment.START, Alignment.START);
    const el3 = elementBuilder.buildElement({
      name: 'A',
      width: 60,
      height: 10,
    });

    set.addToCurrentGroup(el3);
    set.navigateToParent();
    set.navigateToParent();

    const col2 = set.newCol(Alignment.START, Alignment.START);
    const row4 = set.newRow(Alignment.START, Alignment.START);
    const el4 = elementBuilder.buildElement({
      name: 'A',
      width: 30,
      height: 20,
    });

    set.addToCurrentGroup(el4);

    expect(row2.getHeight()).toBe(15);
    expect(row2.getWidth()).toBe(75);
    expect(row2.getX()).toBe(0);
    expect(row2.getY()).toBe(0);

    expect(row3.getHeight()).toBe(10);
    expect(row3.getWidth()).toBe(60);
    expect(row3.getX()).toBe(0);
    expect(row3.getY()).toBe(20);

    expect(col1.getHeight()).toBe(30);
    expect(col1.getWidth()).toBe(75);
    expect(col1.getX()).toBe(0);
    expect(col1.getY()).toBe(0);

    expect(row4.getHeight()).toBe(20);
    expect(row4.getWidth()).toBe(30);
    expect(row4.getX()).toBe(0);
    expect(row4.getY()).toBe(0);

    expect(col2.getHeight()).toBe(20);
    expect(col2.getWidth()).toBe(30);
    expect(col2.getX()).toBe(80);
    expect(col2.getY()).toBe(0);

    expect(row1.getHeight()).toBe(30);
    expect(row1.getWidth()).toBe(110);
    expect(row1.getX()).toBe(0);
    expect(row1.getY()).toBe(0);

    expect(el1.getHeight()).toBe(10);
    expect(el1.getWidth()).toBe(30);
    expect(el1.getX()).toBe(0);
    expect(el1.getY()).toBe(0);

    expect(el2.getHeight()).toBe(15);
    expect(el2.getWidth()).toBe(40);
    expect(el2.getX()).toBe(35);
    expect(el2.getY()).toBe(0);

    expect(el3.getHeight()).toBe(10);
    expect(el3.getWidth()).toBe(60);
    expect(el3.getX()).toBe(0);
    expect(el3.getY()).toBe(0);

    expect(el4.getHeight()).toBe(20);
    expect(el4.getWidth()).toBe(30);
    expect(el4.getX()).toBe(0);
    expect(el4.getY()).toBe(0);
  });
});
