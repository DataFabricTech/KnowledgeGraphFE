import ELK, { ElkExtendedEdge, ElkNode } from "elkjs";
import {
  NetworkDiagramEdgeInfo,
  NetworkDiagramLayout,
  NetworkDiagramNodeInfo,
} from "./layout.type";

const elk = new ELK();

export const layoutDefault = async ({
  nodes,
  edges,
  scale,
}: {
  nodes: NetworkDiagramNodeInfo[];
  edges: NetworkDiagramEdgeInfo[];
  scale: number;
}) => {
  const graph = {
    id: "root",
    layoutOptions: {
      // "elk.algorithm": "layered",
      // "elk.algorithm": "radial",
      "elk.algorithm": "force",
      // "elk.scalefactor": "1",
      //  "elk.incremental": "true"
      // "elk.fix": "true",
      "elk.spacing.nodeNode": "10",
      "elk.force.repulsiveForce": "5000",
    },
    children: nodes,
    edges: edges,
  };

  const layout = <NetworkDiagramLayout>await elk.layout(graph, {
    layoutOptions: { "elk.scaleFactor": scale.toFixed() },
  });
  return layout;
};
