import {PlotCursor} from "../../src/libs/layout_engine/plot_cursor";

describe('Plot Cursor Rendering', () => {
    describe('Position Plotting - Sequential - Default Settings', () => {
        it('Initial element plotting', done => {
            const plot = new PlotCursor(0, 0, 100, 100);

            const pos = plot.calculatePosition({width: 20, height: 10});

            expect(pos).toMatchObject({x: 5, y: 5});

            done();
        });

        it('Simple row plotting', done => {
            const plot = new PlotCursor(0, 0, 100, 100);

            plot.calculatePosition({width: 20, height: 10});
            plot.calculatePosition({width: 20, height: 10});
            const pos = plot.calculatePosition({width: 20, height: 10});

            expect(pos).toMatchObject({x: 65, y: 5});

            done();
        });

        it('Break line', done => {
            const plot = new PlotCursor(0, 0, 100, 100);

            plot.calculatePosition({width: 20, height: 10});
            plot.calculatePosition({width: 20, height: 10});
            plot.calculatePosition({width: 20, height: 10});
            plot.calculatePosition({width: 20, height: 10});
            const pos = plot.calculatePosition({width: 20, height: 10});

            expect(pos).toMatchObject({x: 35, y: 25});

            done();
        });

        it('Blocks with different width and many lines', done => {
            const plot = new PlotCursor(0, 0, 100, 100);

            plot.calculatePosition({width: 45, height: 10});
            plot.calculatePosition({width: 20, height: 10});
            plot.calculatePosition({width: 10, height: 10});
            plot.calculatePosition({width: 10, height: 10});
            plot.calculatePosition({width: 20, height: 10});
            plot.calculatePosition({width: 10, height: 10});
            plot.calculatePosition({width: 60, height: 10});
            plot.calculatePosition({width: 20, height: 10});
            const pos = plot.calculatePosition({width: 20, height: 10});

            expect(pos).toMatchObject({x: 5, y: 65});

            done();
        });

        it('Blocks with different width and height, and many lines', done => {
            const plot = new PlotCursor(0, 0, 100, 100);

            plot.calculatePosition({width: 45, height: 15});
            plot.calculatePosition({width: 30, height: 10});
            plot.calculatePosition({width: 10, height: 10});
            plot.calculatePosition({width: 10, height: 5});
            plot.calculatePosition({width: 20, height: 10});
            plot.calculatePosition({width: 10, height: 10});
            plot.calculatePosition({width: 30, height: 10});
            plot.calculatePosition({width: 40, height: 20});
            const pos = plot.calculatePosition({width: 20, height: 10});

            expect(pos).toMatchObject({x: 5, y: 80});

            done();
        });
    });

    describe('Position Plotting - Sequential - Custom Settings', () => {
        const settings = {
            leftPadding: 0,
            rightPadding: 0,
            topPadding: 0,
            bottomPadding: 0
        };

        it('Initial element plotting', done => {
            const plot = new PlotCursor(0, 0, 100, 100, settings);

            const pos = plot.calculatePosition({width: 20, height: 10});

            expect(pos).toMatchObject({x: 0, y: 0});

            done();
        });

        it('Simple row plotting', done => {
            const plot = new PlotCursor(0, 0, 100, 100, settings);

            plot.calculatePosition({width: 20, height: 10});
            plot.calculatePosition({width: 20, height: 10});
            const pos = plot.calculatePosition({width: 20, height: 10});

            expect(pos).toMatchObject({x: 40, y: 0});

            done();
        });

        it('Break line', done => {
            const plot = new PlotCursor(0, 0, 100, 100, settings);

            plot.calculatePosition({width: 20, height: 10});
            plot.calculatePosition({width: 20, height: 10});
            plot.calculatePosition({width: 20, height: 10});
            plot.calculatePosition({width: 20, height: 10});
            const pos = plot.calculatePosition({width: 20, height: 10});

            expect(pos).toMatchObject({x: 80, y: 0});

            done();
        });

        it('Blocks with different width and many lines', done => {
            const plot = new PlotCursor(0, 0, 100, 100, settings);

            plot.calculatePosition({width: 45, height: 10});
            plot.calculatePosition({width: 20, height: 10});
            plot.calculatePosition({width: 10, height: 10});
            plot.calculatePosition({width: 10, height: 10});
            plot.calculatePosition({width: 20, height: 10});
            plot.calculatePosition({width: 10, height: 10});
            plot.calculatePosition({width: 60, height: 10});
            plot.calculatePosition({width: 20, height: 10});
            const pos = plot.calculatePosition({width: 20, height: 10});

            expect(pos).toMatchObject({x: 20, y: 20});

            done();
        });

        it('Blocks with different width and height, and many lines', done => {
            const plot = new PlotCursor(0, 0, 100, 100, settings);

            plot.calculatePosition({width: 45, height: 15});
            plot.calculatePosition({width: 30, height: 10});
            plot.calculatePosition({width: 10, height: 10});
            plot.calculatePosition({width: 10, height: 5});
            plot.calculatePosition({width: 20, height: 10});
            plot.calculatePosition({width: 10, height: 10});
            plot.calculatePosition({width: 30, height: 10});
            plot.calculatePosition({width: 40, height: 20});
            const pos = plot.calculatePosition({width: 20, height: 10});

            expect(pos).toMatchObject({x: 0, y: 35});

            done();
        });
    });
});
