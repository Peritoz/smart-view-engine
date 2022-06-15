import { Dimension } from "@libs/model/dimension";

export interface DimensionalElement extends Dimension {
  getWidth: () => number;
  getHeight: () => number;
  setWidth: (value: number) => void;
  setHeight: (value: number) => void;
}
