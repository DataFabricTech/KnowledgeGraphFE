import { NetworkDiagramEdgeLayout } from "../edge/edge.type";
import { NetworkDiagramNodeLayout } from "../node/node.type";

export type NetworkDiagramLayout = NetworkDiagramNodeLayout & {
  children: NetworkDiagramLayout[];
  edges: NetworkDiagramEdgeLayout;
};
