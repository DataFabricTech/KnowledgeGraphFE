import { ElkPoint, ElkLabel, LayoutOptions, ElkEdgeSection } from "elkjs";
import { EdgeStyle, NetworkDiagramEdge, NetworkDiagramEdgeLayout } from "./edge.type";
import { GlobalStyle, Position } from "../index.type";
export declare class DefaultEdge implements NetworkDiagramEdge {
    junctionPoints?: ElkPoint[] | undefined;
    layoutOptions?: LayoutOptions | undefined;
    private _style;
    private _scale;
    private _layout;
    private _globalStyle;
    constructor({ layout, style, globalStyle, }: {
        layout: NetworkDiagramEdgeLayout;
        style?: Partial<EdgeStyle>;
        globalStyle: Partial<GlobalStyle>;
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
