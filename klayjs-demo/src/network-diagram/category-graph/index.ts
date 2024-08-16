import { ElkNode } from "elkjs";
import { NetworkDiagram } from "..";
import {
  NetworkDiagramEdgeInfo,
  NetworkDiagramNodeInfo,
} from "../layout/layout.type";
import { NetworkDiagramNodeStyle } from "../node/node.type";
import { EventHandler } from "../windowLayer/windowLayer";

export type CategoryNode = {
  id: string;
  name: string;
  style?: Partial<NetworkDiagramNodeStyle>;
};

export type Category = CategoryNode & {
  children: Category[];
  doList: CategoryNode[];
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
  parentId?: string
) => {
  if (level > 2) {
    return;
  }
  if (nodes.length > 50) {
    return;
  }

  const node: NetworkDiagramNodeInfo = {
    id: category.id,
    labels: [{ text: category.name }],
    style: { ...category.style },
    width: 150 - level * 20,
    height: 150 - level * 20,
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

  category.doList.forEach((node) => {
    nodes.push({
      id: node.id,
      labels: [{ text: node.name }],
      style: { ...node.style },
      width: 80,
      height: 80,
    });

    edges.push({
      id: `${category.id}_${node.id}`,
      targets: [node.id],
      sources: [category.id],
    });
  });
  category.children.forEach((item) =>
    _convert(item, nodes, edges, level + 1, category.id)
  );
};

export class CategoryGraph {
  private _diagram: NetworkDiagram;

  constructor({
    container,
    categoryData,
    eventHandler,
  }: {
    container: HTMLDivElement;
    categoryData: Category;
    eventHandler?: Partial<EventHandler>;
  }) {
    const { nodes, edges } = convert(categoryData);
    console.log(nodes);
    this._diagram = new NetworkDiagram({
      container,
      eventHandler,
      nodes,
      edges,
    });
  }

  cleanUp() {
    this._diagram.cleanUp();
  }
}
