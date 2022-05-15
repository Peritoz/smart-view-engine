// @ts-nocheck
import {LayoutDirector} from "../../src/libs/engine/layout_engine/layout_builder/layout_director";
import {Settings} from "../../src/libs/engine/layout_engine/settings";
import {Alignment} from "../../src/libs/common/alignment.enum";
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

describe('Complex Rendering', () => {
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
