import { GlobalStyle, Position, Size } from "../index.type";
import { NetworkDiagramLayout } from "../layout/layout.type";
import { DiagramElementType } from "../windowLayer/windowLayer";

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
    globalStyle,
  }: {
    layout: NetworkDiagramLayout;
    scale: number;
    globalStyle: Partial<GlobalStyle>;
  }) {
    this._size = { width: layout.width, height: layout.height };
    this._scale = scale;

    this._offscreenCanvas = new OffscreenCanvas(layout.width, layout.height);

    this._nodeRenderingModule = new NodeRenderingModule({
      size: this._size,
      nodes: layout.children,
      scale,
      globalStyle,
    });
    this._nodeRenderingModule.render(scale);

    this._edgeRenderingModule = new EdgeRenderingModule({
      scale,
      size: this._size,
      edges: layout.edges,
      globalStyle,
    });
    this._edgeRenderingModule.render(scale);

    this.render();
  }

  get nodeModule() {
    return this._nodeRenderingModule;
  }

  get edgeModule() {
    return this._edgeRenderingModule;
  }

  setSize(size: { width: number; height: number }) {
    this._size = size;
    this._offscreenCanvas = new OffscreenCanvas(size.width, size.height);
    this._nodeRenderingModule.setSize(size);
    this._edgeRenderingModule.setSize(size);
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

  getElementId(
    position: Position
  ): { id: string; type: DiagramElementType } | undefined {
    const nodeId = this._nodeRenderingModule.getElementId(position);
    if (nodeId) {
      return { id: nodeId, type: "node" };
    }

    const edgeId = this._edgeRenderingModule.getElementId(position);
    if (edgeId) {
      return { id: edgeId, type: "edge" };
    }
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
