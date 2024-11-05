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
import { GlobalStyle } from "../index.type";

const DEFAULT_STYLE: NetworkDiagramNodeStyle = {
  fontSize: 30,
  fontColor: "#fff",
  fontWeight: 500,
  backgroundColor: "blue",
  outlineColor: "#000",
  outlineWeight: 2,
  outlineDiff: 4,
} as const;

export class CircleNode implements NetworkDiagramNode {
  children?: ElkNode[] | undefined;
  ports?: ElkPort[] | undefined;
  edges?: ElkExtendedEdge[] | undefined;
  labels?: ElkLabel[] | undefined;
  layoutOptions?: LayoutOptions | undefined;

  private offscreenCanvas: OffscreenCanvas;
  private offscreenCtx: OffscreenCanvasRenderingContext2D;

  private label: string;
  private style: NetworkDiagramNodeStyle;

  private _focusStyle: Partial<NetworkDiagramNodeStyle>;
  private _activeStyle: Partial<NetworkDiagramNodeStyle>;

  private scale: number = 1;

  private _layout: NetworkDiagramNodeLayout;
  private _globalStyle: Partial<GlobalStyle>;

  constructor({
    layout,
    scale = 1,
    style = {},
    focusStyle = {},
    activeStyle = {},
    globalStyle,
  }: {
    layout: NetworkDiagramNodeLayout;
    scale?: number;
    style?: Partial<NetworkDiagramNodeStyle>;
    focusStyle?: Partial<NetworkDiagramNodeStyle>;
    activeStyle?: Partial<NetworkDiagramNodeStyle>;
    globalStyle: Partial<GlobalStyle>;
  }) {
    this._layout = layout;
    this._globalStyle = globalStyle;

    this._layout.width = this._layout.width / scale;
    this._layout.height = this._layout.height / scale;

    this.scale = scale;

    this.style = { ...DEFAULT_STYLE, ...style };
    this._activeStyle = activeStyle;
    this._focusStyle = focusStyle;

    this.label = layout.labels ? layout.labels[0].text || layout.id : layout.id;

    this.offscreenCanvas = new OffscreenCanvas(layout.width, layout.height);
    this.offscreenCtx = this.offscreenCanvas.getContext("2d")!;
    this.renderOffscreen(scale);
  }

  get id() {
    return this._layout.id;
  }
  get x() {
    return this._layout.x;
  }
  get y() {
    return this._layout.y;
  }
  get width() {
    return this._layout.width * this.scale;
  }
  get height() {
    return this._layout.height * this.scale;
  }
  get radius() {
    return (this._layout.height / 2) * this.scale;
  }

  get layout() {
    return this._layout;
  }
  adjustScale(scale: number) {
    this._layout.width /= scale;
    this._layout.height /= scale;
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
    return this.height * 0.12;
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
    );
    ctx.fillStyle = "#fff";
    ctx.fill();

    ctx.beginPath();

    ctx.arc(
      this.radius + this.circleDiff,
      this.radius + this.circleDiff,
      this.radius +
        this.circleDiff -
        (this.style.outlineWeight + this.style.outlineDiff) * this.scale,
      0,
      Math.PI * 2,
      false
    );
    ctx.fillStyle = this.style.backgroundColor;
    ctx.fill();
  }

  private renderOutLine() {
    const ctx = this.offscreenCtx;

    ctx.beginPath();
    ctx.arc(
      this.radius + this.circleDiff,
      this.radius + this.circleDiff,
      this.radius +
        this.circleDiff -
        (this.style.outlineWeight * this.scale) / 2,
      0,
      Math.PI * 2,
      false
    );
    // ctx.fillStyle = "green";
    // ctx.fill();
    ctx.lineWidth = this.style.outlineWeight * this.scale;
    ctx.strokeStyle = this.style.outlineColor;
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
    this.renderOutLine();
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
