import { Position, Size } from "../index.type";
import { NetworkDiagramLayout } from "../layout/layout.type";
import { NetworkDiagramNodeLayout } from "../node/node.type";
import { EdgeRenderingModule } from "./edgeRenderingModule";
import { NodeRenderingModule } from "./nodeRenderingModule";

export class RenderingLayer {
  private _size: Size;
  private _offscreenCanvas: OffscreenCanvas;

  private _nodeRenderingModule: NodeRenderingModule;
  private _edgeRenderingModule: EdgeRenderingModule;
  private _scale: number;

  constructor({
    layout,
    scale,
  }: {
    layout: NetworkDiagramLayout;
    scale: number;
  }) {
    this._size = { width: layout.width, height: layout.height };
    this._scale = scale;

    this._offscreenCanvas = new OffscreenCanvas(layout.width, layout.height);

    this._nodeRenderingModule = new NodeRenderingModule({
      size: this._size,
      nodes: layout.children,
      scale,
    });
    this._nodeRenderingModule.render(scale);

    this._edgeRenderingModule = new EdgeRenderingModule({
      scale,
      size: this._size,
      edges: layout.edges,
    });
    this._edgeRenderingModule.render(scale);

    this.render();
  }

  render(scale?: number) {
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

    ctx.drawImage(this._edgeRenderingModule.offscreenCanvas, 0, 0);
    ctx.drawImage(this._nodeRenderingModule.offscreenCanvas, 0, 0);
  }

  getElementId(position: Position): string | undefined {
    const nodeId = this._nodeRenderingModule.getElementId(position);
    if (nodeId) {
      return nodeId;
    }
    return;
  }

  get offscreenCanvas() {
    return this._offscreenCanvas;
  }

  get size() {
    return this._size;
  }
}

export interface RenderingModule {
  getElementId(position: Position): string | undefined;
  offscreenCanvas: OffscreenCanvas;
  render(scale?: number): void;
}
