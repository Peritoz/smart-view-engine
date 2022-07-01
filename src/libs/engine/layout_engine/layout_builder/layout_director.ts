import { VisibleLayoutRow } from "@libs/engine/layout_engine/layout_builder/visible_layout_row";
import { VisibleLayoutCol } from "@libs/engine/layout_engine/layout_builder/visible_layout_col";
import { BaseElement } from "@libs/model/base_element";
import { LayoutGroup } from "@libs/engine/layout_engine/layout_builder/layout_group";
import { Settings } from "@libs/engine/layout_engine/settings";
import { LayoutTree } from "@libs/engine/layout_engine/layout_builder/layout_tree";
import { HydratedView } from "@libs/model/hydrated_view";
import { ElementBuilder } from "@libs/engine/layout_engine/layout_builder/element_builder";
import { Alignment } from "@libs/common/alignment.enum";

export class LayoutDirector {
  private settings: Settings;
  private builder: ElementBuilder;
  private layoutSet: LayoutTree;

  constructor(settings: Settings) {
    this.settings = settings;
    this.builder = new ElementBuilder(settings.sizeUnit);
    this.layoutSet = new LayoutTree(settings);
  }

  private extractToView(
    view: HydratedView,
    container: BaseElement | LayoutGroup
  ) {
    const isNestedElement =
      container instanceof VisibleLayoutRow ||
      container instanceof VisibleLayoutCol;
    const isBaseElement = container instanceof BaseElement;
    const externalId = container.getExternalId();

    if (isNestedElement || isBaseElement) {
      view.addViewNode(
        view.createViewNode(
          externalId || container.getId(),
          container.getId(),
          container.getName(),
          container.getType(),
          container.getX(),
          container.getY(),
          isBaseElement ? container.getParentId() : null,
          container.getWidth(),
          container.getHeight()
        )
      );
    }

    if (container instanceof LayoutGroup) {
      for (let i = 0; i < container.getChildrenLength(); i++) {
        const child = container.getChildAtIndex(i);

        if (child) {
          this.extractToView(view, child);
        }
      }
    }
  }

  convertToView(viewName: string, viewId: string) {
    const view = new HydratedView(viewId || viewName, viewName);

    this.extractToView(view, this.layoutSet.getRoot());

    return view;
  }

  newRow(
    horizontalAlignment: Alignment,
    verticalAlignment: Alignment,
    externalId: string | null = null
  ) {
    return this.layoutSet.newRow(
      horizontalAlignment,
      verticalAlignment,
      externalId
    );
  }

  newCol(
    horizontalAlignment: Alignment,
    verticalAlignment: Alignment,
    externalId: string | null = null
  ) {
    return this.layoutSet.newCol(
      horizontalAlignment,
      verticalAlignment,
      externalId
    );
  }

  newVisibleRow(
    name: string,
    type: string,
    horizontalAlignment: Alignment,
    verticalAlignment: Alignment,
    lateralLabel: boolean,
    externalId: string | null = null
  ): LayoutGroup {
    return this.layoutSet.newVisibleRow(
      name,
      type,
      horizontalAlignment,
      verticalAlignment,
      lateralLabel,
      externalId
    );
  }

  newVisibleCol(
    name: string,
    type: string,
    horizontalAlignment: Alignment,
    verticalAlignment: Alignment,
    lateralLabel: boolean,
    externalId: string | null = null
  ): LayoutGroup {
    return this.layoutSet.newVisibleCol(
      name,
      type,
      horizontalAlignment,
      verticalAlignment,
      lateralLabel,
      externalId
    );
  }

  addToCurrentGroup(container: BaseElement | LayoutGroup) {
    this.layoutSet.addToCurrentGroup(container);
  }

  newTinyElementToCurrent(
    name: string,
    type: string,
    externalId?: string
  ): BaseElement {
    const element = this.builder.buildTinyElement(name, type, externalId);
    this.addToCurrentGroup(element);
    return element;
  }

  newSmallElementToCurrent(
    name: string,
    type: string,
    verticalOrientation: boolean = false,
    externalId?: string
  ): BaseElement {
    const element = this.builder.buildSmallElement(
      name,
      type,
      verticalOrientation,
      externalId
    );
    this.addToCurrentGroup(element);
    return element;
  }

  newMediumElementToCurrent(
    name: string,
    type: string,
    verticalOrientation: boolean = false,
    externalId?: string
  ): BaseElement {
    const element = this.builder.buildMediumElement(
      name,
      type,
      verticalOrientation,
      externalId
    );
    this.addToCurrentGroup(element);
    return element;
  }

  newBigElementToCurrent(
    name: string,
    type: string,
    verticalOrientation: boolean = false,
    externalId?: string
  ): BaseElement {
    const element = this.builder.buildBigElement(
      name,
      type,
      verticalOrientation,
      externalId
    );
    this.addToCurrentGroup(element);
    return element;
  }

  navigateToParent(jumpsUpward: number = 1) {
    for (let i = 0; i < jumpsUpward; i++) {
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
