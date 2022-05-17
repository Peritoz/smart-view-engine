// @ts-nocheck
import {LayoutDirector} from "../../../src/libs/engine/layout_engine/layout_builder/layout_director";
import {Settings} from "../../../src/libs/engine/layout_engine/settings";
import {Alignment} from "../../../src/libs/common/alignment.enum";
import {ElementBuilder} from "../../../src/libs/engine/layout_engine/layout_builder/element_builder";

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
