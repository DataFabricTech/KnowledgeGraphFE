import RBush from "rbush";
import { CircleNode } from "../node/CircleNode";
class NodeRTree extends RBush {
}
export class NodeRenderingModule {
    constructor({ size, nodes, scale, }) {
        this._offscreenCanvas = new OffscreenCanvas(size.width, size.height);
        this._rTree = new NodeRTree();
        this._scale = scale;
        this._nodes = nodes.map((meta) => {
            const node = new CircleNode({
                layout: meta,
                focusStyle: meta.focusStyle,
                style: meta.style,
                activeStyle: meta.activeStyle,
                scale: scale,
            });
            return node;
        });
        this._rTree.load(this._nodes);
    }
    get nodes() {
        return this._nodes;
    }
    addNodes(nodes) {
        nodes.forEach((meta) => {
            const node = new CircleNode({
                layout: meta,
                focusStyle: meta.focusStyle,
                style: meta.style,
                activeStyle: meta.activeStyle,
                scale: this._scale,
            });
            this._nodes.push(node);
        });
        this._rTree = new NodeRTree();
        this._rTree.load(this._nodes);
    }
    getElementId(position) {
        const diff = this._scale * 2;
        const item = this._rTree.search({
            minX: position.x - diff,
            maxX: position.x + diff,
            minY: position.y - diff,
            maxY: position.y + diff,
        });
        if (item[0]) {
            return item[0].id;
        }
        return;
    }
    get offscreenCanvas() {
        return this._offscreenCanvas;
    }
    setSize(size) {
        this._offscreenCanvas = new OffscreenCanvas(size.width, size.height);
    }
    render(scale) {
        if (scale) {
            this._scale = scale;
        }
        const ctx = this._offscreenCanvas.getContext("2d");
        ctx.clearRect(0, 0, this._offscreenCanvas.width, this._offscreenCanvas.height);
        this._nodes.forEach((node) => {
            node.draw(ctx);
        });
    }
}
