import { Alignment } from "@libs/common/Alignment.enum";
import { Settings } from "@libs/engine/layout_engine/settings";
import { BaseElement } from "@libs/model/base_element";
import { LayoutElementGroup } from "@libs/engine/layout_engine/layout_builder/layout_element_group";

export class LayoutCol extends LayoutElementGroup {
  constructor(
    mainAxisAlignment: Alignment,
    crossAxisAlignment: Alignment,
    settings: Settings,
    parentId: string | null
  ) {
    super(mainAxisAlignment, crossAxisAlignment, settings, parentId);
  }

  getWidth() {
    if (this.children.length > 0) {
      return (
        this.crossLength +
        this.settings.topPadding +
        this.settings.bottomPadding
      );
    } else {
      return 0;
    }
  }

  getHeight() {
    if (this.children.length > 0) {
      return (
        this.virtualMainLength +
        this.settings.leftPadding +
        this.settings.rightPadding
      );
    } else {
      return 0;
    }
  }

  setWidth(value: number) {
    if (value > this.getWidth()) {
      this.setMaximumCrossLength(value);
    } else {
      throw new Error("The new Width can´t be smaller than current Width");
    }
  }

  setHeight(value: number) {
    if (value > this.getHeight()) {
      this.setMaximumMainLength(value);
    } else {
      throw new Error("The new Height can´t be smaller than current Height");
    }
  }

  updateContentBoxMainAxis() {
    this.contentBox.bottomRight.y =
      this.virtualCrossLength - this.settings.bottomPadding;
  }

  updateContentBoxCrossAxis() {
    this.contentBox.bottomRight.x =
      this.virtualMainLength - this.settings.rightPadding;
  }

  incrementMainLength(value: number) {
    super.incrementMainLength(value);

    // Updating content box limit
    this.updateContentBoxMainAxis();
  }

  addContainer(container: BaseElement | LayoutElementGroup) {
    if (container) {
      super.addContainer(container);

      if (this.children.length > 1) {
        this.incrementMainLength(
          this.getOptimalPadding() + container.getHeight()
        );
      } else {
        this.incrementMainLength(container.getHeight());
      }

      super.setMaximumCrossLength(container.getWidth());

      if (container instanceof BaseElement) {
        this.applyMainAxisDistribution();
        this.applyCrossAxisDistribution();
        container.setParentId(this.id);
      }
    }
  }

  adjustDimensionsToChildren() {
    super.adjustDimensionsToChildren(
      (child: BaseElement | LayoutElementGroup) => child.getHeight(),
      (child: BaseElement | LayoutElementGroup) => child.getWidth()
    );
  }

  setMaximumMainLength(value: number) {
    super.setMaximumMainLength(value);

    this.applyMainAxisDistribution();

    // Updating content box limit
    this.updateContentBoxMainAxis();
  }

  setMaximumCrossLength(value: number) {
    super.setMaximumCrossLength(value);

    this.applyCrossAxisDistribution();

    // Updating content box limit
    this.updateContentBoxCrossAxis();
  }

  /**
   * Distributes children over the element area, considering Main Axis and Cross Axis alignment options
   */
  applyDistribution() {
    this.applyMainAxisDistribution();
    this.applyCrossAxisDistribution();
  }

  /**
   * Distributes children over the element area, considering Main Axis alignment option
   */
  applyMainAxisDistribution() {
    const refSize = super.getOptimalSize();
    const refPadding = super.getOptimalPadding();
    let refPosition = this.contentBox.topLeft.y; // Setting the initial cursor position

    // Adjusting size and position for all children
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      const mainSize = child.getHeight();

      if (this.mainAxisAlignment === Alignment.EXPANDED) {
        child.setHeight(refSize);
        child.setY(refPosition);

        refPosition += refSize + refPadding;
      } else if (
        this.mainAxisAlignment === Alignment.START ||
        this.mainAxisAlignment === Alignment.CENTER
      ) {
        child.setY(refPosition);

        refPosition += mainSize + refPadding;
      } else if (this.mainAxisAlignment === Alignment.END) {
        refPosition -= mainSize;

        child.setY(refPosition);

        refPosition -= refPadding;
      }
    }
  }

  /**
   * Distributes children over the element area, considering Cross Axis alignment option
   */
  applyCrossAxisDistribution() {
    // Adjusting size and position for all children
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      const mainSize = child.getWidth();

      if (this.crossAxisAlignment === Alignment.EXPANDED) {
        child.setWidth(super.getCrossLength());
        child.setX(this.contentBox.topLeft.x);
      } else if (this.crossAxisAlignment === Alignment.START) {
        child.setX(this.contentBox.topLeft.x);
      } else if (this.crossAxisAlignment === Alignment.CENTER) {
        child.setX(super.getCrossLength() / 2 - mainSize / 2);
      } else if (this.crossAxisAlignment === Alignment.END) {
        child.setX(super.getCrossLength() - mainSize);
      }
    }
  }
}
