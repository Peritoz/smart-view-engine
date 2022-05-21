import { VisibleLayoutRow } from "@libs/engine/layout_engine/layout_builder/visible_layout_row";
import { VisibleLayoutCol } from "@libs/engine/layout_engine/layout_builder/visible_layout_col";
import { BaseElement } from "@libs/model/base_element";
import { LayoutElementGroup } from "@libs/engine/layout_engine/layout_builder/layout_element_group";
import { Settings } from "@libs/engine/layout_engine/settings";
import { LayoutSet } from "@libs/engine/layout_engine/layout_builder/layout_set";
import { HydratedView } from "@libs/model/hydrated_view";
import { ElementBuilder } from "@libs/engine/layout_engine/layout_builder/element_builder";
import { Alignment } from "@libs/common/alignment.enum";

function extractToView(
  view: HydratedView,
  container: BaseElement | LayoutElementGroup
) {
  const isNestedElement =
    container instanceof VisibleLayoutRow ||
    container instanceof VisibleLayoutCol;

  if (isNestedElement || container instanceof BaseElement) {
    view.addViewNode(
      view.createViewNode(
        container.getId(),
        container.getId(),
        container.getName(),
        container.getType(),
        container.getX(),
        container.getY(),
        container.getParentId(),
        container.getWidth(),
        container.getHeight()
      )
    );
  }

  if (container instanceof LayoutElementGroup) {
    for (let i = 0; i < container.getChildrenLength(); i++) {
      const child = container.getChildAtIndex(i);

      extractToView(view, child);
    }
  }
}

export class LayoutDirector {
  private settings: Settings;
  private builder: ElementBuilder;
  private layoutSet: LayoutSet;

  constructor(settings: Settings) {
    this.settings = settings;
    this.builder = new ElementBuilder(settings);
    this.layoutSet = new LayoutSet(settings);
  }

  convertToView(viewName: string, viewId: string) {
    const view = new HydratedView(viewId || viewName, viewName);

    extractToView(view, this.layoutSet.getLayoutSet());

    return view;
  }

  newRow(
    mainAxisAlignment: Alignment,
    crossAxisAlignment: Alignment,
    withoutMargin: boolean
  ) {
    return this.layoutSet.newRow(
      mainAxisAlignment,
      crossAxisAlignment,
      withoutMargin
    );
  }

  newCol(
    mainAxisAlignment: Alignment,
    crossAxisAlignment: Alignment,
    withoutMargin: boolean
  ) {
    return this.layoutSet.newCol(
      mainAxisAlignment,
      crossAxisAlignment,
      withoutMargin
    );
  }

  newVisibleRow(
    name: string,
    type: string,
    mainAxisAlignment: Alignment,
    crossAxisAlignment: Alignment,
    lateralLabel: boolean
  ) {
    return this.layoutSet.newVisibleRow(
      name,
      type,
      mainAxisAlignment,
      crossAxisAlignment,
      lateralLabel
    );
  }

  newVisibleCol(
    name: string,
    type: string,
    mainAxisAlignment: Alignment,
    crossAxisAlignment: Alignment,
    lateralLabel: boolean
  ) {
    return this.layoutSet.newVisibleCol(
      name,
      type,
      mainAxisAlignment,
      crossAxisAlignment,
      lateralLabel
    );
  }

  addToCurrentGroup(container: BaseElement | LayoutElementGroup) {
    this.layoutSet.addToCurrentGroup(container);
  }

  addTinyElementToCurrent(name: string, type: string) {
    const element = this.builder.buildTinyElement(name, type);
    this.addToCurrentGroup(element);
    return element;
  }

  addSmallElementToCurrent(
    name: string,
    type: string,
    verticalOrientation: boolean = false
  ) {
    const element = this.builder.buildSmallElement(
      name,
      type,
      verticalOrientation
    );
    this.addToCurrentGroup(element);
    return element;
  }

  addMediumElementToCurrent(
    name: string,
    type: string,
    verticalOrientation: boolean = false
  ) {
    const element = this.builder.buildMediumElement(
      name,
      type,
      verticalOrientation
    );
    this.addToCurrentGroup(element);
    return element;
  }

  addBigElementToCurrent(
    name: string,
    type: string,
    verticalOrientation: boolean = false
  ) {
    const element = this.builder.buildBigElement(
      name,
      type,
      verticalOrientation
    );
    this.addToCurrentGroup(element);
    return element;
  }

  navigateToParent(jumpsUpward: number | undefined) {
    const hoops: number = jumpsUpward ? jumpsUpward : 1;

    for (let i = 0; i < hoops; i++) {
      this.layoutSet.navigateToParent();
    }
  }

  toAbsolutePosition() {
    this.layoutSet.toAbsolutePosition();
  }

  getPageWidth() {
    return this.layoutSet.getPageWidth();
  }

  getPageHeight() {
    return this.layoutSet.getPageHeight();
  }
}
