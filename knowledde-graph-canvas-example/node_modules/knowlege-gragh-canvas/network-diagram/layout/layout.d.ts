import { NetworkDiagramEdgeInfo, NetworkDiagramLayout, NetworkDiagramNodeInfo } from "./layout.type";
export declare const layoutDefault: ({ nodes, edges, scale, nodeSpacing, edgeLength, }: {
    nodes: NetworkDiagramNodeInfo[];
    edges: NetworkDiagramEdgeInfo[];
    scale: number;
    nodeSpacing?: number;
    edgeLength?: number;
}) => Promise<NetworkDiagramLayout>;
