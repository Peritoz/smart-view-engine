import { LayoutDirector } from "../../../src/libs/engine/layout_engine/builder/layout_director";
import { Settings } from "../../../src/libs/engine/layout_engine/settings";
import { Alignment } from "../../../src/libs/common/alignment.enum";
import { ElementBuilder } from "../../../src/libs/engine/layout_engine/builder/element_builder";

const settings = new Settings({
  layoutType: "hierarchy",
  maxHorizontalCount: 4,
  maxChildHorizontalCount: 2,
  spaceBetween: 5,
  leftPadding: 5,
  rightPadding: 5,
  topPadding: 5,
  bottomPadding: 5,
  spaceToOuterLabel: 10,
});
const elementBuilder = new ElementBuilder(settings.sizeUnit);

describe("Complex Rendering", () => {
  it("Export to View", async () => {
    const director = new LayoutDirector(settings);
    director.newRow(Alignment.START, Alignment.START);
    director.newCol(Alignment.START, Alignment.START);

    director.addToCurrentGroup(
      elementBuilder.buildElement({
        name: "A",
        width: 50,
        height: 25,
        x: 0,
        y: 0,
      })
    );
    director.addToCurrentGroup(
      elementBuilder.buildElement({
        name: "B",
        width: 60,
        height: 50,
        x: 0,
        y: 0,
      })
    );

    director.navigateToParent();
    director.newCol(Alignment.START, Alignment.START);

    director.addToCurrentGroup(
      elementBuilder.buildElement({
        name: "C",
        width: 25,
        height: 60,
        x: 0,
        y: 0,
      })
    );
    director.addToCurrentGroup(
      elementBuilder.buildElement({
        name: "D",
        width: 50,
        height: 40,
        x: 0,
        y: 0,
      })
    );

    director.toAbsolutePosition();

    const view = director.convertToView("Test", "1");
    const viewNodes = view.getViewNodes();

    expect(viewNodes[0].x).toBe(0);
    expect(viewNodes[0].y).toBe(0);
    expect(viewNodes[1].x).toBe(0);
    expect(viewNodes[1].y).toBe(30);
    expect(viewNodes[2].x).toBe(65);
    expect(viewNodes[2].y).toBe(0);
    expect(viewNodes[3].x).toBe(65);
    expect(viewNodes[3].y).toBe(65);
  });
});
