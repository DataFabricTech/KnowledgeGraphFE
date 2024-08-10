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
