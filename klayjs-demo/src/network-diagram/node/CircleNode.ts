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
  fontSize: 30,
  fontColor: "#fff",
  fontWeight: 500,
  backgroundColor: "blue",
  outlineColor: "#000",
  outlineWeight: 2,
  outlineDiff: 0,
} as const;

export class CircleNode implements NetworkDiagramNode {
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
  radius: number;

  private offscreenCanvas: OffscreenCanvas;
  private offscreenCtx: OffscreenCanvasRenderingContext2D;

  private label: string;
  private style: NetworkDiagramNodeStyle;

  private _focusStyle: Partial<NetworkDiagramNodeStyle>;
  private _activeStyle: Partial<NetworkDiagramNodeStyle>;

  private static circleDiff: number = 10;

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
    this.radius = layout.width / 2;

    this.scale = scale;

    this.style = { ...DEFAULT_STYLE, ...style };
    this._activeStyle = activeStyle;
    this._focusStyle = focusStyle;

    this.label = layout.labels ? layout.labels[0].text || layout.id : layout.id;

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

  get minX() {
    return this.x - this.circleDiff;
  }

  get minY() {
    return this.y - this.circleDiff;
  }
  get maxX() {
    return this.x + this.width + this.circleDiff;
  }
  get maxY() {
    return this.y + this.height + this.circleDiff;
  }

  private get circleDiff() {
    return this.scale * CircleNode.circleDiff;
  }

  private renderCircle() {
    const ctx = this.offscreenCtx;

    this.offscreenCtx.lineWidth = this.scale * this.style.outlineWeight;

    ctx.beginPath();

    ctx.arc(
      this.radius + this.circleDiff,
      this.radius + this.circleDiff,
      this.radius + this.circleDiff,
      0,
      Math.PI * 2,
      false
    ); // x, y, radius, startAngle, endAngle, counterclockwise
    ctx.fillStyle = this.style.backgroundColor;
    ctx.fill();
  }

  private renderOutLine() {
    const ctx = this.offscreenCtx;

    ctx.beginPath();
    ctx.arc(
      this.radius + this.circleDiff,
      this.radius + this.circleDiff,
      this.radius + this.circleDiff,
      0,
      Math.PI * 2,
      false
    );
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  private renderLabel() {
    this.offscreenCtx.lineWidth = this.scale * 2;

    this.offscreenCtx.beginPath();

    this.offscreenCtx.font = `${this.style.fontSize * this.scale}px serif`;

    this.offscreenCtx.fillStyle = this.style.fontColor;

    this.offscreenCtx.textAlign = "center";
    this.offscreenCtx.fillText(
      this.label,
      this.radius + this.circleDiff,
      this.radius + this.circleDiff + (this.style.fontSize * this.scale) / 3
    );
  }

  renderOffscreen(scale: number) {
    this.scale = scale;

    this.offscreenCanvas = new OffscreenCanvas(
      this.radius * 2 + this.circleDiff * 2,
      this.radius * 2 + this.circleDiff * 2
    );

    this.offscreenCtx = this.offscreenCanvas.getContext("2d")!;

    this.renderCircle();
    this.renderLabel();
  }

  draw(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D) {
    ctx.drawImage(
      this.offscreenCanvas,
      0,
      0,
      this.offscreenCanvas.height,
      this.offscreenCanvas.height,
      this.x - this.circleDiff,
      this.y - this.circleDiff,
      this.offscreenCanvas.height,
      this.offscreenCanvas.height
    );
  }
}
