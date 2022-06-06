import { Alignment } from "@libs/common/Alignment.enum";
import { Settings } from "@libs/engine/layout_engine/settings";
import { LayoutGroup } from "@libs/engine/layout_engine/layout_builder/layout_group";
import { Direction } from "@libs/common/distribution.enum";

export class LayoutCol extends LayoutGroup {
  constructor(
    horizontalAlignment: Alignment,
    verticalAlignment: Alignment,
    settings: Settings
  ) {
    super(
      horizontalAlignment,
      verticalAlignment,
      Direction.VERTICAL,
      settings
    );
  }
}
