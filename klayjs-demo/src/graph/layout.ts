import ELK, { ElkExtendedEdge, ElkNode } from "elkjs";
import { createNode } from "./node";
import { getRelationData } from "@/res/getRelationData";
import { sources } from "next/dist/compiled/webpack/webpack";

const elk = new ELK();

const nodes: ElkNode[] = [
  { id: "n1", width: 50, height: 50 },
  { id: "n2", width: 50, height: 50 },
  { id: "n3", width: 50, height: 50 },
  { id: "n4", width: 50, height: 50 },
];
const edges: ElkExtendedEdge[] = [
  { id: "e1", sources: ["n1"], targets: ["n2"] },
  { id: "e2", sources: ["n1"], targets: ["n3"] },
  { id: "e3", sources: ["n4"], targets: ["n1"] },
];

const graph = {
  id: "root",
  layoutOptions: {
    // "elk.algorithm": "layered",
    // "elk.algorithm": "radial",
    "elk.algorithm": "force",
    // "elk.scalefactor": "1",
    //  "elk.incremental": "true"
    // "elk.fix": "true",
  },
  children: nodes,
  edges: edges,
};

export const getLayout = async (scale: number) => {
  // graph.layoutOptions["elk.scalefactor"] = `${scale}`;
  const data = await getRelationData();

  const nodes = data.nodes.map((node) => ({
    id: node.id,
    labels: [{ text: node.name }],
    width: 50,
    height: 50,
  }));

  let i = 0;
  const edges = data.edges.map((edge) => ({
    id: `e${i++}`,
    sources: [edge.sourceNodeId],
    targets: [edge.targetNodeId],
  }));

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
  const layout = elk.layout(graph, {
    layoutOptions: { "elk.scaleFactor": scale.toFixed() },
  });

  return layout;
};

export const drawLayout = async (scale: number = 1) => {
  const layout = await getLayout(Math.sqrt(scale));
  // scaleLayout(layout, scale);

  const graph = createNode(layout as any, scale);
  return graph;
};

const scaleLayout = (layout: ElkNode, scale: number) => {
  // if (layout.x) {
  //   layout.x *= scale;
  // }
  // if (layout.y) {
  //   layout.y *= scale;
  // }
  // if (layout.width) {
  //   layout.width *= scale;
  // }
  // if (layout.height) {
  //   layout.height *= scale;
  // }

  layout.children?.forEach((node) => {
    scaleLayout(node, scale);
  });

  layout.edges?.forEach((edge) => scaleEdge(edge, scale));
};
const scaleEdge = (edge: ElkExtendedEdge, scale: number) => {
  edge.sections?.forEach((section) => {
    section.endPoint = {
      x: (section.endPoint.x *= scale),
      y: (section.endPoint.y *= scale),
    };

    section.startPoint = {
      x: (section.startPoint.x *= scale),
      y: (section.startPoint.y *= scale),
    };
    section.bendPoints?.forEach((bendPoint) => {
      bendPoint.x *= scale;
      bendPoint.y *= scale;
    });
  });
};
