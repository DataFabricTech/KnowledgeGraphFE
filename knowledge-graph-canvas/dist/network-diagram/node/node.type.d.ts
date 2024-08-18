import { ElkNode } from "elkjs";
import { BBox } from "rbush";
import { RequiredKeys } from "../../util/type.utill";
export type NetworkDiagramNodeLayout = RequiredKeys<ElkNode, "width" | "height" | "x" | "y">;
export type NetworkDiagramNodeMeta = NetworkDiagramNodeLayout & {
    style?: Partial<NetworkDiagramNodeStyle>;
    focusStyle?: Partial<NetworkDiagramNodeStyle>;
    activeStyle?: Partial<NetworkDiagramNodeStyle>;
};
export type NetworkDiagramNodeStyle = {
    fontSize: number;
    fontColor: string;
    fontWeight: number;
    backgroundColor: string;
    outlineColor: string;
    outlineWeight: number;
    outlineDiff: number;
};
export interface NetworkDiagramNode<Style extends NetworkDiagramNodeStyle = NetworkDiagramNodeStyle> extends NetworkDiagramNodeLayout, BBox {
    setStyle(style: Partial<Style>): void;
    defaultStyle(): void;
    activeStyle(): void;
    focusStyle(): void;
    renderOffscreen(scale: number): void;
    draw(ctx: CanvasRenderingContext2D, scale: number): void;
}
