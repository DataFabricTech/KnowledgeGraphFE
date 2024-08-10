import { DefaultEdge } from "../edge/defaultEdge";
import { NetworkDiagramEdgeMeta } from "../edge/edge.type";
import { Position, Size } from "../index.type";
import { RenderingModule } from "./renderingLayer";

export class EdgeRenderingModule implements RenderingModule {
  private _offscreenCanvas: OffscreenCanvas;

  private _edges: DefaultEdge[];
  private _scale: number;

  constructor({
    size,
    edges,
    scale,
  }: {
    size: Size;
    edges: NetworkDiagramEdgeMeta[];
    scale: number;
  }) {
    this._offscreenCanvas = new OffscreenCanvas(size.width, size.height);

    this._scale = scale;

    this._edges = edges.map((meta) => {
      const edge = new DefaultEdge({
        layout: meta,
        // focusStyle: meta.focusStyle,
        style: meta.style,
        // activeStyle: meta.activeStyle,
        // scale: scale,
      });

      return edge;
    });
  }

  getElementId(position: Position): string | undefined {
    const ctx = this._offscreenCanvas.getContext("2d")!;

    const imageData = ctx.getImageData(
      position.x - 3 * this._scale,
      position.y - 3 * this._scale,
      6 * this._scale,
      6 * this._scale
    );

    const isDraw = imageData.data.some((value) => value !== 0);

    if (!isDraw) {
      return;
    }

    const edge = this._edges.find((edge) => edge.isPointNearEdge(position));
    if (!edge) {
      return;
    }
    return edge.id;
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

    this._edges.forEach((edge) => {
      edge.draw(ctx, this._scale);
    });
  }
}
