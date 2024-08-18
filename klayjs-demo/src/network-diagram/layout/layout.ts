import ELK, { ElkExtendedEdge, ElkNode } from "elkjs";
import {
  NetworkDiagramEdgeInfo,
  NetworkDiagramLayout,
  NetworkDiagramNodeInfo,
} from "./layout.type";

const elk = new ELK({
  workerFactory: (url) => {
    const { Worker } = require("elkjs/lib/elk-worker.js"); // non-minified
    return new Worker(url);
  },
});

export const layoutDefault = async ({
  nodes,
  edges,
  scale,
  nodeSpacing = 0.4,
}: {
  nodes: NetworkDiagramNodeInfo[];
  edges: NetworkDiagramEdgeInfo[];
  scale: number;
  nodeSpacing?: number;
}) => {
  const graph = {
    id: "root",
    layoutOptions: {
      // "elk.algorithm": "layered",
      // "elk.algorithm": "radial",
      "elk.algorithm": "force",
      "elk.force.model": "FRUCHTERMAN_REINGOLD",
      // "elk.direction": "right",
      // "elk.scalefactor": "1",
      //  "elk.incremental": "true"
      // "elk.fix": "true",
      "elk.spacing.nodeNode": (20 * nodeSpacing).toFixed(),
      "elk.force.repulsiveForce": "5000",
    },
    children: nodes,
    edges: edges,
  };

  // worker.postMessage("hi");

  const layout = <NetworkDiagramLayout>await elk.layout(graph, {
    layoutOptions: { "elk.scaleFactor": scale.toFixed() },
  });
  return layout;
};
