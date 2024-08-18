import { DefaultEdge } from "../edge/defaultEdge";
export class EdgeRenderingModule {
    constructor({ size, edges, scale, }) {
        this._offscreenCanvas = new OffscreenCanvas(size.width, size.height);
        this._scale = scale;
        this._edges = edges.map((meta) => {
            const edge = new DefaultEdge({
                layout: meta,
                // focusStyle: meta.focusStyle,
                style: meta.style,
                // activeStyle: meta.activeStyle,
                // scale: scale,
            });
            return edge;
        });
    }
    addEdges(edges) {
        edges.forEach((meta) => {
            const edge = new DefaultEdge({
                layout: meta,
                style: meta.style,
            });
            this._edges.push(edge);
        });
    }
    get edges() {
        return this._edges;
    }
    setSize(size) {
        this._offscreenCanvas = new OffscreenCanvas(size.width, size.height);
    }
    getElementId(position) {
        const ctx = this._offscreenCanvas.getContext("2d");
        const imageData = ctx.getImageData(position.x - 3 * this._scale, position.y - 3 * this._scale, 6 * this._scale, 6 * this._scale);
        const isDraw = imageData.data.some((value) => value !== 0);
        if (!isDraw) {
            return;
        }
        const edge = this._edges.find((edge) => edge.isPointNearEdge(position));
        if (!edge) {
            return;
        }
        return edge.id;
    }
    get offscreenCanvas() {
        return this._offscreenCanvas;
    }
    render(scale) {
        if (scale) {
            this._scale = scale;
        }
        const ctx = this._offscreenCanvas.getContext("2d");
        ctx.clearRect(0, 0, this._offscreenCanvas.width, this._offscreenCanvas.height);
        this._edges.forEach((edge) => {
            edge.draw(ctx, this._scale);
        });
    }
}
