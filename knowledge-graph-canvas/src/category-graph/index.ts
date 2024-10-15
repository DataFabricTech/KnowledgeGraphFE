import { NetworkDiagram } from "../network-diagram";
import {
  NetworkDiagramEdgeInfo,
  NetworkDiagramNodeInfo,
} from "../network-diagram/layout/layout.type";
import { NetworkDiagramNodeStyle } from "../network-diagram/node/node.type";
import { EventHandler } from "../network-diagram/windowLayer/windowLayer";
import { PixelQuality } from "../network-diagram/index.type";

const QUALITATIVE_PALETTE = [
  "#636EFA",
  "#EF553B",
  "#00CC96",
  "#AB63FA",
  "#FFA15A",
  "#19D3F3",
  "#FF6692",
  "#B6E880",
] as const;

export type CategoryNode = {
  id: string;
  name: string;
  style?: Partial<NetworkDiagramNodeStyle>;
};

export type Category = CategoryNode & {
  children: Category[];
  nodeList: CategoryNode[];
};

const convert = (category: Category) => {
  const nodes: NetworkDiagramNodeInfo[] = [];
  const edges: NetworkDiagramEdgeInfo[] = [];

  _convert(category, nodes, edges, 0);

  return { nodes, edges };
};

const _convert = (
  category: Category,
  nodes: NetworkDiagramNodeInfo[],
  edges: NetworkDiagramEdgeInfo[],
  level: number,
  parentId?: string,
  color?: string
) => {
  const currentColor = color || QUALITATIVE_PALETTE[0];

  const node: NetworkDiagramNodeInfo = {
    id: category.id,
    labels: [{ text: category.name }],
    style: {
      backgroundColor: currentColor,
      outlineColor: currentColor,
      ...category.style,
    },
    width: 200 - level * 24,
    height: 200 - level * 24,
  };

  nodes.push(node);
  if (parentId) {
    const edge: NetworkDiagramEdgeInfo = {
      id: `${parentId}_${node.id}`,
      targets: [node.id],
      sources: [parentId],
    };
    edges.push(edge);
  }

  category.nodeList.forEach((node) => {
    nodes.push({
      id: node.id,
      labels: [{ text: node.name }],
      style: {
        backgroundColor: currentColor,
        outlineColor: currentColor,
        ...node.style,
      },
      width: 120,
      height: 120,
    });

    edges.push({
      id: `${category.id}_${node.id}`,
      targets: [node.id],
      sources: [category.id],
    });
  });
  category.children.forEach((item, i) => {
    let nextColor = currentColor;
    if (!color) {
      nextColor = QUALITATIVE_PALETTE[(i + 1) % QUALITATIVE_PALETTE.length];
    }

    _convert(item, nodes, edges, level + 1, category.id, nextColor);
  });
};
export type CategoryGraphProps = {
  container: HTMLDivElement;
  categoryData: Category;
  eventHandler?: Partial<EventHandler>;
  pixelQuality?: PixelQuality;
};

export class CategoryGraph {
  private _diagram: NetworkDiagram;

  constructor({
    container,
    categoryData,
    eventHandler,
    pixelQuality,
  }: CategoryGraphProps) {
    const { nodes, edges } = convert(categoryData);

    this._diagram = new NetworkDiagram({
      container,
      eventHandler,
      nodes,
      edges,
      pixelQuality,
      edgeLength: Math.min(1000, Math.max(nodes.length * 10, 300)),
    });
  }

  cleanUp() {
    this._diagram.cleanUp();
  }
}
