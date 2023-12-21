import { ResultRelation } from "./type";
import { ElementDefinition } from "cytoscape";

export const convertRelation = (
  data: ResultRelation,
  opt?: {
    targetId?: string;
    targetPosition?: { x: number; y: number };
  }
): { nodes: ElementDefinition[]; edges: ElementDefinition[] } => {
  const positions = computePosition(
    opt?.targetPosition || { x: 0, y: 0 },
    data.nodes.length
  );

  const nodes: ElementDefinition[] = data.nodes.map((node, i) => {
    return {
      data: {
        ...node,
        level: 0,
        label: node.name,
        isTarget: node.id === opt?.targetId,
      },
      position: node.id === opt?.targetId ? { x: 0, y: 0 } : positions[i],
      group: "nodes",

      selected: false,
      selectable: true,
      locked: false,
      grabbable: false,
      classes: "",
    };
  });

  const edges: ElementDefinition[] = data.edges.map((edge) => {
    return {
      data: {
        source: edge.sourceNodeId,
        target: edge.targetNodeId,
        score: edge.score,
      },
      selectable: true,
      locked: false,

      grabbable: true,
      classes: "",
    };
  });

  return { nodes, edges };
};

const computePosition = (
  targetPosition: { x: number; y: number },
  nodeNumber: number
) => {
  return new Array(nodeNumber).fill(null).map((_, i) => {
    const rad = ((Math.PI * 2) / 50) * i;
    const x = Math.cos(rad);
    const y = Math.sin(rad);
    const multiple = (i % 3) + 1;

    return {
      x: targetPosition.x + x * multiple,
      y: targetPosition.y + y * multiple,
    };
  });
};
