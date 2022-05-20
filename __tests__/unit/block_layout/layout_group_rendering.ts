import {LayoutDirector} from "../../../src/libs/engine/layout_engine/layout_builder/layout_director";
import {Settings} from "../../../src/libs/engine/layout_engine/settings";
import {Alignment} from "../../../src/libs/common/alignment.enum";
import {DEFAULT} from "../../../src/libs/common/size_reference.const";
import {LayoutSet} from "../../../src/libs/engine/layout_engine/layout_builder/layout_set";
import {ElementBuilder} from "../../../src/libs/engine/layout_engine/layout_builder/element_builder";

const settings = new Settings(
    {
        layoutType: "hierarchy",
        maxHorizontalCount: 4,
        maxChildHorizontalCount: 2,
        spaceBetween: 5,
        leftPadding: 5,
        rightPadding: 5,
        topPadding: 5,
        bottomPadding: 5,
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
});
