import { NetworkDiagramEdgeMeta } from "../edge/edge.type";
import { NetworkDiagramNodeMeta } from "../node/node.type";

export type NetworkDiagramLayout = NetworkDiagramNodeMeta & {
  children: NetworkDiagramNodeMeta[];
  edges: NetworkDiagramEdgeMeta[];
};

export type NetworkDiagramNodeInfo = Omit<NetworkDiagramNodeMeta, "x" | "y">;

export type NetworkDiagramEdgeInfo = Omit<NetworkDiagramEdgeMeta, "sections">;
