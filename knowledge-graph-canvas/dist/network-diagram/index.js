import { layoutDefault } from "./layout/layout";
import { RenderingLayer } from "./renderingLayer/renderingLayer";
import { WindowLayer } from "./windowLayer/windowLayer";
const QUALITY_SCALE_MAP = {
    low: 1,
    middle: 2,
    high: 4,
};
export class NetworkDiagram {
    constructor({ container, nodes, edges, eventHandler, pixelQuality = "middle", edgeLength, }) {
        this._container = container;
        this._scale = QUALITY_SCALE_MAP[pixelQuality];
        this._edgeLength = edgeLength;
        this.init({ nodes, edges, eventHandler });
    }
    async init({ nodes, edges, eventHandler, }) {
        const layout = await layoutDefault({
            scale: this._scale,
            nodes,
            edges,
            edgeLength: this._edgeLength,
        });
        this._renderingLayer = new RenderingLayer({ layout, scale: this._scale });
        this._window = new WindowLayer({
            renderingLayer: this._renderingLayer,
            scale: this._scale,
            eventHandler,
            windowElement: this._container,
        });
    }
    async addElement({ nodes, edges, }) {
        if (!this._renderingLayer) {
            throw Error("init 실행되지 않음.");
        }
        const layout = await layoutDefault({
            scale: this._scale,
            nodes: [
                ...this._renderingLayer.nodeModule.nodes.map((node) => node.layout),
                ...nodes,
            ],
            edges: [
                ...this._renderingLayer.edgeModule.edges.map((node) => node.layout),
                ...edges,
            ],
            edgeLength: this._edgeLength,
        });
        this._renderingLayer.nodeModule.nodes.forEach((node) => node.adjustScale(this._scale));
        this._renderingLayer.nodeModule.addNodes(nodes);
        this._renderingLayer.edgeModule.addEdges(edges);
        this._renderingLayer.setSize({
            width: layout.width,
            height: layout.height,
        });
        this._renderingLayer.nodeModule.render();
        this._renderingLayer.edgeModule.render();
        this._renderingLayer.render();
        this._window?.render();
    }
    cleanUp() {
        this._window?.detachEvent();
    }
}
