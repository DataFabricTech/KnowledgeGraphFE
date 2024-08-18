import { NetworkDiagramEdgeInfo, NetworkDiagramNodeInfo } from "./layout/layout.type";
import { EventHandler } from "./windowLayer/windowLayer";
export type Size = {
    width: number;
    height: number;
};
export type Position = {
    x: number;
    y: number;
};
export type PixelQuality = "low" | "middle" | "high";
export type NetworkDiagramProps = {
    container: HTMLDivElement;
    nodes: NetworkDiagramNodeInfo[];
    edges: NetworkDiagramEdgeInfo[];
    eventHandler?: Partial<EventHandler>;
    pixelQuality?: PixelQuality;
    edgeLength?: number;
};