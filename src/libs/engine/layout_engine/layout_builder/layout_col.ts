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

  adjustDimensionsToChildren() {
    super.adjustDimensionsToChildren(
      (child: BaseElement | LayoutElementGroup) => child.getHeight(),
      (child: BaseElement | LayoutElementGroup) => child.getWidth()
    );
  }
}
