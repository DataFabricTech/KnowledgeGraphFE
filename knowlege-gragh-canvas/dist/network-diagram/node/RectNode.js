const DEFAULT_STYLE = {
    fontSize: 14,
    fontColor: "#fff",
    fontWeight: 500,
    backgroundColor: "#fff",
    outlineColor: "#000",
    outlineWeight: 2,
    outlineDiff: 0,
};
export class RectNode {
    constructor({ layout, scale = 1, style = {}, focusStyle = {}, activeStyle = {}, }) {
        this.scale = 1;
        this.id = layout.id;
        this.x = layout.x;
        this.y = layout.y;
        this.width = layout.width;
        this.height = layout.height;
        this.style = { ...DEFAULT_STYLE, ...style };
        this._activeStyle = activeStyle;
        this._focusStyle = focusStyle;
        this.offscreenCanvas = new OffscreenCanvas(layout.width, layout.height);
        this.offscreenCtx = this.offscreenCanvas.getContext("2d");
        this.renderOffscreen(scale);
    }
    setStyle(style) {
        // throw new Error('Method not implemented.');
    }
    defaultStyle() {
        // throw new Error('Method not implemented.');
    }
    activeStyle() {
        // throw new Error('Method not implemented.');
    }
    focusStyle() {
        // throw new Error('Method not implemented.');
    }
    get label() {
        return this.labels ? this.labels[0].text || this.id : this.id;
    }
    get minX() {
        return this.x;
    }
    get minY() {
        return this.y;
    }
    get maxX() {
        return this.x + this.width;
    }
    get maxY() {
        return this.y + this.height;
    }
    renderOffscreen(scale) {
        this.scale = scale;
        this.offscreenCanvas = new OffscreenCanvas(this.width, this.height);
        this.offscreenCtx = this.offscreenCanvas.getContext("2d");
        // Draw the node (circle with text)
        this.offscreenCtx.lineWidth = scale * 2;
        this.offscreenCtx.fillStyle = "#fff";
        this.offscreenCtx.fillRect(0, 0, this.width, this.height);
        this.offscreenCtx.strokeStyle = "black";
        this.offscreenCtx.strokeRect(0, 0, this.width, this.height);
    }
    draw(ctx) {
        ctx.drawImage(this.offscreenCanvas, 0, 0, this.offscreenCanvas.height, this.offscreenCanvas.height, this.x, this.y, this.offscreenCanvas.height, this.offscreenCanvas.height);
    }
}
