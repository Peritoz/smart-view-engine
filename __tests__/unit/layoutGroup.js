const chai = require('chai');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');

chai.use(deepEqualInAnyOrder);

const config = require("../../config");
const LayoutRow = require("../../business/smartViewEngine/layoutProcessor/layoutManager/LayoutSet/LayoutRow");
const {ALIGNMENT, SIZE_UNIT} = require("../../business/smartViewEngine/layoutProcessor/layoutManager/LayoutSet/const");
const SmartViewSettings = require("../../business/smartViewEngine/layoutProcessor/layoutManager/SmartViewSettings");
const ElementFactory = require("../../business/smartViewEngine/layoutProcessor/layoutManager/ElementBuilder/ElementBuilder");
const LayoutCol = require("../../business/smartViewEngine/layoutProcessor/layoutManager/LayoutSet/LayoutCol");
const LayoutSet = require("../../business/smartViewEngine/layoutProcessor/layoutManager/LayoutSet/LayoutSet");
const LayoutDirector = require("../../business/smartViewEngine/layoutProcessor/layoutManager/LayoutDirector");
config();

const settings = new SmartViewSettings(
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
const elementBuilder = new ElementFactory(settings);

describe('Layout Group', () => {
    it('Element Insertion', async () => {
        const director = new LayoutDirector(settings);
        const row = director.newRow(ALIGNMENT.START, ALIGNMENT.START, true);

        director.addTinyElementToCurrent('el1', 't1');
        director.addSmallElementToCurrent('el2', 't1');
        director.addMediumElementToCurrent('el3', 't1');
        director.addBigElementToCurrent('el4', 't1');
        director.addSmallElementToCurrent('el5', 't1', true);
        director.addMediumElementToCurrent('el6', 't1', true);
        director.addBigElementToCurrent('el7', 't1', true);

        const children = row.getChildren();

        chai.expect(children[0].getWidth()).to.eq(SIZE_UNIT);
        chai.expect(children[0].getHeight()).to.eq(SIZE_UNIT);
        chai.expect(children[1].getWidth()).to.eq(2 * SIZE_UNIT);
        chai.expect(children[1].getHeight()).to.eq(SIZE_UNIT);
        chai.expect(children[2].getWidth()).to.eq(3 * SIZE_UNIT);
        chai.expect(children[2].getHeight()).to.eq(SIZE_UNIT);
        chai.expect(children[3].getWidth()).to.eq(4 * SIZE_UNIT);
        chai.expect(children[3].getHeight()).to.eq(SIZE_UNIT);
        chai.expect(children[4].getWidth()).to.eq(SIZE_UNIT);
        chai.expect(children[4].getHeight()).to.eq(2 * SIZE_UNIT);
        chai.expect(children[5].getWidth()).to.eq(SIZE_UNIT);
        chai.expect(children[5].getHeight()).to.eq(3 * SIZE_UNIT);
        chai.expect(children[6].getWidth()).to.eq(SIZE_UNIT);
        chai.expect(children[6].getHeight()).to.eq(4 * SIZE_UNIT);
    });

    it('Horizontal - Main Axis - Start Alignment', async () => {
        let group = new LayoutRow(ALIGNMENT.START, ALIGNMENT.START, settings);

        group.addContainer(elementBuilder.buildElement({width: 50, height: 25, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 100, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 150, height: 60, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        chai.expect(children[0].getX()).to.eq(0);
        chai.expect(children[1].getX()).to.eq(55);
        chai.expect(children[2].getX()).to.eq(160);
        chai.expect(children[0].getHeight()).to.eq(25);
        chai.expect(children[1].getHeight()).to.eq(50);
        chai.expect(children[2].getHeight()).to.eq(60);
    });

    it('Horizontal - Main Axis - End Alignment', async () => {
        let group = new LayoutRow(ALIGNMENT.END, ALIGNMENT.START, settings);

        group.addContainer(elementBuilder.buildElement({width: 50, height: 25, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 100, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 150, height: 60, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        chai.expect(children[0].getX()).to.eq(450);
        chai.expect(children[1].getX()).to.eq(345);
        chai.expect(children[2].getX()).to.eq(190);
        chai.expect(children[0].getHeight()).to.eq(25);
        chai.expect(children[1].getHeight()).to.eq(50);
        chai.expect(children[2].getHeight()).to.eq(60);
    });

    it('Horizontal - Main Axis - Center Alignment', async () => {
        let group = new LayoutRow(ALIGNMENT.CENTER, ALIGNMENT.START, settings);

        group.addContainer(elementBuilder.buildElement({width: 50, height: 25, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 60, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        chai.expect(children[0].getX()).to.eq(170);
        chai.expect(children[1].getX()).to.eq(225);
        chai.expect(children[2].getX()).to.eq(280);
        chai.expect(children[0].getHeight()).to.eq(25);
        chai.expect(children[1].getHeight()).to.eq(50);
        chai.expect(children[2].getHeight()).to.eq(60);
    });

    it('Horizontal - Main Axis - Space Between Alignment', async () => {
        let group = new LayoutRow(ALIGNMENT.EXPANDED, ALIGNMENT.EXPANDED, settings);

        group.addContainer(elementBuilder.buildElement({width: 50, height: 25, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 100, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 150, height: 60, x: 0, y: 0}));

        group.setMaximumMainLength(400);

        const children = group.getChildren();

        chai.expect(children[0].getX()).to.eq(0);
        chai.expect(children[1].getX()).to.eq(135);
        chai.expect(children[2].getX()).to.eq(270);
        chai.expect(children[0].getHeight()).to.eq(group.getCrossLength());
        chai.expect(children[1].getHeight()).to.eq(group.getCrossLength());
        chai.expect(children[2].getHeight()).to.eq(group.getCrossLength());
    });

    it('Horizontal - Cross Axis - Start Alignment', async () => {
        let group = new LayoutRow(ALIGNMENT.START, ALIGNMENT.START, settings);

        group.addContainer(elementBuilder.buildElement({width: 50, height: 25, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 60, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        chai.expect(children[0].getY()).to.eq(0);
        chai.expect(children[1].getY()).to.eq(0);
        chai.expect(children[2].getY()).to.eq(0);
        chai.expect(children[0].getHeight()).to.eq(25);
        chai.expect(children[1].getHeight()).to.eq(50);
        chai.expect(children[2].getHeight()).to.eq(60);
    });

    it('Horizontal - Cross Axis - End Alignment', async () => {
        let group = new LayoutRow(ALIGNMENT.START, ALIGNMENT.END, settings);

        group.addContainer(elementBuilder.buildElement({width: 50, height: 25, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 60, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        chai.expect(children[0].getY()).to.eq(35);
        chai.expect(children[1].getY()).to.eq(10);
        chai.expect(children[2].getY()).to.eq(0);
        chai.expect(children[0].getHeight()).to.eq(25);
        chai.expect(children[1].getHeight()).to.eq(50);
        chai.expect(children[2].getHeight()).to.eq(60);
    });

    it('Horizontal - Cross Axis - Center Alignment', async () => {
        let group = new LayoutRow(ALIGNMENT.START, ALIGNMENT.CENTER, settings);

        group.addContainer(elementBuilder.buildElement({width: 50, height: 25, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 60, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        chai.expect(children[0].getY()).to.eq(17.5);
        chai.expect(children[1].getY()).to.eq(5);
        chai.expect(children[2].getY()).to.eq(0);
        chai.expect(children[0].getHeight()).to.eq(25);
        chai.expect(children[1].getHeight()).to.eq(50);
        chai.expect(children[2].getHeight()).to.eq(60);
    });

    it('Horizontal - Cross Axis - Space Between Alignment', async () => {
        let group = new LayoutRow(ALIGNMENT.START, ALIGNMENT.EXPANDED, settings);

        group.addContainer(elementBuilder.buildElement({width: 50, height: 25, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 60, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        chai.expect(children[0].getY()).to.eq(0);
        chai.expect(children[1].getY()).to.eq(0);
        chai.expect(children[2].getY()).to.eq(0);
        chai.expect(children[0].getHeight()).to.eq(group.getCrossLength());
        chai.expect(children[1].getHeight()).to.eq(group.getCrossLength());
        chai.expect(children[2].getHeight()).to.eq(group.getCrossLength());
    });

    it('Vertical - Main Axis - Start Alignment', async () => {
        let group = new LayoutCol(ALIGNMENT.START, ALIGNMENT.START, settings);

        group.addContainer(elementBuilder.buildElement({width: 25, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 100, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 60, height: 150, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        chai.expect(children[0].getY()).to.eq(0);
        chai.expect(children[1].getY()).to.eq(55);
        chai.expect(children[2].getY()).to.eq(160);
        chai.expect(children[0].getWidth()).to.eq(25);
        chai.expect(children[1].getWidth()).to.eq(50);
        chai.expect(children[2].getWidth()).to.eq(60);
    });

    it('Vertical - Main Axis - End Alignment', async () => {
        let group = new LayoutCol(ALIGNMENT.END, ALIGNMENT.START, settings);

        group.addContainer(elementBuilder.buildElement({width: 25, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 100, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 60, height: 150, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        chai.expect(children[0].getY()).to.eq(450);
        chai.expect(children[1].getY()).to.eq(345);
        chai.expect(children[2].getY()).to.eq(190);
        chai.expect(children[0].getWidth()).to.eq(25);
        chai.expect(children[1].getWidth()).to.eq(50);
        chai.expect(children[2].getWidth()).to.eq(60);
    });

    it('Vertical - Main Axis - Center Alignment', async () => {
        let group = new LayoutCol(ALIGNMENT.CENTER, ALIGNMENT.START, settings);

        group.addContainer(elementBuilder.buildElement({width: 25, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 60, height: 50, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        chai.expect(children[0].getY()).to.eq(170);
        chai.expect(children[1].getY()).to.eq(225);
        chai.expect(children[2].getY()).to.eq(280);
        chai.expect(children[0].getWidth()).to.eq(25);
        chai.expect(children[1].getWidth()).to.eq(50);
        chai.expect(children[2].getWidth()).to.eq(60);
    });

    it('Vertical - Main Axis - Space Between Alignment', async () => {
        let group = new LayoutCol(ALIGNMENT.EXPANDED, ALIGNMENT.EXPANDED, settings);

        group.addContainer(elementBuilder.buildElement({width: 25, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 100, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 60, height: 150, x: 0, y: 0}));

        group.setMaximumMainLength(400);

        const children = group.getChildren();

        chai.expect(children[0].getY()).to.eq(0);
        chai.expect(children[1].getY()).to.eq(135);
        chai.expect(children[2].getY()).to.eq(270);
        chai.expect(children[0].getWidth()).to.eq(group.getCrossLength());
        chai.expect(children[1].getWidth()).to.eq(group.getCrossLength());
        chai.expect(children[2].getWidth()).to.eq(group.getCrossLength());
    });

    it('Vertical - Cross Axis - Start Alignment', async () => {
        let group = new LayoutCol(ALIGNMENT.START, ALIGNMENT.START, settings);

        group.addContainer(elementBuilder.buildElement({width: 25, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 60, height: 50, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        chai.expect(children[0].getX()).to.eq(0);
        chai.expect(children[1].getX()).to.eq(0);
        chai.expect(children[2].getX()).to.eq(0);
        chai.expect(children[0].getWidth()).to.eq(25);
        chai.expect(children[1].getWidth()).to.eq(50);
        chai.expect(children[2].getWidth()).to.eq(60);
    });

    it('Vertical - Cross Axis - End Alignment', async () => {
        let group = new LayoutCol(ALIGNMENT.START, ALIGNMENT.END, settings);

        group.addContainer(elementBuilder.buildElement({width: 25, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 60, height: 50, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        chai.expect(children[0].getX()).to.eq(35);
        chai.expect(children[1].getX()).to.eq(10);
        chai.expect(children[2].getX()).to.eq(0);
        chai.expect(children[0].getWidth()).to.eq(25);
        chai.expect(children[1].getWidth()).to.eq(50);
        chai.expect(children[2].getWidth()).to.eq(60);
    });

    it('Vertical - Cross Axis - Center Alignment', async () => {
        let group = new LayoutCol(ALIGNMENT.START, ALIGNMENT.CENTER, settings);

        group.addContainer(elementBuilder.buildElement({width: 25, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 60, height: 50, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        chai.expect(children[0].getX()).to.eq(17.5);
        chai.expect(children[1].getX()).to.eq(5);
        chai.expect(children[2].getX()).to.eq(0);
        chai.expect(children[0].getWidth()).to.eq(25);
        chai.expect(children[1].getWidth()).to.eq(50);
        chai.expect(children[2].getWidth()).to.eq(60);
    });

    it('Vertical - Cross Axis - Space Between Alignment', async () => {
        let group = new LayoutCol(ALIGNMENT.START, ALIGNMENT.EXPANDED, settings);

        group.addContainer(elementBuilder.buildElement({width: 25, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 60, height: 50, x: 0, y: 0}));

        group.setMaximumMainLength(500);

        const children = group.getChildren();

        chai.expect(children[0].getX()).to.eq(0);
        chai.expect(children[1].getX()).to.eq(0);
        chai.expect(children[2].getX()).to.eq(0);
        chai.expect(children[0].getWidth()).to.eq(group.getCrossLength());
        chai.expect(children[1].getWidth()).to.eq(group.getCrossLength());
        chai.expect(children[2].getWidth()).to.eq(group.getCrossLength());
    });

    it('Horizontal - Row Resizing - Elements Adjust to the Size', async () => {
        let group = new LayoutRow(ALIGNMENT.EXPANDED, ALIGNMENT.EXPANDED, settings);

        group.addContainer(elementBuilder.buildElement({width: 50, height: 25, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 50, x: 0, y: 0}));
        group.addContainer(elementBuilder.buildElement({width: 50, height: 60, x: 0, y: 0}));

        group.setWidth(410);
        group.setHeight(100);

        const children = group.getChildren();

        chai.expect(children[0].getX()).to.eq(0);
        chai.expect(children[1].getX()).to.eq(135);
        chai.expect(children[2].getX()).to.eq(270);
        chai.expect(children[0].getHeight()).to.eq(group.getCrossLength());
        chai.expect(children[1].getHeight()).to.eq(group.getCrossLength());
        chai.expect(children[2].getHeight()).to.eq(group.getCrossLength());
        chai.expect(group.getHeight()).to.eq(100);
        chai.expect(group.getWidth()).to.eq(410);
    });

    it('Horizontal - Row Resizing - After Insert Cols', async () => {
        let row1 = new LayoutRow(ALIGNMENT.EXPANDED, ALIGNMENT.EXPANDED, settings);
        let col1 = new LayoutCol(ALIGNMENT.EXPANDED, ALIGNMENT.EXPANDED, settings);
        let col2 = new LayoutCol(ALIGNMENT.EXPANDED, ALIGNMENT.EXPANDED, settings);

        col1.addContainer(elementBuilder.buildElement({width: 50, height: 25, x: 0, y: 0}));
        col1.addContainer(elementBuilder.buildElement({width: 60, height: 50, x: 0, y: 0}));
        col2.addContainer(elementBuilder.buildElement({width: 25, height: 60, x: 0, y: 0}));

        row1.addContainer(col1);
        row1.addContainer(col2);

        const cols = row1.getChildren();
        const col1Children = cols[0].getChildren();
        const col2Children = cols[1].getChildren();

        chai.expect(row1.getHeight()).to.eq(100);
        chai.expect(row1.getWidth()).to.eq(120);
        chai.expect(col1Children[0].getWidth()).to.eq(col1.getCrossLength());
        chai.expect(col1Children[1].getWidth()).to.eq(col1.getCrossLength());
        chai.expect(col2Children[0].getWidth()).to.eq(col2.getCrossLength());
    });

    it('Horizontal - Row Resizing - Imposed Size', async () => {
        let row1 = new LayoutRow(ALIGNMENT.EXPANDED, ALIGNMENT.EXPANDED, settings);
        let col1 = new LayoutCol(ALIGNMENT.EXPANDED, ALIGNMENT.EXPANDED, settings);
        let col2 = new LayoutCol(ALIGNMENT.EXPANDED, ALIGNMENT.EXPANDED, settings);

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

        chai.expect(col1Children[0].getY()).to.eq(0);
        chai.expect(col1Children[1].getY()).to.eq(55);
        chai.expect(col2Children[0].getY()).to.eq(0);
        chai.expect(col1Children[0].getHeight()).to.eq(50);
        chai.expect(col1Children[1].getHeight()).to.eq(50);
        chai.expect(col2Children[0].getHeight()).to.eq(105);
        chai.expect(col1Children[0].getWidth()).to.eq(col1.getCrossLength());
        chai.expect(col1Children[1].getWidth()).to.eq(col1.getCrossLength());
        chai.expect(col2Children[0].getWidth()).to.eq(col2.getCrossLength());
        chai.expect(row1.getHeight()).to.eq(125);
        chai.expect(row1.getWidth()).to.eq(200);
    });

    it('Horizontal and Vertical - Simple Resizing', async () => {
        const layoutSettings = new SmartViewSettings(
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

        const row1 = director.newRow(ALIGNMENT.EXPANDED, ALIGNMENT.EXPANDED, true);
        const col1 = director.newCol(ALIGNMENT.START, ALIGNMENT.EXPANDED, true);
        director.addMediumElementToCurrent("A", "T", false);
        director.navigateToParent();
        const col2 = director.newCol(ALIGNMENT.START, ALIGNMENT.EXPANDED, true);
        director.addMediumElementToCurrent("A", "T", false);

        chai.expect(row1.children.length).eql(2);
        chai.expect(col1.children.length).eql(1);
        chai.expect(col2.children.length).eql(1);
        chai.expect(col1.getWidth()).eql(15);
        chai.expect(col1.getHeight()).eql(5);
        chai.expect(col2.getWidth()).eql(15);
        chai.expect(col2.getHeight()).eql(5);
        chai.expect(row1.getWidth()).eql(32);
        chai.expect(row1.getHeight()).eql(5);
    });

    it('Horizontal and Vertical - Mixed Elements Resizing', async () => {
        const layoutSettings = new SmartViewSettings(
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

        const row1 = director.newRow(ALIGNMENT.EXPANDED, ALIGNMENT.EXPANDED, true);
        const col1 = director.newCol(ALIGNMENT.START, ALIGNMENT.EXPANDED, true);
        const row2 = director.newRow(ALIGNMENT.EXPANDED, ALIGNMENT.EXPANDED, true);
        const col2 = director.newCol(ALIGNMENT.START, ALIGNMENT.EXPANDED, true);
        director.addMediumElementToCurrent("B", "T", false);
        director.navigateToParent();
        director.navigateToParent();
        director.addMediumElementToCurrent("A", "T", false);

        chai.expect(row1.children.length).eql(1);
        chai.expect(col1.children.length).eql(2);
        chai.expect(row2.children.length).eql(1);
        chai.expect(col2.children.length).eql(1);
        chai.expect(col1.getWidth()).eql(15);
        chai.expect(col1.getHeight()).eql(12);
        chai.expect(row2.getWidth()).eql(15);
        chai.expect(row2.getHeight()).eql(5);
        chai.expect(col2.getWidth()).eql(15);
        chai.expect(col2.getHeight()).eql(5);
        chai.expect(row1.getWidth()).eql(15);
        chai.expect(row1.getHeight()).eql(12);
    });

    it('Horizontal - Insertion Resize (Global Distribution)', async () => {
        const set = new LayoutSet(settings);

        const row1 = set.newRow(ALIGNMENT.START, ALIGNMENT.EXPANDED);
        const col1 = set.newCol(ALIGNMENT.START, ALIGNMENT.EXPANDED);
        const row2 = set.newRow(ALIGNMENT.START, ALIGNMENT.EXPANDED);
        const el1 = elementBuilder.buildElement({width: 50, height: 30, x: 0, y: 0});
        const el2 = elementBuilder.buildElement({width: 75, height: 35, x: 0, y: 0});

        set.addToCurrentGroup(el1);
        set.addToCurrentGroup(el2);
        set.navigateToParent();

        const row3 = set.newRow(ALIGNMENT.START, ALIGNMENT.EXPANDED);
        const el3 = elementBuilder.buildElement({width: 60, height: 50, x: 0, y: 0});

        set.addToCurrentGroup(el3);
        set.navigateToParent();
        set.navigateToParent();

        const col2 = set.newCol(ALIGNMENT.START, ALIGNMENT.EXPANDED);
        const row4 = set.newRow(ALIGNMENT.START, ALIGNMENT.EXPANDED);
        const el4 = elementBuilder.buildElement({width: 100, height: 60, x: 0, y: 0});

        set.addToCurrentGroup(el4);

        chai.expect(row2.getHeight()).to.eq(45);
        chai.expect(row2.getWidth()).to.eq(140);
        chai.expect(row3.getHeight()).to.eq(60);
        chai.expect(row3.getWidth()).to.eq(140);
        chai.expect(col1.getHeight()).to.eq(120);
        chai.expect(col1.getWidth()).to.eq(150);
        chai.expect(row4.getHeight()).to.eq(70);
        chai.expect(row4.getWidth()).to.eq(110);
        chai.expect(col2.getHeight()).to.eq(120);
        chai.expect(col2.getWidth()).to.eq(120);
        chai.expect(row1.getHeight()).to.eq(130);
        chai.expect(row1.getWidth()).to.eq(285);
        chai.expect(el1.getHeight()).to.eq(35);
        chai.expect(el1.getWidth()).to.eq(50);
        chai.expect(el2.getHeight()).to.eq(35);
        chai.expect(el2.getWidth()).to.eq(75);
        chai.expect(el3.getHeight()).to.eq(50);
        chai.expect(el3.getWidth()).to.eq(60);
        chai.expect(el4.getHeight()).to.eq(60);
        chai.expect(el4.getWidth()).to.eq(100);

        chai.expect(el1.getX()).to.eq(0);
        chai.expect(el1.getY()).to.eq(0);
        chai.expect(el2.getX()).to.eq(55);
        chai.expect(el2.getY()).to.eq(0);
        chai.expect(el3.getX()).to.eq(0);
        chai.expect(el3.getY()).to.eq(0);
        chai.expect(el4.getX()).to.eq(0);
        chai.expect(el4.getY()).to.eq(0);
    });

    it('Global Position - Absolute Positioning Calculation', async () => {
        const set = new LayoutSet(settings);
        set.newRow(ALIGNMENT.START, ALIGNMENT.START, true);
        const col1 = set.newCol(ALIGNMENT.START, ALIGNMENT.START, false);

        set.addToCurrentGroup(elementBuilder.buildElement({width: 50, height: 25, x: 0, y: 0}));
        set.addToCurrentGroup(elementBuilder.buildElement({width: 60, height: 50, x: 0, y: 0}));

        set.navigateToParent();
        const col2 = set.newCol(ALIGNMENT.START, ALIGNMENT.START, false);

        set.addToCurrentGroup(elementBuilder.buildElement({width: 25, height: 60, x: 0, y: 0}));
        set.addToCurrentGroup(elementBuilder.buildElement({width: 50, height: 40, x: 0, y: 0}));

        set.navigateToParent();
        const col3 = set.newVisibleCol("el1", "t1", ALIGNMENT.START, ALIGNMENT.START, true);

        set.addToCurrentGroup(elementBuilder.buildElement({width: 20, height: 20, x: 0, y: 0}));
        set.addToCurrentGroup(elementBuilder.buildElement({width: 30, height: 50, x: 0, y: 0}));

        set.navigateToParent();
        const col4 = set.newVisibleCol("el2", "t2", ALIGNMENT.START, ALIGNMENT.START, false);

        set.addToCurrentGroup(elementBuilder.buildElement({width: 20, height: 20, x: 0, y: 0}));
        set.addToCurrentGroup(elementBuilder.buildElement({width: 30, height: 50, x: 0, y: 0}));

        set.toAbsolutePosition();

        const col1Children = col1.getChildren();
        const col2Children = col2.getChildren();
        const col3Children = col3.getChildren();
        const col4Children = col4.getChildren();

        chai.expect(col1.getX()).to.eq(0);
        chai.expect(col1.getY()).to.eq(0);
        chai.expect(col1Children[0].getX()).to.eq(5);
        chai.expect(col1Children[0].getY()).to.eq(5);
        chai.expect(col1Children[1].getX()).to.eq(5);
        chai.expect(col1Children[1].getY()).to.eq(35);
        chai.expect(col2.getX()).to.eq(75);
        chai.expect(col2.getY()).to.eq(0);
        chai.expect(col2Children[0].getX()).to.eq(80);
        chai.expect(col2Children[0].getY()).to.eq(5);
        chai.expect(col2Children[1].getX()).to.eq(80);
        chai.expect(col2Children[1].getY()).to.eq(70);
        chai.expect(col3.getX()).to.eq(140);
        chai.expect(col3.getY()).to.eq(0);
        chai.expect(col3Children[0].getX()).to.eq(185);
        chai.expect(col3Children[0].getY()).to.eq(5);
        chai.expect(col3Children[1].getX()).to.eq(185);
        chai.expect(col3Children[1].getY()).to.eq(30);
        chai.expect(col4.getX()).to.eq(225);
        chai.expect(col4.getY()).to.eq(0);
        chai.expect(col4Children[0].getX()).to.eq(230);
        chai.expect(col4Children[0].getY()).to.eq(25);
        chai.expect(col4Children[1].getX()).to.eq(230);
        chai.expect(col4Children[1].getY()).to.eq(50);
    });

    it('Complex View Construction - Long Hierarchical Chain', async () => {
        const layoutSettings = new SmartViewSettings(
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

        const rowA1 = director.newRow(ALIGNMENT.EXPANDED, ALIGNMENT.EXPANDED, true);
        const colA1 = director.newCol(ALIGNMENT.START, ALIGNMENT.EXPANDED, true);
        const rowA2 = director.newRow(ALIGNMENT.EXPANDED, ALIGNMENT.EXPANDED, true);
        const colB1 = director.newCol(ALIGNMENT.START, ALIGNMENT.EXPANDED, true);
        const rowB1 = director.newRow(ALIGNMENT.EXPANDED, ALIGNMENT.EXPANDED, true);
        const colB2 = director.newCol(ALIGNMENT.START, ALIGNMENT.EXPANDED, true);
        const rowB2 = director.newRow(ALIGNMENT.EXPANDED, ALIGNMENT.EXPANDED, true);
        director.addMediumElementToCurrent("B1-1", "T", false);
        director.navigateToParent();
        director.addMediumElementToCurrent("B1", "T", false);
        director.navigateToParent();
        const colB3 = director.newCol(ALIGNMENT.START, ALIGNMENT.EXPANDED, true);
        const rowB3 = director.newRow(ALIGNMENT.EXPANDED, ALIGNMENT.EXPANDED, true);
        director.addMediumElementToCurrent("B2-1", "T", false);
        director.navigateToParent();
        director.addMediumElementToCurrent("B2", "T", false);
        director.navigateToParent(2);
        director.addMediumElementToCurrent("B", "T", false);
        director.navigateToParent();
        const colC1 = director.newCol(ALIGNMENT.START, ALIGNMENT.EXPANDED, true);
        const rowC1 = director.newRow(ALIGNMENT.EXPANDED, ALIGNMENT.EXPANDED, true);
        director.addMediumElementToCurrent("C1", "T", false);
        director.navigateToParent();
        director.addMediumElementToCurrent("C", "T", false);
        director.navigateToParent(2);
        director.addMediumElementToCurrent("A", "T", false);

        director.toAbsolutePosition();

        chai.expect(rowA1.children.length).eql(1);
        chai.expect(colA1.children.length).eql(2);
        chai.expect(colA1.children[1].getName()).eql("A");
        chai.expect(colA1.children[1].getWidth()).eql(66);
        chai.expect(colA1.children[1].getHeight()).eql(5);
        chai.expect(colA1.getSubTreeCounting()).eql(7);
        chai.expect(rowA2.children.length).eql(2);
        chai.expect(colB1.children.length).eql(2);
        chai.expect(colB1.children[1].getName()).eql("B");
        chai.expect(colB1.children[1].getWidth()).eql(32);
        chai.expect(colB1.children[1].getHeight()).eql(5);
        chai.expect(colB1.getSubTreeCounting()).eql(4);
        chai.expect(rowB1.children.length).eql(2);
        chai.expect(colB2.children.length).eql(2);
        chai.expect(colB2.children[1].getName()).eql("B1");
        chai.expect(colB2.children[1].getWidth()).eql(15);
        chai.expect(colB2.children[1].getHeight()).eql(5);
        chai.expect(colB2.getSubTreeCounting()).eql(1);
        chai.expect(rowB2.children.length).eql(1);
        chai.expect(rowB2.children[0].getName()).eql("B1-1");
        chai.expect(rowB2.children[0].getWidth()).eql(15);
        chai.expect(rowB2.children[0].getHeight()).eql(5);
        chai.expect(rowB2.getSubTreeCounting()).eql(0);
        chai.expect(colB3.children.length).eql(2);
        chai.expect(colB3.children[1].getName()).eql("B2");
        chai.expect(colB3.children[1].getWidth()).eql(15);
        chai.expect(colB3.children[1].getHeight()).eql(5);
        chai.expect(colB3.getSubTreeCounting()).eql(1);
        chai.expect(rowB3.children.length).eql(1);
        chai.expect(rowB3.children[0].getName()).eql("B2-1");
        chai.expect(rowB3.children[0].getWidth()).eql(15);
        chai.expect(rowB3.children[0].getHeight()).eql(5);
        chai.expect(rowB3.getSubTreeCounting()).eql(0);
        chai.expect(colC1.children.length).eql(2);
        chai.expect(colC1.children[1].getName()).eql("C");
        chai.expect(colC1.children[1].getWidth()).eql(32);
        chai.expect(colC1.children[1].getHeight()).eql(5);
        chai.expect(colC1.getSubTreeCounting()).eql(1);
        chai.expect(rowC1.children.length).eql(1);
        chai.expect(rowC1.children[0].getName()).eql("C1");
        chai.expect(rowC1.children[0].getWidth()).eql(32);
        chai.expect(rowC1.children[0].getHeight()).eql(5);
        chai.expect(rowC1.getSubTreeCounting()).eql(0);
    });

    it('Complex View Construction - Long Nested Chain', async () => {
        const layoutSettings = new SmartViewSettings(
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

        const rowA1 = director.newRow(ALIGNMENT.EXPANDED, ALIGNMENT.EXPANDED, true);
        const A = director.newVisibleRow("A", "T", ALIGNMENT.START, ALIGNMENT.EXPANDED, false);
        const B = director.newVisibleRow("B", "T", ALIGNMENT.START, ALIGNMENT.EXPANDED, false);
        const B1 = director.newVisibleRow("B1", "T", ALIGNMENT.START, ALIGNMENT.EXPANDED, false);
        const B11 = director.addMediumElementToCurrent("B1-1", "T", false);

        director.navigateToParent(1);

        const B2 = director.newVisibleRow("B2", "T", ALIGNMENT.START, ALIGNMENT.EXPANDED, false);
        const B21 = director.addMediumElementToCurrent("B2-1", "T", false);

        director.navigateToParent(2);

        const C = director.newVisibleRow("C", "T", ALIGNMENT.START, ALIGNMENT.EXPANDED, false);
        const C1 = director.addMediumElementToCurrent("C1", "T", false);

        director.toAbsolutePosition();

        chai.expect(A).not.undefined;
        chai.expect(B).not.undefined;
        chai.expect(B1).not.undefined;
        chai.expect(B11).not.undefined;
        chai.expect(B2).not.undefined;
        chai.expect(B21).not.undefined;
        chai.expect(C).not.undefined;
        chai.expect(C1).not.undefined;

        chai.expect(B11.getWidth()).eql(15);
        chai.expect(B11.getHeight()).eql(5);
        chai.expect(B11.getX()).eql(3);
        chai.expect(B11.getY()).eql(12);

        chai.expect(B1.getWidth()).eql(17);
        chai.expect(B1.getHeight()).eql(10);
        chai.expect(B1.getX()).eql(2);
        chai.expect(B1.getY()).eql(8);

        chai.expect(B21.getWidth()).eql(15);
        chai.expect(B21.getHeight()).eql(5)
        chai.expect(B21.getX()).eql(22);
        chai.expect(B21.getY()).eql(12);

        chai.expect(B2.getWidth()).eql(17);
        chai.expect(B2.getHeight()).eql(10);
        chai.expect(B2.getX()).eql(21);
        chai.expect(B2.getY()).eql(8);

        chai.expect(B.getWidth()).eql(38);
        chai.expect(B.getHeight()).eql(15);
        chai.expect(B.getX()).eql(1);
        chai.expect(B.getY()).eql(4);

        chai.expect(C1.getWidth()).eql(15);
        chai.expect(C1.getHeight()).eql(10);
        chai.expect(C1.getX()).eql(42);
        chai.expect(C1.getY()).eql(8);

        chai.expect(C.getWidth()).eql(17);
        chai.expect(C.getHeight()).eql(15);
        chai.expect(C.getX()).eql(41);
        chai.expect(C.getY()).eql(4);

        chai.expect(A.getWidth()).eql(59);
        chai.expect(A.getHeight()).eql(20);
        chai.expect(A.getX()).eql(0);
        chai.expect(A.getY()).eql(0);
    });

    it('Export to View', async () => {
        const director = new LayoutDirector(settings);
        director.newRow(ALIGNMENT.START, ALIGNMENT.START, true);
        director.newCol(ALIGNMENT.START, ALIGNMENT.START, false);

        director.addToCurrentGroup(elementBuilder.buildElement({width: 50, height: 25, x: 0, y: 0}));
        director.addToCurrentGroup(elementBuilder.buildElement({width: 60, height: 50, x: 0, y: 0}));

        director.navigateToParent();
        director.newCol(ALIGNMENT.START, ALIGNMENT.START, false);

        director.addToCurrentGroup(elementBuilder.buildElement({width: 25, height: 60, x: 0, y: 0}));
        director.addToCurrentGroup(elementBuilder.buildElement({width: 50, height: 40, x: 0, y: 0}));

        director.toAbsolutePosition();

        const view = director.convertToView("Test");
        const viewNodes = view.getViewNodes();

        chai.expect(viewNodes[0].x).to.eq(5);
        chai.expect(viewNodes[0].y).to.eq(5);
        chai.expect(viewNodes[1].x).to.eq(5);
        chai.expect(viewNodes[1].y).to.eq(35);
        chai.expect(viewNodes[2].x).to.eq(80);
        chai.expect(viewNodes[2].y).to.eq(5);
        chai.expect(viewNodes[3].x).to.eq(80);
        chai.expect(viewNodes[3].y).to.eq(70);
    });
});
