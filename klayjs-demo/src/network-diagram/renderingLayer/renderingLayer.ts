import { Position, Size } from "../index.type";
import { NetworkDiagramLayout } from "../layout/layout.type";
import { NetworkDiagramNodeLayout } from "../node/node.type";

export class RenderingLayer {
  private _size: Size;
  private _offscreenCanvas: OffscreenCanvas;

  // private _nodeRenderingModule: RenderingModule;
  // private _edgeRenderingModule: RenderingModule;

  constructor({ layout }: { layout: NetworkDiagramLayout }) {
    this._size = { width: layout.width, height: layout.height };

    this._offscreenCanvas = new OffscreenCanvas(layout.width, layout.height);
  }

  render(scale: number = 1) {}

  getElementId(position: Position): string | undefined {
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
