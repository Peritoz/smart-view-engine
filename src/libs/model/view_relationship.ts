export interface ViewRelationship {
    modelRelationshipId: string;
    sourceId: string;
    targetId: string;
    viewRelationshipId: string;
    type: string;
    bendpoints: Array<{ x: number; y: number }>;
}