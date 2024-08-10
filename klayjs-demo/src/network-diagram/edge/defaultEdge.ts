import { ElkPoint, ElkLabel, LayoutOptions, ElkEdgeSection } from "elkjs";
import {
  EdgeStyle,
  NetworkDiagramEdge,
  NetworkDiagramEdgeLayout,
} from "./edge.type";
import { Position } from "../index.type";

const DEFAULT_STYLE: EdgeStyle = {
  color: "#000",
  weight: 3,
  isLabel: false,
} as const;

export class DefaultEdge implements NetworkDiagramEdge {
  sources: string[];
  targets: string[];
  id: string;
  junctionPoints?: ElkPoint[] | undefined;
  labels?: ElkLabel[] | undefined;
  layoutOptions?: LayoutOptions | undefined;
  sections: ElkEdgeSection[];
  private _style: EdgeStyle;
  private _scale: number = 1;

  // private label: string = "";

  constructor({
    layout,
    style = {},
  }: {
    layout: NetworkDiagramEdgeLayout;
    style?: Partial<EdgeStyle>;
  }) {
    this.sources = layout.sources;
    this.targets = layout.targets;
    this.id = layout.id;
    this.labels = layout.labels;
    this.sections = layout.sections;

    this._style = { ...DEFAULT_STYLE, ...style };
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

  isPointNearEdge(point: Position, threshold: number = 3) {
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

    if (this._style.isLabel) {
    }

    ctx.restore();
    // throw new Error("Method not implemented.");
  }
}
