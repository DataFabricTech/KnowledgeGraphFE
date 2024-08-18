import { ElkExtendedEdge } from "elkjs";
import { RequiredKeys } from "../../util/type.utill";

export type NetworkDiagramEdgeLayout = RequiredKeys<
  ElkExtendedEdge,
  "sections"
>;

export type NetworkDiagramEdgeMeta = NetworkDiagramEdgeLayout & {
  style?: Partial<EdgeStyle>;
  focusStyle?: Partial<EdgeStyle>;
  activeStyle?: Partial<EdgeStyle>;
};

export type EdgeStyle = {
  color: string;
  weight: number;
  isLabel: boolean;
  fontSize: number;
  fontColor: string;
  fontBackground: string;
};

export interface NetworkDiagramEdge extends NetworkDiagramEdgeLayout {
  setStyle(style: Partial<EdgeStyle>): void;
  defaultStyle(): void;
  activeStyle(): void;
  focusStyle(): void;

  // renderOffscreen(scale: number): void;

  draw(ctx: CanvasRenderingContext2D, scale: number): void;
}
