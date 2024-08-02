export type DO = {
  type: string;
  user: string;
  name: string;
  id: string;
};
type RealtionNode = DO;

type Edge = {
  sourceNodeId: string;
  targetNodeId: string;
  score: number;
};

export type ResultRelation = {
  nodes: RealtionNode[];
  edges: Edge[];
};
