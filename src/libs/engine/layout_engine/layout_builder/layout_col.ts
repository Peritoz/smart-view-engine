import { Alignment } from "@libs/common/Alignment.enum";
import { Settings } from "@libs/engine/layout_engine/settings";
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
}
