// @ts-nocheck
import {LayoutDirector} from "../../src/libs/engine/layout_engine/layout_builder/layout_director";
import {Settings} from "../../src/libs/engine/layout_engine/settings";
import {Alignment} from "../../src/libs/common/alignment.enum";
import {DEFAULT} from "../../src/libs/common/size_reference.const";
import {LayoutRow} from "../../src/libs/engine/layout_engine/layout_builder/layout_row";
import {LayoutCol} from "../../src/libs/engine/layout_engine/layout_builder/layout_col";
import {LayoutSet} from "../../src/libs/engine/layout_engine/layout_builder/layout_set";
import {ElementBuilder} from "../../src/libs/engine/layout_engine/layout_builder/element_builder";

const settings = new Settings(
    {
        layoutType: "hierarchy",
        maxHorizontalCount: 4,
        maxChildHorizontalCount: 2,
        spaceBetween: 5,
        marginX: 5,
        marginY: 5,
        spaceToOuterLabel: 10
    }
);
const elementBuilder = new ElementBuilder(settings);

describe('Layout Group', () => {
    it('Element Insertion', async () => {
        const director = new LayoutDirector(settings);
        const row = director.newRow(Alignment.START, Alignment.START, true);

        director.addTinyElementToCurrent('el1', 't1');
        director.addSmallElementToCurrent('el2', 't1');
        director.addMediumElementToCurrent('el3', 't1');
        director.addBigElementToCurrent('el4', 't1');
        director.addSmallElementToCurrent('el5', 't1', true);
        director.addMediumElementToCurrent('el6', 't1', true);
        director.addBigElementToCurrent('el7', 't1', true);

        const children = row.getChildren();

        expect(children[0].getWidth()).toBe(DEFAULT.SIZE_UNIT);
        expect(children[0].getHeight()).toBe(DEFAULT.SIZE_UNIT);
        expect(children[1].getWidth()).toBe(2 * DEFAULT.SIZE_UNIT);
        expect(children[1].getHeight()).toBe(DEFAULT.SIZE_UNIT);
        expect(children[2].getWidth()).toBe(3 * DEFAULT.SIZE_UNIT);
        expect(children[2].getHeight()).toBe(DEFAULT.SIZE_UNIT);
        expect(children[3].getWidth()).toBe(4 * DEFAULT.SIZE_UNIT);
        expect(children[3].getHeight()).toBe(DEFAULT.SIZE_UNIT);
        expect(children[4].getWidth()).toBe(DEFAULT.SIZE_UNIT);
        expect(children[4].getHeight()).toBe(2 * DEFAULT.SIZE_UNIT);
        expect(children[5].getWidth()).toBe(DEFAULT.SIZE_UNIT);
        expect(children[5].getHeight()).toBe(3 * DEFAULT.SIZE_UNIT);
        expect(children[6].getWidth()).toBe(DEFAULT.SIZE_UNIT);
        expect(children[6].getHeight()).toBe(4 * DEFAULT.SIZE_UNIT);
    });

    it('Horizontal - Main Axis - Start Alignment', async () => {
        let group = new LayoutRow(Alignment.START, Alignment.START, settings, null, false);

        group.addContainer(elementBuilder.buildElement({width: 50, height: 25, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 100, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 150, height: 60, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        expect(children[0].getX()).toBe(0);
        expect(children[1].getX()).toBe(55);
        expect(children[2].getX()).toBe(160);
        expect(children[0].getHeight()).toBe(25);
        expect(children[1].getHeight()).toBe(50);
        expect(children[2].getHeight()).toBe(60);
    });

    it('Horizontal - Main Axis - End Alignment', async () => {
        let group = new LayoutRow(Alignment.END, Alignment.START, settings, null, false);

        group.addContainer(elementBuilder.buildElement({width: 50, height: 25, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 100, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 150, height: 60, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        expect(children[0].getX()).toBe(450);
        expect(children[1].getX()).toBe(345);
        expect(children[2].getX()).toBe(190);
        expect(children[0].getHeight()).toBe(25);
        expect(children[1].getHeight()).toBe(50);
        expect(children[2].getHeight()).toBe(60);
    });

    it('Horizontal - Main Axis - Center Alignment', async () => {
        let group = new LayoutRow(Alignment.CENTER, Alignment.START, settings, null, false);

        group.addContainer(elementBuilder.buildElement({width: 50, height: 25, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 60, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        expect(children[0].getX()).toBe(170);
        expect(children[1].getX()).toBe(225);
        expect(children[2].getX()).toBe(280);
        expect(children[0].getHeight()).toBe(25);
        expect(children[1].getHeight()).toBe(50);
        expect(children[2].getHeight()).toBe(60);
    });

    it('Horizontal - Main Axis - Space Between Alignment', async () => {
        let group = new LayoutRow(Alignment.EXPANDED, Alignment.EXPANDED, settings, null, false);

        group.addContainer(elementBuilder.buildElement({width: 50, height: 25, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 100, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 150, height: 60, x: 0, y: 0}));

        group.setMaximumMainLength(400);

        const children = group.getChildren();

        expect(children[0].getX()).toBe(0);
        expect(children[1].getX()).toBe(135);
        expect(children[2].getX()).toBe(270);
        expect(children[0].getHeight()).toBe(group.getCrossLength());
        expect(children[1].getHeight()).toBe(group.getCrossLength());
        expect(children[2].getHeight()).toBe(group.getCrossLength());
    });

    it('Horizontal - Cross Axis - Start Alignment', async () => {
        let group = new LayoutRow(Alignment.START, Alignment.START, settings, null, false);

        group.addContainer(elementBuilder.buildElement({width: 50, height: 25, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 60, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        expect(children[0].getY()).toBe(0);
        expect(children[1].getY()).toBe(0);
        expect(children[2].getY()).toBe(0);
        expect(children[0].getHeight()).toBe(25);
        expect(children[1].getHeight()).toBe(50);
        expect(children[2].getHeight()).toBe(60);
    });

    it('Horizontal - Cross Axis - End Alignment', async () => {
        let group = new LayoutRow(Alignment.START, Alignment.END, settings, null, false);

        group.addContainer(elementBuilder.buildElement({width: 50, height: 25, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 60, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        expect(children[0].getY()).toBe(35);
        expect(children[1].getY()).toBe(10);
        expect(children[2].getY()).toBe(0);
        expect(children[0].getHeight()).toBe(25);
        expect(children[1].getHeight()).toBe(50);
        expect(children[2].getHeight()).toBe(60);
    });

    it('Horizontal - Cross Axis - Center Alignment', async () => {
        let group = new LayoutRow(Alignment.START, Alignment.CENTER, settings, null, false);

        group.addContainer(elementBuilder.buildElement({width: 50, height: 25, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 60, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        expect(children[0].getY()).toBe(17.5);
        expect(children[1].getY()).toBe(5);
        expect(children[2].getY()).toBe(0);
        expect(children[0].getHeight()).toBe(25);
        expect(children[1].getHeight()).toBe(50);
        expect(children[2].getHeight()).toBe(60);
    });

    it('Horizontal - Cross Axis - Space Between Alignment', async () => {
        let group = new LayoutRow(Alignment.START, Alignment.EXPANDED, settings, null, false);

        group.addContainer(elementBuilder.buildElement({width: 50, height: 25, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 60, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        expect(children[0].getY()).toBe(0);
        expect(children[1].getY()).toBe(0);
        expect(children[2].getY()).toBe(0);
        expect(children[0].getHeight()).toBe(group.getCrossLength());
        expect(children[1].getHeight()).toBe(group.getCrossLength());
        expect(children[2].getHeight()).toBe(group.getCrossLength());
    });

    it('Vertical - Main Axis - Start Alignment', async () => {
        let group = new LayoutCol(Alignment.START, Alignment.START, settings, null, false);

        group.addContainer(elementBuilder.buildElement({width: 25, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 100, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 60, height: 150, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        expect(children[0].getY()).toBe(0);
        expect(children[1].getY()).toBe(55);
        expect(children[2].getY()).toBe(160);
        expect(children[0].getWidth()).toBe(25);
        expect(children[1].getWidth()).toBe(50);
        expect(children[2].getWidth()).toBe(60);
    });

    it('Vertical - Main Axis - End Alignment', async () => {
        let group = new LayoutCol(Alignment.END, Alignment.START, settings, null, false);

        group.addContainer(elementBuilder.buildElement({width: 25, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 100, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 60, height: 150, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        expect(children[0].getY()).toBe(450);
        expect(children[1].getY()).toBe(345);
        expect(children[2].getY()).toBe(190);
        expect(children[0].getWidth()).toBe(25);
        expect(children[1].getWidth()).toBe(50);
        expect(children[2].getWidth()).toBe(60);
    });

    it('Vertical - Main Axis - Center Alignment', async () => {
        let group = new LayoutCol(Alignment.CENTER, Alignment.START, settings, null, false);

        group.addContainer(elementBuilder.buildElement({width: 25, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 60, height: 50, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        expect(children[0].getY()).toBe(170);
        expect(children[1].getY()).toBe(225);
        expect(children[2].getY()).toBe(280);
        expect(children[0].getWidth()).toBe(25);
        expect(children[1].getWidth()).toBe(50);
        expect(children[2].getWidth()).toBe(60);
    });

    it('Vertical - Main Axis - Space Between Alignment', async () => {
        let group = new LayoutCol(Alignment.EXPANDED, Alignment.EXPANDED, settings, null, false);

        group.addContainer(elementBuilder.buildElement({width: 25, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 100, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 60, height: 150, x: 0, y: 0}));

        group.setMaximumMainLength(400);

        const children = group.getChildren();

        expect(children[0].getY()).toBe(0);
        expect(children[1].getY()).toBe(135);
        expect(children[2].getY()).toBe(270);
        expect(children[0].getWidth()).toBe(group.getCrossLength());
        expect(children[1].getWidth()).toBe(group.getCrossLength());
        expect(children[2].getWidth()).toBe(group.getCrossLength());
    });

    it('Vertical - Cross Axis - Start Alignment', async () => {
        let group = new LayoutCol(Alignment.START, Alignment.START, settings, null, false);

        group.addContainer(elementBuilder.buildElement({width: 25, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 60, height: 50, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        expect(children[0].getX()).toBe(0);
        expect(children[1].getX()).toBe(0);
        expect(children[2].getX()).toBe(0);
        expect(children[0].getWidth()).toBe(25);
        expect(children[1].getWidth()).toBe(50);
        expect(children[2].getWidth()).toBe(60);
    });

    it('Vertical - Cross Axis - End Alignment', async () => {
        let group = new LayoutCol(Alignment.START, Alignment.END, settings, null, false);

        group.addContainer(elementBuilder.buildElement({width: 25, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 60, height: 50, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        expect(children[0].getX()).toBe(35);
        expect(children[1].getX()).toBe(10);
        expect(children[2].getX()).toBe(0);
        expect(children[0].getWidth()).toBe(25);
        expect(children[1].getWidth()).toBe(50);
        expect(children[2].getWidth()).toBe(60);
    });

    it('Vertical - Cross Axis - Center Alignment', async () => {
        let group = new LayoutCol(Alignment.START, Alignment.CENTER, settings, null, false);

        group.addContainer(elementBuilder.buildElement({width: 25, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 60, height: 50, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        expect(children[0].getX()).toBe(17.5);
        expect(children[1].getX()).toBe(5);
        expect(children[2].getX()).toBe(0);
        expect(children[0].getWidth()).toBe(25);
        expect(children[1].getWidth()).toBe(50);
        expect(children[2].getWidth()).toBe(60);
    });

    it('Vertical - Cross Axis - Space Between Alignment', async () => {
        let group = new LayoutCol(Alignment.START, Alignment.EXPANDED, settings, null, false);

        group.addContainer(elementBuilder.buildElement({width: 25, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 60, height: 50, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        expect(children[0].getX()).toBe(0);
        expect(children[1].getX()).toBe(0);
        expect(children[2].getX()).toBe(0);
        expect(children[0].getWidth()).toBe(group.getCrossLength());
        expect(children[1].getWidth()).toBe(group.getCrossLength());
        expect(children[2].getWidth()).toBe(group.getCrossLength());
    });

    it('Horizontal - Row Resizing - Elements Adjust to the Size', async () => {
        let group = new LayoutRow(Alignment.EXPANDED, Alignment.EXPANDED, settings, null, false);

        group.addContainer(elementBuilder.buildElement({width: 50, height: 25, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 60, x: 0, y: 0}));

        group.setWidth(410);
        group.setHeight(100);

        const children = group.getChildren();

        expect(children[0].getX()).toBe(0);
        expect(children[1].getX()).toBe(135);
        expect(children[2].getX()).toBe(270);
        expect(children[0].getHeight()).toBe(group.getCrossLength());
        expect(children[1].getHeight()).toBe(group.getCrossLength());
        expect(children[2].getHeight()).toBe(group.getCrossLength());
        expect(group.getHeight()).toBe(100);
        expect(group.getWidth()).toBe(410);
    });

    it('Horizontal - Row Resizing - After Insert Cols', async () => {
        let row1 = new LayoutRow(Alignment.EXPANDED, Alignment.EXPANDED, settings, null, false);
        let col1 = new LayoutCol(Alignment.EXPANDED, Alignment.EXPANDED, settings, null, false);
        let col2 = new LayoutCol(Alignment.EXPANDED, Alignment.EXPANDED, settings, null, false);

        col1.addContainer(elementBuilder.buildElement({width: 50, height: 25, x: 0, y: 0}));
        col1.addContainer(elementBuilder.buildElement({width: 60, height: 50, x: 0, y: 0}));
        col2.addContainer(elementBuilder.buildElement({width: 25, height: 60, x: 0, y: 0}));

        row1.addContainer(col1);
        row1.addContainer(col2);

        const cols = row1.getChildren();
        const col1Children = cols[0].getChildren();
        const col2Children = cols[1].getChildren();

        expect(row1.getHeight()).toBe(100);
        expect(row1.getWidth()).toBe(120);
        expect(col1Children[0].getWidth()).toBe(col1.getCrossLength());
        expect(col1Children[1].getWidth()).toBe(col1.getCrossLength());
        expect(col2Children[0].getWidth()).toBe(col2.getCrossLength());
    });

    it('Horizontal - Row Resizing - Imposed Size', async () => {
        let row1 = new LayoutRow(Alignment.EXPANDED, Alignment.EXPANDED, settings, null, false);
        let col1 = new LayoutCol(Alignment.EXPANDED, Alignment.EXPANDED, settings, null, false);
        let col2 = new LayoutCol(Alignment.EXPANDED, Alignment.EXPANDED, settings, null, false);

        col1.addContainer(elementBuilder.buildElement({width: 50, height: 25, x: 0, y: 0}));
        col1.addContainer(elementBuilder.buildElement({width: 60, height: 50, x: 0, y: 0}));
        col2.addContainer(elementBuilder.buildElement({width: 25, height: 60, x: 0, y: 0}));

        row1.addContainer(col1);
        row1.addContainer(col2);

        row1.setWidth(200);
        row1.setHeight(125);

        const cols = row1.getChildren();
        const col1Children = cols[0].getChildren();
        const col2Children = cols[1].getChildren();

        expect(col1Children[0].getY()).toBe(0);
        expect(col1Children[1].getY()).toBe(55);
        expect(col2Children[0].getY()).toBe(0);
        expect(col1Children[0].getHeight()).toBe(50);
        expect(col1Children[1].getHeight()).toBe(50);
        expect(col2Children[0].getHeight()).toBe(105);
        expect(col1Children[0].getWidth()).toBe(col1.getCrossLength());
        expect(col1Children[1].getWidth()).toBe(col1.getCrossLength());
        expect(col2Children[0].getWidth()).toBe(col2.getCrossLength());
        expect(row1.getHeight()).toBe(125);
        expect(row1.getWidth()).toBe(200);
    });

    it('Horizontal and Vertical - Simple Resizing', async () => {
        const layoutSettings = new Settings(
            {
                maxHorizontalCount: 4,
                maxChildHorizontalCount: 2,
                spaceBetween: 2,
                sizeUnit: 5,
                marginX: 1,
                marginY: 1,
                spaceToOuterLabel: 1,
                labelWidth: 4,
                labelHeight: 2
            }
        );

        const director = new LayoutDirector(layoutSettings);

        const row1 = director.newRow(Alignment.EXPANDED, Alignment.EXPANDED, true);
        const col1 = director.newCol(Alignment.START, Alignment.EXPANDED, true);
        director.addMediumElementToCurrent("A", "T", false);
        director.navigateToParent();
        const col2 = director.newCol(Alignment.START, Alignment.EXPANDED, true);
        director.addMediumElementToCurrent("A", "T", false);

        expect(row1.children.length).toBe(2);
        expect(col1.children.length).toBe(1);
        expect(col2.children.length).toBe(1);
        expect(col1.getWidth()).toBe(15);
        expect(col1.getHeight()).toBe(5);
        expect(col2.getWidth()).toBe(15);
        expect(col2.getHeight()).toBe(5);
        expect(row1.getWidth()).toBe(32);
        expect(row1.getHeight()).toBe(5);
    });

    it('Horizontal and Vertical - Mixed Elements Resizing', async () => {
        const layoutSettings = new Settings(
            {
                maxHorizontalCount: 4,
                maxChildHorizontalCount: 2,
                spaceBetween: 2,
                sizeUnit: 5,
                marginX: 1,
                marginY: 1,
                spaceToOuterLabel: 1,
                labelWidth: 4,
                labelHeight: 2
            }
        );

        const director = new LayoutDirector(layoutSettings);

        const row1 = director.newRow(Alignment.EXPANDED, Alignment.EXPANDED, true);
        const col1 = director.newCol(Alignment.START, Alignment.EXPANDED, true);
        const row2 = director.newRow(Alignment.EXPANDED, Alignment.EXPANDED, true);
        const col2 = director.newCol(Alignment.START, Alignment.EXPANDED, true);
        director.addMediumElementToCurrent("B", "T", false);
        director.navigateToParent();
        director.navigateToParent();
        director.addMediumElementToCurrent("A", "T", false);

        expect(row1.children.length).toBe(1);
        expect(col1.children.length).toBe(2);
        expect(row2.children.length).toBe(1);
        expect(col2.children.length).toBe(1);
        expect(col1.getWidth()).toBe(15);
        expect(col1.getHeight()).toBe(12);
        expect(row2.getWidth()).toBe(15);
        expect(row2.getHeight()).toBe(5);
        expect(col2.getWidth()).toBe(15);
        expect(col2.getHeight()).toBe(5);
        expect(row1.getWidth()).toBe(15);
        expect(row1.getHeight()).toBe(12);
    });

    it('Horizontal - Insertion Resize (Global Distribution)', async () => {
        const set = new LayoutSet(settings);

        const row1 = set.newRow(Alignment.START, Alignment.EXPANDED);
        const col1 = set.newCol(Alignment.START, Alignment.EXPANDED);
        const row2 = set.newRow(Alignment.START, Alignment.EXPANDED);
        const el1 = elementBuilder.buildElement({width: 50, height: 30, x: 0, y: 0});
        const el2 = elementBuilder.buildElement({width: 75, height: 35, x: 0, y: 0});

        set.addToCurrentGroup(el1);
        set.addToCurrentGroup(el2);
        set.navigateToParent();

        const row3 = set.newRow(Alignment.START, Alignment.EXPANDED);
        const el3 = elementBuilder.buildElement({width: 60, height: 50, x: 0, y: 0});

        set.addToCurrentGroup(el3);
        set.navigateToParent();
        set.navigateToParent();

        const col2 = set.newCol(Alignment.START, Alignment.EXPANDED);
        const row4 = set.newRow(Alignment.START, Alignment.EXPANDED);
        const el4 = elementBuilder.buildElement({width: 100, height: 60, x: 0, y: 0});

        set.addToCurrentGroup(el4);

        expect(row2.getHeight()).toBe(45);
        expect(row2.getWidth()).toBe(140);
        expect(row3.getHeight()).toBe(60);
        expect(row3.getWidth()).toBe(140);
        expect(col1.getHeight()).toBe(120);
        expect(col1.getWidth()).toBe(150);
        expect(row4.getHeight()).toBe(70);
        expect(row4.getWidth()).toBe(110);
        expect(col2.getHeight()).toBe(120);
        expect(col2.getWidth()).toBe(120);
        expect(row1.getHeight()).toBe(130);
        expect(row1.getWidth()).toBe(285);
        expect(el1.getHeight()).toBe(35);
        expect(el1.getWidth()).toBe(50);
        expect(el2.getHeight()).toBe(35);
        expect(el2.getWidth()).toBe(75);
        expect(el3.getHeight()).toBe(50);
        expect(el3.getWidth()).toBe(60);
        expect(el4.getHeight()).toBe(60);
        expect(el4.getWidth()).toBe(100);

        expect(el1.getX()).toBe(0);
        expect(el1.getY()).toBe(0);
        expect(el2.getX()).toBe(55);
        expect(el2.getY()).toBe(0);
        expect(el3.getX()).toBe(0);
        expect(el3.getY()).toBe(0);
        expect(el4.getX()).toBe(0);
        expect(el4.getY()).toBe(0);
    });

    it('Global Position - Absolute Positioning Calculation', async () => {
        const set = new LayoutSet(settings);
        set.newRow(Alignment.START, Alignment.START, true);
        const col1 = set.newCol(Alignment.START, Alignment.START, false);

        set.addToCurrentGroup(elementBuilder.buildElement({width: 50, height: 25, x: 0, y: 0}));
        set.addToCurrentGroup(elementBuilder.buildElement({width: 60, height: 50, x: 0, y: 0}));

        set.navigateToParent();
        const col2 = set.newCol(Alignment.START, Alignment.START, false);

        set.addToCurrentGroup(elementBuilder.buildElement({width: 25, height: 60, x: 0, y: 0}));
        set.addToCurrentGroup(elementBuilder.buildElement({width: 50, height: 40, x: 0, y: 0}));

        set.navigateToParent();
        const col3 = set.newVisibleCol("el1", "t1", Alignment.START, Alignment.START, true);

        set.addToCurrentGroup(elementBuilder.buildElement({width: 20, height: 20, x: 0, y: 0}));
        set.addToCurrentGroup(elementBuilder.buildElement({width: 30, height: 50, x: 0, y: 0}));

        set.navigateToParent();
        const col4 = set.newVisibleCol("el2", "t2", Alignment.START, Alignment.START, false);

        set.addToCurrentGroup(elementBuilder.buildElement({width: 20, height: 20, x: 0, y: 0}));
        set.addToCurrentGroup(elementBuilder.buildElement({width: 30, height: 50, x: 0, y: 0}));

        set.toAbsolutePosition();

        const col1Children = col1.getChildren();
        const col2Children = col2.getChildren();
        const col3Children = col3.getChildren();
        const col4Children = col4.getChildren();

        expect(col1.getX()).toBe(0);
        expect(col1.getY()).toBe(0);
        expect(col1Children[0].getX()).toBe(5);
        expect(col1Children[0].getY()).toBe(5);
        expect(col1Children[1].getX()).toBe(5);
        expect(col1Children[1].getY()).toBe(35);
        expect(col2.getX()).toBe(75);
        expect(col2.getY()).toBe(0);
        expect(col2Children[0].getX()).toBe(80);
        expect(col2Children[0].getY()).toBe(5);
        expect(col2Children[1].getX()).toBe(80);
        expect(col2Children[1].getY()).toBe(70);
        expect(col3.getX()).toBe(140);
        expect(col3.getY()).toBe(0);
        expect(col3Children[0].getX()).toBe(185);
        expect(col3Children[0].getY()).toBe(5);
        expect(col3Children[1].getX()).toBe(185);
        expect(col3Children[1].getY()).toBe(30);
        expect(col4.getX()).toBe(225);
        expect(col4.getY()).toBe(0);
        expect(col4Children[0].getX()).toBe(230);
        expect(col4Children[0].getY()).toBe(25);
        expect(col4Children[1].getX()).toBe(230);
        expect(col4Children[1].getY()).toBe(50);
    });

    it('Complex View Construction - Long Hierarchical Chain', async () => {
        const layoutSettings = new Settings(
            {
                maxHorizontalCount: 4,
                maxChildHorizontalCount: 2,
                spaceBetween: 2,
                sizeUnit: 5,
                marginX: 1,
                marginY: 1,
                spaceToOuterLabel: 1,
                labelWidth: 4,
                labelHeight: 2
            }
        );

        const director = new LayoutDirector(layoutSettings);

        const rowA1 = director.newRow(Alignment.EXPANDED, Alignment.EXPANDED, true);
        const colA1 = director.newCol(Alignment.START, Alignment.EXPANDED, true);
        const rowA2 = director.newRow(Alignment.EXPANDED, Alignment.EXPANDED, true);
        const colB1 = director.newCol(Alignment.START, Alignment.EXPANDED, true);
        const rowB1 = director.newRow(Alignment.EXPANDED, Alignment.EXPANDED, true);
        const colB2 = director.newCol(Alignment.START, Alignment.EXPANDED, true);
        const rowB2 = director.newRow(Alignment.EXPANDED, Alignment.EXPANDED, true);
        director.addMediumElementToCurrent("B1-1", "T", false);
        director.navigateToParent();
        director.addMediumElementToCurrent("B1", "T", false);
        director.navigateToParent();
        const colB3 = director.newCol(Alignment.START, Alignment.EXPANDED, true);
        const rowB3 = director.newRow(Alignment.EXPANDED, Alignment.EXPANDED, true);
        director.addMediumElementToCurrent("B2-1", "T", false);
        director.navigateToParent();
        director.addMediumElementToCurrent("B2", "T", false);
        director.navigateToParent(2);
        director.addMediumElementToCurrent("B", "T", false);
        director.navigateToParent();
        const colC1 = director.newCol(Alignment.START, Alignment.EXPANDED, true);
        const rowC1 = director.newRow(Alignment.EXPANDED, Alignment.EXPANDED, true);
        director.addMediumElementToCurrent("C1", "T", false);
        director.navigateToParent();
        director.addMediumElementToCurrent("C", "T", false);
        director.navigateToParent(2);
        director.addMediumElementToCurrent("A", "T", false);

        director.toAbsolutePosition();

        expect(rowA1.children.length).toBe(1);
        expect(colA1.children.length).toBe(2);
        expect(colA1.children[1].getName()).toBe("A");
        expect(colA1.children[1].getWidth()).toBe(66);
        expect(colA1.children[1].getHeight()).toBe(5);
        expect(colA1.getSubTreeCounting()).toBe(7);
        expect(rowA2.children.length).toBe(2);
        expect(colB1.children.length).toBe(2);
        expect(colB1.children[1].getName()).toBe("B");
        expect(colB1.children[1].getWidth()).toBe(32);
        expect(colB1.children[1].getHeight()).toBe(5);
        expect(colB1.getSubTreeCounting()).toBe(4);
        expect(rowB1.children.length).toBe(2);
        expect(colB2.children.length).toBe(2);
        expect(colB2.children[1].getName()).toBe("B1");
        expect(colB2.children[1].getWidth()).toBe(15);
        expect(colB2.children[1].getHeight()).toBe(5);
        expect(colB2.getSubTreeCounting()).toBe(1);
        expect(rowB2.children.length).toBe(1);
        expect(rowB2.children[0].getName()).toBe("B1-1");
        expect(rowB2.children[0].getWidth()).toBe(15);
        expect(rowB2.children[0].getHeight()).toBe(5);
        expect(rowB2.getSubTreeCounting()).toBe(0);
        expect(colB3.children.length).toBe(2);
        expect(colB3.children[1].getName()).toBe("B2");
        expect(colB3.children[1].getWidth()).toBe(15);
        expect(colB3.children[1].getHeight()).toBe(5);
        expect(colB3.getSubTreeCounting()).toBe(1);
        expect(rowB3.children.length).toBe(1);
        expect(rowB3.children[0].getName()).toBe("B2-1");
        expect(rowB3.children[0].getWidth()).toBe(15);
        expect(rowB3.children[0].getHeight()).toBe(5);
        expect(rowB3.getSubTreeCounting()).toBe(0);
        expect(colC1.children.length).toBe(2);
        expect(colC1.children[1].getName()).toBe("C");
        expect(colC1.children[1].getWidth()).toBe(32);
        expect(colC1.children[1].getHeight()).toBe(5);
        expect(colC1.getSubTreeCounting()).toBe(1);
        expect(rowC1.children.length).toBe(1);
        expect(rowC1.children[0].getName()).toBe("C1");
        expect(rowC1.children[0].getWidth()).toBe(32);
        expect(rowC1.children[0].getHeight()).toBe(5);
        expect(rowC1.getSubTreeCounting()).toBe(0);
    });

    it('Complex View Construction - Long Nested Chain', async () => {
        const layoutSettings = new Settings(
            {
                maxHorizontalCount: 4,
                maxChildHorizontalCount: 2,
                spaceBetween: 2,
                sizeUnit: 5,
                marginX: 1,
                marginY: 1,
                spaceToOuterLabel: 1,
                labelWidth: 4,
                labelHeight: 2
            }
        );

        const director = new LayoutDirector(layoutSettings);

        const rowA1 = director.newRow(Alignment.EXPANDED, Alignment.EXPANDED, true);
        const A = director.newVisibleRow("A", "T", Alignment.START, Alignment.EXPANDED, false);
        const B = director.newVisibleRow("B", "T", Alignment.START, Alignment.EXPANDED, false);
        const B1 = director.newVisibleRow("B1", "T", Alignment.START, Alignment.EXPANDED, false);
        const B11 = director.addMediumElementToCurrent("B1-1", "T", false);

        director.navigateToParent(1);

        const B2 = director.newVisibleRow("B2", "T", Alignment.START, Alignment.EXPANDED, false);
        const B21 = director.addMediumElementToCurrent("B2-1", "T", false);

        director.navigateToParent(2);

        const C = director.newVisibleRow("C", "T", Alignment.START, Alignment.EXPANDED, false);
        const C1 = director.addMediumElementToCurrent("C1", "T", false);

        director.toAbsolutePosition();

        expect(A).toBeDefined();
        expect(B).toBeDefined();
        expect(B1).toBeDefined();
        expect(B11).toBeDefined();
        expect(B2).toBeDefined();
        expect(B21).toBeDefined();
        expect(C).toBeDefined();
        expect(C1).toBeDefined();

        expect(B11.getWidth()).toBe(15);
        expect(B11.getHeight()).toBe(5);
        expect(B11.getX()).toBe(3);
        expect(B11.getY()).toBe(12);

        expect(B1.getWidth()).toBe(17);
        expect(B1.getHeight()).toBe(10);
        expect(B1.getX()).toBe(2);
        expect(B1.getY()).toBe(8);

        expect(B21.getWidth()).toBe(15);
        expect(B21.getHeight()).toBe(5)
        expect(B21.getX()).toBe(22);
        expect(B21.getY()).toBe(12);

        expect(B2.getWidth()).toBe(17);
        expect(B2.getHeight()).toBe(10);
        expect(B2.getX()).toBe(21);
        expect(B2.getY()).toBe(8);

        expect(B.getWidth()).toBe(38);
        expect(B.getHeight()).toBe(15);
        expect(B.getX()).toBe(1);
        expect(B.getY()).toBe(4);

        expect(C1.getWidth()).toBe(15);
        expect(C1.getHeight()).toBe(10);
        expect(C1.getX()).toBe(42);
        expect(C1.getY()).toBe(8);

        expect(C.getWidth()).toBe(17);
        expect(C.getHeight()).toBe(15);
        expect(C.getX()).toBe(41);
        expect(C.getY()).toBe(4);

        expect(A.getWidth()).toBe(59);
        expect(A.getHeight()).toBe(20);
        expect(A.getX()).toBe(0);
        expect(A.getY()).toBe(0);
    });

    it('Export to View', async () => {
        const director = new LayoutDirector(settings);
        director.newRow(Alignment.START, Alignment.START, true);
        director.newCol(Alignment.START, Alignment.START, false);

        director.addToCurrentGroup(elementBuilder.buildElement({width: 50, height: 25, x: 0, y: 0}));
        director.addToCurrentGroup(elementBuilder.buildElement({width: 60, height: 50, x: 0, y: 0}));

        director.navigateToParent();
        director.newCol(Alignment.START, Alignment.START, false);

        director.addToCurrentGroup(elementBuilder.buildElement({width: 25, height: 60, x: 0, y: 0}));
        director.addToCurrentGroup(elementBuilder.buildElement({width: 50, height: 40, x: 0, y: 0}));

        director.toAbsolutePosition();

        const view = director.convertToView("Test");
        const viewNodes = view.getViewNodes();

        expect(viewNodes[0].x).toBe(5);
        expect(viewNodes[0].y).toBe(5);
        expect(viewNodes[1].x).toBe(5);
        expect(viewNodes[1].y).toBe(35);
        expect(viewNodes[2].x).toBe(80);
        expect(viewNodes[2].y).toBe(5);
        expect(viewNodes[3].x).toBe(80);
        expect(viewNodes[3].y).toBe(70);
    });
});
