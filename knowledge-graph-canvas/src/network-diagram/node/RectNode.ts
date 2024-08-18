import {
  ElkNode,
  ElkPort,
  ElkExtendedEdge,
  ElkLabel,
  LayoutOptions,
} from "elkjs";
import {
  NetworkDiagramNode,
  NetworkDiagramNodeLayout,
  NetworkDiagramNodeStyle,
} from "./node.type";

const DEFAULT_STYLE: NetworkDiagramNodeStyle = {
  fontSize: 14,
  fontColor: "#fff",
  fontWeight: 500,
  backgroundColor: "#fff",
  outlineColor: "#000",
  outlineWeight: 2,
  outlineDiff: 0,
} as const;

export class RectNode implements NetworkDiagramNode {
  id: string;
  children?: ElkNode[] | undefined;
  ports?: ElkPort[] | undefined;
  edges?: ElkExtendedEdge[] | undefined;
  labels?: ElkLabel[] | undefined;
  layoutOptions?: LayoutOptions | undefined;
  width: number;
  height: number;
  x: number;
  y: number;
  private offscreenCanvas: OffscreenCanvas;
  private offscreenCtx: OffscreenCanvasRenderingContext2D;

  private style: NetworkDiagramNodeStyle;

  private _focusStyle: Partial<NetworkDiagramNodeStyle>;
  private _activeStyle: Partial<NetworkDiagramNodeStyle>;

  private scale: number = 1;

  constructor({
    layout,
    scale = 1,
    style = {},
    focusStyle = {},
    activeStyle = {},
  }: {
    layout: NetworkDiagramNodeLayout;
    scale?: number;
    style?: Partial<NetworkDiagramNodeStyle>;
    focusStyle?: Partial<NetworkDiagramNodeStyle>;
    activeStyle?: Partial<NetworkDiagramNodeStyle>;
  }) {
    this.id = layout.id;
    this.x = layout.x;
    this.y = layout.y;
    this.width = layout.width;
    this.height = layout.height;

    this.style = { ...DEFAULT_STYLE, ...style };
    this._activeStyle = activeStyle;
    this._focusStyle = focusStyle;

    this.offscreenCanvas = new OffscreenCanvas(layout.width, layout.height);
    this.offscreenCtx = this.offscreenCanvas.getContext("2d")!;
    this.renderOffscreen(scale);
  }
  setStyle(style: Partial<NetworkDiagramNodeStyle>): void {
    // throw new Error('Method not implemented.');
  }
  defaultStyle(): void {
    // throw new Error('Method not implemented.');
  }
  activeStyle(): void {
    // throw new Error('Method not implemented.');
  }
  focusStyle(): void {
    // throw new Error('Method not implemented.');
  }

  get label() {
    return this.labels ? this.labels[0].text || this.id : this.id;
  }

  get minX() {
    return this.x;
  }

  get minY() {
    return this.y;
  }
  get maxX() {
    return this.x + this.width;
  }
  get maxY() {
    return this.y + this.height;
  }

  renderOffscreen(scale: number) {
    this.scale = scale;

    this.offscreenCanvas = new OffscreenCanvas(this.width, this.height);

    this.offscreenCtx = this.offscreenCanvas.getContext("2d")!;

    // Draw the node (circle with text)
    this.offscreenCtx.lineWidth = scale * 2;
    this.offscreenCtx.fillStyle = "#fff";
    this.offscreenCtx.fillRect(0, 0, this.width, this.height);
    this.offscreenCtx.strokeStyle = "black";
    this.offscreenCtx.strokeRect(0, 0, this.width, this.height);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.offscreenCanvas,
      0,
      0,
      this.offscreenCanvas.height,
      this.offscreenCanvas.height,
      this.x,
      this.y,
      this.offscreenCanvas.height,
      this.offscreenCanvas.height
    );
  }
}
