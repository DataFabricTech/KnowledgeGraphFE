import {
  NetworkDiagramEdgeLayout,
  NetworkDiagramEdgeMeta,
} from "../edge/edge.type";
import {
  NetworkDiagramNodeLayout,
  NetworkDiagramNodeMeta,
} from "../node/node.type";

export type NetworkDiagramLayout = NetworkDiagramNodeMeta & {
  children: NetworkDiagramNodeMeta[];
  edges: NetworkDiagramEdgeMeta[];
};

export type NetworkDiagramNodeInfo = Omit<
  NetworkDiagramNodeMeta,
  "width" | "height" | "x" | "y"
>;

export type NetworkDiagramEdgeInfo = Omit<NetworkDiagramEdgeMeta, "sections">;
