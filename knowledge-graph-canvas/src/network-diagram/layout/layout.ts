import ELK from "elkjs/lib/elk.bundled.js";

import {
  NetworkDiagramEdgeInfo,
  NetworkDiagramLayout,
  NetworkDiagramNodeInfo,
} from "./layout.type";

const elk = new ELK({
  // workerFactory: (url) => {
  //   const { Worker } = require("elkjs/lib/elk-worker.js"); // non-minified
  //   return new Worker(url);
  // },
});

export const layoutDefault = async ({
  nodes,
  edges,
  scale,
  nodeSpacing = 0.4,
  edgeLength = 200,
}: {
  nodes: NetworkDiagramNodeInfo[];
  edges: NetworkDiagramEdgeInfo[];
  scale: number;
  nodeSpacing?: number;
  edgeLength?: number;
}) => {
  const graph = {
    id: "root",
    layoutOptions: {
      // "elk.algorithm": "layered",
      // "elk.algorithm": "radial",
      // "elk.algorithm": "force",
      // "elk.algorithm": "mrtree",
      "elk.algorithm": "stress",
      "org.eclipse.elk.stress.desiredEdgeLength": (
        edgeLength * scale
      ).toFixed(),
      "org.eclipse.elk.stress.model": "CIRCLE",

      // "elk.force.model": "FRUCHTERMAN_REINGOLD",
      // "elk.direction": "right",
      // "elk.scalefactor": "1",
      //  "elk.incremental": "true"
      "elk.fix": "true",
      "elk.spacing.nodeNode": (20 * nodeSpacing).toFixed(),
      // "elk.edgeLength": "5000",
      "elk.force.repulsiveForce": "50000",
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
