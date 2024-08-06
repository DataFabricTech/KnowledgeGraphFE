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

  minX: number;
  minY: number;
  maxX: number;
  maxY: number;

  private offscreenCanvas: OffscreenCanvas;
  private offscreenCtx: OffscreenCanvasRenderingContext2D;

  private label: string;
  private style: NetworkDiagramNodeStyle;

  private focusStyle: Partial<NetworkDiagramNodeStyle>;
  private activeStyle: Partial<NetworkDiagramNodeStyle>;

  private static circleDiff: number = 20;

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

    this.style = { ...DEFAULT_STYLE, ...style };
    this.activeStyle = activeStyle;
    this.focusStyle = focusStyle;

    this.label = layout.labels ? layout.labels[0].text || layout.id : layout.id;

    this.minX = 0;
    this.minY = 0;
    this.maxX = 0;
    this.maxY = 0;

    this.offscreenCanvas = new OffscreenCanvas(layout.width, layout.height);
    this.offscreenCtx = this.offscreenCanvas.getContext("2d")!;
    this.renderOffscreen(scale);
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
      this.radius / 2,
      this.radius / 2 - (this.style.fontSize * this.scale) / 2
    );
  }

  renderOffscreen(scale: number) {
    this.scale = scale;

    this.offscreenCanvas = new OffscreenCanvas(
      this.radius + this.circleDiff,
      this.radius + this.circleDiff
    );

    this.offscreenCtx = this.offscreenCanvas.getContext("2d")!;

    this.renderCircle();
    this.renderLabel();
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.offscreenCanvas,
      0,
      0,
      this.offscreenCanvas.height,
      this.offscreenCanvas.height,
      this.x - CircleNode.circleDiff * this.scale,
      this.y - CircleNode.circleDiff * this.scale,
      this.offscreenCanvas.height,
      this.offscreenCanvas.height
    );
  }

  drawEventLayer(
    ctx: CanvasRenderingContext2D,
    scale: number,
    offsetX: number,
    offsetY: number
  ) {}
}
