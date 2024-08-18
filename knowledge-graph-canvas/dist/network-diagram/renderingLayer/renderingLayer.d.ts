import { Position, Size } from "../index.type";
import { NetworkDiagramLayout } from "../layout/layout.type";
import { DiagramElementType } from "../windowLayer/windowLayer";
import { EdgeRenderingModule } from "./edgeRenderingModule";
import { NodeRenderingModule } from "./nodeRenderingModule";
export declare class RenderingLayer {
    private _size;
    private _offscreenCanvas;
    private _nodeRenderingModule;
    private _edgeRenderingModule;
    private _scale;
    constructor({ layout, scale, }: {
        layout: NetworkDiagramLayout;
        scale: number;
    });
    get nodeModule(): NodeRenderingModule;
    get edgeModule(): EdgeRenderingModule;
    setSize(size: {
        width: number;
        height: number;
    }): void;
    render(scale?: number): void;
    getElementId(position: Position): {
        id: string;
        type: DiagramElementType;
    } | undefined;
    get offscreenCanvas(): OffscreenCanvas;
    get size(): Size;
}
export interface RenderingModule {
    getElementId(position: Position): string | undefined;
    offscreenCanvas: OffscreenCanvas;
    render(scale?: number): void;
}
