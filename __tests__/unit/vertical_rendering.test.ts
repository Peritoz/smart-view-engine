// @ts-nocheck
import {Settings} from "../../src/libs/engine/layout_engine/settings";
import {Alignment} from "../../src/libs/common/alignment.enum";
import {LayoutCol} from "../../src/libs/engine/layout_engine/layout_builder/layout_col";
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

describe('Vertical Rendering', () => {
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
});
