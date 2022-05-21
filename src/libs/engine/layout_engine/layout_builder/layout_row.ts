import { Alignment } from "@libs/common/Alignment.enum";
import { Settings } from "@libs/engine/layout_engine/settings";
import { LayoutElementGroup } from "@libs/engine/layout_engine/layout_builder/layout_element_group";
import { BaseElement } from "@libs/model/base_element";

export class LayoutRow extends LayoutElementGroup {
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
        this.virtualMainLength +
        this.settings.leftPadding +
        this.settings.rightPadding
      );
    } else {
      return 0;
    }
  }

  getHeight() {
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

  setWidth(value: number) {
    if (value > this.getWidth()) {
      this.setMaximumMainLength(value);
    } else {
      throw new Error("The new Width can´t be smaller than current Width");
    }
  }

  setHeight(value: number) {
    if (value > this.getHeight()) {
      this.setMaximumCrossLength(value);
    } else {
      throw new Error("The new Height can´t be smaller than current Height");
    }
  }

  updateContentBoxMainAxis() {
    this.contentBox.bottomRight.x =
      this.virtualMainLength - this.settings.rightPadding;
  }

  updateContentBoxCrossAxis() {
    this.contentBox.bottomRight.y =
      this.virtualCrossLength - this.settings.bottomPadding;
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
          this.getOptimalPadding() + container.getWidth()
        );
      } else {
        this.incrementMainLength(container.getWidth());
      }

      this.setMaximumCrossLength(container.getHeight());

      if (container instanceof BaseElement) {
        // TODO: Review need to call distribution in this case, see setMaximumCrossLength
        this.applyMainAxisDistribution();
        this.applyCrossAxisDistribution();
        container.setParentId(this.id);
      }
    }
  }

  adjustDimensionsToChildren() {
    super.adjustDimensionsToChildren(
      (child: BaseElement | LayoutElementGroup) => child.getWidth(),
      (child: BaseElement | LayoutElementGroup) => child.getHeight()
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
    let refPosition = this.contentBox.topLeft.x; // Setting the initial cursor position

    // Adjusting size and position for all children
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      const mainSize = child.getWidth();

      if (this.mainAxisAlignment === Alignment.EXPANDED) {
        child.setWidth(refSize);
        child.setX(refPosition);

        refPosition += refSize + refPadding;
      } else if (
        this.mainAxisAlignment === Alignment.START ||
        this.mainAxisAlignment === Alignment.CENTER
      ) {
        child.setX(refPosition);

        refPosition += mainSize + refPadding;
      } else if (this.mainAxisAlignment === Alignment.END) {
        refPosition -= mainSize;

        child.setX(refPosition);

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
      const mainSize = child.getHeight();

      if (this.crossAxisAlignment === Alignment.EXPANDED) {
        child.setHeight(super.getCrossLength());
        child.setY(this.contentBox.topLeft.y);
      } else if (this.crossAxisAlignment === Alignment.START) {
        child.setY(this.contentBox.topLeft.y);
      } else if (this.crossAxisAlignment === Alignment.CENTER) {
        child.setY(super.getCrossLength() / 2 - mainSize / 2);
      } else if (this.crossAxisAlignment === Alignment.END) {
        child.setY(super.getCrossLength() - mainSize);
      }
    }
  }
}
