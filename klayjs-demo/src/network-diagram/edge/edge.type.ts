import { RequiredKeys } from "@/util/type.util";
import { ElkExtendedEdge } from "elkjs";

export type NetworkDiagramEdgeLayout = RequiredKeys<
  ElkExtendedEdge,
  "sections"
>;

export type EdgeStyle = {
  color: string;
  weight: number;
  isLabel: boolean;
};

export interface NetworkDiagramEdge extends NetworkDiagramEdgeLayout {
  setStyle(style: Partial<EdgeStyle>): void;
  defaultStyle(): void;
  activeStyle(): void;
  focusStyle(): void;

  // renderOffscreen(scale: number): void;

  draw(ctx: CanvasRenderingContext2D, scale: number): void;
}
