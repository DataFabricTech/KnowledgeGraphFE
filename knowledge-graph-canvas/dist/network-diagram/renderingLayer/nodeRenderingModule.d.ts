import { Position, Size } from "../index.type";
import { RenderingModule } from "./renderingLayer";
import { NetworkDiagramNodeMeta } from "../node/node.type";
import { CircleNode } from "../node/CircleNode";
export declare class NodeRenderingModule implements RenderingModule {
    private _offscreenCanvas;
    private _rTree;
    private _nodes;
    private _scale;
    constructor({ size, nodes, scale, }: {
        size: Size;
        nodes: NetworkDiagramNodeMeta[];
        scale: number;
    });
    get nodes(): CircleNode[];
    addNodes(nodes: NetworkDiagramNodeMeta[]): void;
    getElementId(position: Position): string | undefined;
    get offscreenCanvas(): OffscreenCanvas;
    setSize(size: Size): void;
    render(scale?: number): void;
}
