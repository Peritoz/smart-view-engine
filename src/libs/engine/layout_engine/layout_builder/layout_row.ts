import { Alignment } from "@libs/common/Alignment.enum";
import { Settings } from "@libs/engine/layout_engine/settings";
import { LayoutElementGroup } from "@libs/engine/layout_engine/layout_builder/layout_element_group";
import { Direction } from "@libs/common/distribution.enum";

export class LayoutRow extends LayoutElementGroup {
  constructor(
    horizontalAlignment: Alignment,
    verticalAlignment: Alignment,
    settings: Settings
  ) {
    super(
      horizontalAlignment,
      verticalAlignment,
      Direction.HORIZONTAL,
      settings
    );
  }
}
