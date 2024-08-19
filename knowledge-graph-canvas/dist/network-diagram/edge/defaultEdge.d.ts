import { ElkPoint, ElkLabel, LayoutOptions, ElkEdgeSection } from "elkjs";
import { EdgeStyle, NetworkDiagramEdge, NetworkDiagramEdgeLayout } from "./edge.type";
import { Position } from "../index.type";
export declare class DefaultEdge implements NetworkDiagramEdge {
    junctionPoints?: ElkPoint[] | undefined;
    layoutOptions?: LayoutOptions | undefined;
    private _style;
    private _scale;
    private _layout;
    constructor({ layout, style, }: {
        layout: NetworkDiagramEdgeLayout;
        style?: Partial<EdgeStyle>;
    });
    get sources(): string[];
    get targets(): string[];
    get id(): string;
    get labels(): ElkLabel[] | undefined;
    get sections(): ElkEdgeSection[];
    setStyle(style: Partial<EdgeStyle>): void;
    get label(): string;
    get layout(): NetworkDiagramEdgeLayout;
    defaultStyle(): void;
    activeStyle(): void;
    focusStyle(): void;
    get section(): ElkEdgeSection;
    isPointNearEdge(point: Position, threshold?: number): boolean;
    draw(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, scale: number): void;
}