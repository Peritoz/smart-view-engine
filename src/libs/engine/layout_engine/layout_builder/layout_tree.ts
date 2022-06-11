import { Settings } from "@libs/engine/layout_engine/settings";
import { LayoutGroup } from "@libs/engine/layout_engine/layout_builder/layout_group";
import { Alignment } from "@libs/common/alignment.enum";
import { BaseElement } from "@libs/model/base_element";
import { LayoutRow } from "@libs/engine/layout_engine/layout_builder/layout_row";
import { LayoutCol } from "@libs/engine/layout_engine/layout_builder/layout_col";
import { VisibleLayoutCol } from "@libs/engine/layout_engine/layout_builder/visible_layout_col";
import { VisibleLayoutRow } from "@libs/engine/layout_engine/layout_builder/visible_layout_row";

export class LayoutTree {
  protected settings: Settings;
  protected root: LayoutGroup | null;
  protected plainElements: Array<BaseElement | LayoutGroup>;
  protected containerMap: Map<string, BaseElement | LayoutGroup>;
  protected navigationHistory: any[];

  constructor(settings: Settings) {
    this.settings = settings;
    this.root = null;
    this.plainElements = [];
    this.containerMap = new Map();
    this.navigationHistory = [];
  }

  /**
   * Initialize a Layout Set, if not yet, with a given Layout Group
   * @param layoutGroup: A valid LayoutElementGroup element (Row, Col, VisibleRow or Visible Col)
   */
  private initializeLayoutSet(layoutGroup: LayoutGroup) {
    if (this.root === null) {
      if (
        layoutGroup instanceof LayoutRow ||
        layoutGroup instanceof LayoutCol
      ) {
        this.root = layoutGroup;
      } else {
        throw new Error("LayoutSets can only be initialize with LayoutGroups");
      }
    } else {
      throw new Error("LayoutSet already initialized");
    }
  }

  getRoot(): LayoutGroup {
    return this.root!;
  }

  /**
   * Creates a new Element Group based on a builder callback
   * @param buildElement Callback function to build a LayoutElementGroup. It receives the parent element
   * as parameter
   * @returns LayoutGroup
   */
  private newElementGroup(
    buildElement: (parent: LayoutGroup) => LayoutGroup
  ): LayoutGroup {
    const currentLayoutGroup = this.getCurrentLayoutGroup();
    const elementGroup = buildElement(currentLayoutGroup);

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
    return this.newElementGroup((parent: LayoutGroup) => {
      return new LayoutRow(
        horizontalAlignment,
        verticalAlignment,
        this.settings,
        parent
      );
    });
  }

  newCol(horizontalAlignment: Alignment, verticalAlignment: Alignment) {
    return this.newElementGroup((parent: LayoutGroup) => {
      return new LayoutCol(
        horizontalAlignment,
        verticalAlignment,
        this.settings,
        parent
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
    return this.newElementGroup((parent: LayoutGroup) => {
      return new VisibleLayoutRow(
        horizontalAlignment,
        verticalAlignment,
        this.settings,
        name,
        type,
        lateralLabel,
        parent
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
    return this.newElementGroup((parent: LayoutGroup) => {
      return new VisibleLayoutCol(
        horizontalAlignment,
        verticalAlignment,
        this.settings,
        name,
        type,
        lateralLabel,
        parent
      );
    });
  }

  /**
   * Calculates the absolute position for layout groups that aren't rendered elements (Rows and Cols)
   */
  toAbsolutePosition() {
    const plainElements = Array.from(this.containerMap.values());
    const visibleGroups = plainElements.filter((e) => e instanceof LayoutGroup);

    for (let i = 0; i < visibleGroups.length; i++) {
      const group = visibleGroups[i];

      (group as LayoutGroup).toAbsolutePosition();
    }
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

  addToCurrentGroup(container: BaseElement | LayoutGroup) {
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
    return this.root ? this.root.getWidth() : 0;
  }

  getPageHeight() {
    return this.root ? this.root.getHeight() : 0;
  }
}
