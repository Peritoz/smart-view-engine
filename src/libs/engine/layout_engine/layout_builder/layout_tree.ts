import { Settings } from "@libs/engine/layout_engine/settings";
import { LayoutElementGroup } from "@libs/engine/layout_engine/layout_builder/layout_element_group";
import { Alignment } from "@libs/common/alignment.enum";
import { BaseElement } from "@libs/model/base_element";
import { LayoutRow } from "@libs/engine/layout_engine/layout_builder/layout_row";
import { LayoutCol } from "@libs/engine/layout_engine/layout_builder/layout_col";
import { VisibleLayoutCol } from "@libs/engine/layout_engine/layout_builder/visible_layout_col";
import { VisibleLayoutRow } from "@libs/engine/layout_engine/layout_builder/visible_layout_row";

export class LayoutTree {
  protected settings: Settings;
  protected set: LayoutElementGroup | null;
  protected navigationHistory: any[];
  protected containerMap: Map<string, BaseElement | LayoutElementGroup>;

  constructor(settings: Settings) {
    this.settings = settings;
    this.set = null;
    this.navigationHistory = [];
    this.containerMap = new Map();
  }

  /**
   * Initialize a Layout Set, if not yet, with a given Layout Group
   * @param layoutGroup: A valid LayoutElementGroup element (Row, Col, VisibleRow or Visible Col)
   */
  private initializeLayoutSet(layoutGroup: LayoutElementGroup) {
    if (this.set === null) {
      if (
        layoutGroup instanceof LayoutRow ||
        layoutGroup instanceof LayoutCol
      ) {
        this.set = layoutGroup;
      } else {
        throw new Error("LayoutSets can only be initialize with LayoutGroups");
      }
    } else {
      throw new Error("LayoutSet already initialized");
    }
  }

  getLayoutSet(): LayoutElementGroup {
    return this.set!;
  }

  /**
   * Creates a new Element Group based on a builder callback
   * @param buildElement Callback function to build a LayoutElementGroup. It receives the parent id
   * as parameter (which can be null)
   * @returns LayoutElementGroup
   */
  private newElementGroup(
    buildElement: (parentId: string | null) => LayoutElementGroup
  ): LayoutElementGroup {
    const parentLayoutGroup = this.getCurrentLayoutGroup();
    const parentId = parentLayoutGroup ? parentLayoutGroup.getId() : null;
    const elementGroup = buildElement(parentId);
    const currentLayoutGroup = this.getCurrentLayoutGroup();

    if (currentLayoutGroup) {
      currentLayoutGroup.addContainer(elementGroup);
    } else {
      this.initializeLayoutSet(elementGroup);
    }

    this.navigationHistory.push(elementGroup);
    this.containerMap.set(elementGroup.getId(), elementGroup);

    return elementGroup;
  }

  newRow(horizontalAlignment: Alignment, verticalAlignment: Alignment) {
    return this.newElementGroup((parentId: string | null) => {
      return new LayoutRow(
        horizontalAlignment,
        verticalAlignment,
        this.settings
      );
    });
  }

  newCol(horizontalAlignment: Alignment, verticalAlignment: Alignment) {
    return this.newElementGroup((parentId: string | null) => {
      return new LayoutCol(
        horizontalAlignment,
        verticalAlignment,
        this.settings
      );
    });
  }

  newVisibleRow(
    name: string,
    type: string,
    horizontalAlignment: Alignment,
    verticalAlignment: Alignment,
    lateralLabel: boolean
  ) {
    return this.newElementGroup((parentId: string | null) => {
      return new VisibleLayoutRow(
        horizontalAlignment,
        verticalAlignment,
        this.settings,
        name,
        type,
        lateralLabel
      );
    });
  }

  newVisibleCol(
    name: string,
    type: string,
    horizontalAlignment: Alignment,
    verticalAlignment: Alignment,
    lateralLabel: boolean
  ) {
    return this.newElementGroup((parentId: string | null) => {
      return new VisibleLayoutCol(
        horizontalAlignment,
        verticalAlignment,
        this.settings,
        name,
        type,
        lateralLabel
      );
    });
  }

  /**
   * Calculates the absolute position for layout groups that aren't rendered elements (Rows and Cols)
   */
  toAbsolutePosition() {
    this.set!.translatePosition(0, 0);
  }

  getCurrentLayoutGroup() {
    if (this.navigationHistory.length > 0) {
      return this.navigationHistory[this.navigationHistory.length - 1];
    } else {
      return null;
    }
  }

  navigateToParent() {
    if (this.navigationHistory.length > 1) {
      this.navigationHistory.pop();
    }
  }

  addToCurrentGroup(container: BaseElement | LayoutElementGroup) {
    if (this.containerMap.get(container.getId()) === undefined) {
      const layoutGroup = this.getCurrentLayoutGroup();

      layoutGroup.addContainer(container);
      this.containerMap.set(container.getId(), container);

      this.updateSubTreeCountingChain();
    } else {
      throw new Error("It's not possible to insert the same container twice");
    }
  }

  /**
   * Based on the current navigation chain, updates the registered size of the subtree of each group. This
   * consolidation avoids further logic to keep the number of elements below a group
   */
  updateSubTreeCountingChain() {
    for (let i = 0; i < this.navigationHistory.length; i++) {
      const group = this.navigationHistory[i];

      group.incrementSubTreeCounting();
    }
  }

  getPageWidth() {
    return this.set ? this.set.getWidth() : 0;
  }

  getPageHeight() {
    return this.set ? this.set.getHeight() : 0;
  }
}