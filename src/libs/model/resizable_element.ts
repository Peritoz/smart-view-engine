import { Dimension } from "@libs/model/dimension";

export interface ResizableElement extends Dimension {
  onChangeWidth: (oldValue: number, newValue: number) => void;
  onChangeHeight: (oldValue: number, newValue: number) => void;
}
