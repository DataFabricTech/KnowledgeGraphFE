import { NetworkDiagramProps } from "./index.type";
import { NetworkDiagramEdgeInfo, NetworkDiagramNodeInfo } from "./layout/layout.type";
export declare class NetworkDiagram {
    private _container;
    private _scale;
    private _window?;
    private _renderingLayer?;
    private _edgeLength?;
    private _nodeSpacing?;
    constructor({ container, nodes, edges, eventHandler, pixelQuality, edgeLength, nodeSpacing, isFitScreenInit, }: NetworkDiagramProps);
    private init;
    addElement({ nodes, edges, }: {
        nodes: NetworkDiagramNodeInfo[];
        edges: NetworkDiagramEdgeInfo[];
    }): Promise<void>;
    cleanUp(): void;
}
