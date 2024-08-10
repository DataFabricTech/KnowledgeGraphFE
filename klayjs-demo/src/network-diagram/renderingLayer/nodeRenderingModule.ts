import { Position, Size } from "../index.type";
import { RenderingModule } from "./renderingLayer";
import RBush from "rbush";
import {
  NetworkDiagramNode,
  NetworkDiagramNodeLayout,
  NetworkDiagramNodeMeta,
} from "../node/node.type";
import { CircleNode } from "../node/circleNode";

class NodeRTree extends RBush<NetworkDiagramNode> {}

export class NodeRenderingModule implements RenderingModule {
  private _offscreenCanvas: OffscreenCanvas;
  private _rTree: NodeRTree;
  private _nodes: CircleNode[];
  private _scale: number;

  constructor({
    size,
    nodes,
    scale,
  }: {
    size: Size;
    nodes: NetworkDiagramNodeMeta[];
    scale: number;
  }) {
    this._offscreenCanvas = new OffscreenCanvas(size.width, size.height);
    this._rTree = new NodeRTree();
    this._scale = scale;

    this._nodes = nodes.map((meta) => {
      const node = new CircleNode({
        layout: meta,
        focusStyle: meta.focusStyle,
        style: meta.style,
        activeStyle: meta.activeStyle,
        scale: scale,
      });

      this._rTree.insert(node);

      return node;
    });
  }

  getElementId(position: Position): string | undefined {
    const diff = this._scale * 2;
    const item = this._rTree.search({
      minX: position.x - diff,
      maxX: position.x + diff,
      minY: position.y - diff,
      maxY: position.y + diff,
    });

    if (item[0]) {
      return item[0].id;
    }

    return;
  }

  get offscreenCanvas() {
    return this._offscreenCanvas;
  }

  render(scale?: number): void {
    if (scale) {
      this._scale = scale;
    }
    const ctx = this._offscreenCanvas.getContext("2d")!;

    ctx.clearRect(
      0,
      0,
      this._offscreenCanvas.width,
      this._offscreenCanvas.height
    );

    this._nodes.forEach((node) => {
      node.draw(ctx);
    });
  }
}
