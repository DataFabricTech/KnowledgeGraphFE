import { EdgeRenderingModule } from "./edgeRenderingModule";
import { NodeRenderingModule } from "./nodeRenderingModule";
export class RenderingLayer {
    constructor({ layout, scale, }) {
        this._size = { width: layout.width, height: layout.height };
        this._scale = scale;
        this._offscreenCanvas = new OffscreenCanvas(layout.width, layout.height);
        this._nodeRenderingModule = new NodeRenderingModule({
            size: this._size,
            nodes: layout.children,
            scale,
        });
        this._nodeRenderingModule.render(scale);
        this._edgeRenderingModule = new EdgeRenderingModule({
            scale,
            size: this._size,
            edges: layout.edges,
        });
        this._edgeRenderingModule.render(scale);
        this.render();
    }
    get nodeModule() {
        return this._nodeRenderingModule;
    }
    get edgeModule() {
        return this._edgeRenderingModule;
    }
    setSize(size) {
        this._size = size;
        this._offscreenCanvas = new OffscreenCanvas(size.width, size.height);
        this._nodeRenderingModule.setSize(size);
        this._edgeRenderingModule.setSize(size);
    }
    render(scale) {
        if (scale) {
            this._scale = scale;
        }
        const ctx = this._offscreenCanvas.getContext("2d");
        ctx.clearRect(0, 0, this._offscreenCanvas.width, this._offscreenCanvas.height);
        ctx.drawImage(this._edgeRenderingModule.offscreenCanvas, 0, 0);
        ctx.drawImage(this._nodeRenderingModule.offscreenCanvas, 0, 0);
    }
    getElementId(position) {
        const nodeId = this._nodeRenderingModule.getElementId(position);
        if (nodeId) {
            return nodeId;
        }
        const edgeId = this._edgeRenderingModule.getElementId(position);
        return edgeId;
    }
    get offscreenCanvas() {
        return this._offscreenCanvas;
    }
    get size() {
        return this._size;
    }
}
