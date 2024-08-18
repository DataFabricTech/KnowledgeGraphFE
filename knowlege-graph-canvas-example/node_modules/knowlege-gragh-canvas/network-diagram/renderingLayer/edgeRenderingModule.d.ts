import { DefaultEdge } from "../edge/defaultEdge";
import { NetworkDiagramEdgeMeta } from "../edge/edge.type";
import { Position, Size } from "../index.type";
import { RenderingModule } from "./renderingLayer";
export declare class EdgeRenderingModule implements RenderingModule {
    private _offscreenCanvas;
    private _edges;
    private _scale;
    constructor({ size, edges, scale, }: {
        size: Size;
        edges: NetworkDiagramEdgeMeta[];
        scale: number;
    });
    addEdges(edges: NetworkDiagramEdgeMeta[]): void;
    get edges(): DefaultEdge[];
    setSize(size: Size): void;
    getElementId(position: Position): string | undefined;
    get offscreenCanvas(): OffscreenCanvas;
    render(scale?: number): void;
}
