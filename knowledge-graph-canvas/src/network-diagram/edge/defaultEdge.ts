import { ElkPoint, ElkLabel, LayoutOptions, ElkEdgeSection } from "elkjs";
import {
  EdgeStyle,
  NetworkDiagramEdge,
  NetworkDiagramEdgeLayout,
} from "./edge.type";
import { GlobalStyle, Position } from "../index.type";

const DEFAULT_STYLE: EdgeStyle = {
  color: "#000",
  weight: 3,
  isLabel: true,
  fontSize: 12,
  fontColor: "#000",
  fontBackground: "#EAECF0",
} as const;

export class DefaultEdge implements NetworkDiagramEdge {
  junctionPoints?: ElkPoint[] | undefined;

  layoutOptions?: LayoutOptions | undefined;

  private _style: EdgeStyle;
  private _scale: number = 1;
  private _layout: NetworkDiagramEdgeLayout;

  private _globalStyle: Partial<GlobalStyle>;

  // private label: string = "";

  constructor({
    layout,
    style = {},
    globalStyle,
  }: {
    layout: NetworkDiagramEdgeLayout;
    style?: Partial<EdgeStyle>;
    globalStyle: Partial<GlobalStyle>;
  }) {
    this._layout = layout;
    this._globalStyle = globalStyle;

    this._style = { ...DEFAULT_STYLE, ...style };
  }

  get sources() {
    return this._layout.sources;
  }

  get targets() {
    return this._layout.targets;
  }
  get id() {
    return this._layout.id;
  }
  get labels() {
    return this._layout.labels;
  }
  get sections() {
    return this._layout.sections;
  }
  setStyle(style: Partial<EdgeStyle>): void {
    this._style = { ...this._style, ...style };
    // throw new Error("Method not implemented.");
  }

  get label() {
    if (!this.labels || !this.labels[0]) {
      return "";
    }
    return this.labels[0].text || "";
  }

  get layout() {
    return this._layout;
  }
  defaultStyle(): void {
    // throw new Error("Method not implemented.");
  }
  activeStyle(): void {
    // throw new Error("Method not implemented.");
  }
  focusStyle(): void {
    // throw new Error("Method not implemented.");
  }

  get section() {
    const section = this.sections[0];

    return section;
  }

  isPointNearEdge(point: Position, threshold: number = 5) {
    const A = this.section.startPoint;
    const B = this.section.endPoint;
    const C = point;

    const numerator = Math.abs(
      (B.y - A.y) * C.x - (B.x - A.x) * C.y + B.x * A.y - B.y * A.x
    );
    const denominator = Math.sqrt((B.y - A.y) ** 2 + (B.x - A.x) ** 2);
    const distance = numerator / denominator;

    return distance <= threshold * this._scale;
  }

  draw(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    scale: number
  ): void {
    const section = this.section;

    this._scale = scale;
    ctx.save();

    ctx.lineWidth = scale * this._style.weight;
    ctx.beginPath();
    ctx.moveTo(section.startPoint.x, section.startPoint.y);
    section.bendPoints?.forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.lineTo(section.endPoint.x, section.endPoint.y);

    ctx.strokeStyle = this._style.color;

    ctx.stroke();

    if (this._style.isLabel && this.label) {
      ctx.font = `${this._style.fontSize * scale}px serif`;
      const metricsText = ctx.measureText(this.label);

      ctx.globalAlpha = 0.7;

      ctx.fillStyle = this._style.fontBackground;
      ctx.fillRect(
        (section.startPoint.x + section.endPoint.x) / 2 -
          metricsText.width / 2 -
          10,
        (section.startPoint.y + section.endPoint.y) / 2 -
          (this._style.fontSize * scale) / 2 -
          10,
        metricsText.width + 20,
        this._style.fontSize * scale + 20
      );

      ctx.globalAlpha = 1;

      ctx.beginPath();

      ctx.fillStyle = this._style.fontColor;

      ctx.textAlign = "center";

      ctx.fillText(
        this.label,
        (section.startPoint.x + section.endPoint.x) / 2,
        (section.startPoint.y + section.endPoint.y) / 2 +
          (this._style.fontSize * scale) / 3
      );
    }

    ctx.restore();
    // throw new Error("Method not implemented.");
  }
}
