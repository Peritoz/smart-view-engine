import { Alignment } from "@libs/common/Alignment.enum";
import { Settings } from "@libs/engine/layout_engine/settings";
import { BaseElement } from "@libs/model/base_element";
import { LayoutElementGroup } from "@libs/engine/layout_engine/layout_builder/layout_element_group";
import { Direction } from "@libs/common/distribution.enum";

export class LayoutCol extends LayoutElementGroup {
  constructor(
    horizontalAlignment: Alignment,
    verticalAlignment: Alignment,
    settings: Settings,
    parentId: string | null
  ) {
    super(
      horizontalAlignment,
      verticalAlignment,
      Direction.VERTICAL,
      settings,
      parentId
    );
  }

  getWidth() {
    if (this.children.length > 0) {
      return (
        this.usedHeight + this.settings.topPadding + this.settings.bottomPadding
      );
    } else {
      return 0;
    }
  }

  getHeight() {
    if (this.children.length > 0) {
      return (
        this.width + this.settings.leftPadding + this.settings.rightPadding
      );
    } else {
      return 0;
    }
  }

  addContainer(container: BaseElement | LayoutElementGroup) {
    if (container) {
      super.addContainer(container);

      if (this.children.length > 1) {
        this.incrementUsedWidth(
          this.getOptimalPadding() + container.getHeight()
        );
      } else {
        this.incrementUsedWidth(container.getHeight());
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
    super.updateVerticalContentBoxAxis();
  }

  setMaximumCrossLength(value: number) {
    super.setMaximumCrossLength(value);

    this.applyCrossAxisDistribution();

    // Updating content box limit
    super.updateHorizontalContentBoxAxis();
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

      if (this.horizontalAlignment === Alignment.EXPANDED) {
        child.setHeight(refSize);
        child.setY(refPosition);

        refPosition += refSize + refPadding;
      } else if (
        this.horizontalAlignment === Alignment.START ||
        this.horizontalAlignment === Alignment.CENTER
      ) {
        child.setY(refPosition);

        refPosition += mainSize + refPadding;
      } else if (this.horizontalAlignment === Alignment.END) {
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

      if (this.verticalAlignment === Alignment.EXPANDED) {
        child.setWidth(super.getCrossLength());
        child.setX(this.contentBox.topLeft.x);
      } else if (this.verticalAlignment === Alignment.START) {
        child.setX(this.contentBox.topLeft.x);
      } else if (this.verticalAlignment === Alignment.CENTER) {
        child.setX(super.getCrossLength() / 2 - mainSize / 2);
      } else if (this.verticalAlignment === Alignment.END) {
        child.setX(super.getCrossLength() - mainSize);
      }
    }
  }
}
