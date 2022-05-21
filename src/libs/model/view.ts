import { ViewRelationship } from "@libs/model/view_relationship";
import { HydratedViewNode } from "@libs/model/view_node";

export interface View {
  viewRelationships: Array<ViewRelationship>;
  viewNodes: Array<HydratedViewNode>;
  name: string;
  bounds: {
    horizontal: { min: number; max: number };
    vertical: { min: number; max: number };
  };
  id: string;
}
