import { ElkNode, ElkPort, ElkExtendedEdge, ElkLabel, LayoutOptions } from "elkjs";
import { NetworkDiagramNode, NetworkDiagramNodeLayout, NetworkDiagramNodeStyle } from "./node.type";
export declare class RectNode implements NetworkDiagramNode {
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
    private offscreenCanvas;
    private offscreenCtx;
    private style;
    private _focusStyle;
    private _activeStyle;
    private scale;
    constructor({ layout, scale, style, focusStyle, activeStyle, }: {
        layout: NetworkDiagramNodeLayout;
        scale?: number;
        style?: Partial<NetworkDiagramNodeStyle>;
        focusStyle?: Partial<NetworkDiagramNodeStyle>;
        activeStyle?: Partial<NetworkDiagramNodeStyle>;
    });
    setStyle(style: Partial<NetworkDiagramNodeStyle>): void;
    defaultStyle(): void;
    activeStyle(): void;
    focusStyle(): void;
    get label(): string;
    get minX(): number;
    get minY(): number;
    get maxX(): number;
    get maxY(): number;
    renderOffscreen(scale: number): void;
    draw(ctx: CanvasRenderingContext2D): void;
}
