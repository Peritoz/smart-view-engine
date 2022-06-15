import { Position } from "@libs/model/position";

export interface PositionalElement extends Position {
  getX: () => number;
  getY: () => number;
  setX: (value: number) => void;
  setY: (value: number) => void;
}