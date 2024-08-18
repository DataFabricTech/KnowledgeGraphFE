const DEFAULT_STYLE = {
    fontSize: 30,
    fontColor: "#fff",
    fontWeight: 500,
    backgroundColor: "blue",
    outlineColor: "#000",
    outlineWeight: 2,
    outlineDiff: 4,
};
export class CircleNode {
    constructor({ layout, scale = 1, style = {}, focusStyle = {}, activeStyle = {}, }) {
        this.scale = 1;
        this._layout = layout;
        this._layout.width = this._layout.width / scale;
        this._layout.height = this._layout.height / scale;
        this.scale = scale;
        this.style = { ...DEFAULT_STYLE, ...style };
        this._activeStyle = activeStyle;
        this._focusStyle = focusStyle;
        this.label = layout.labels ? layout.labels[0].text || layout.id : layout.id;
        this.offscreenCanvas = new OffscreenCanvas(layout.width, layout.height);
        this.offscreenCtx = this.offscreenCanvas.getContext("2d");
        this.renderOffscreen(scale);
    }
    get id() {
        return this._layout.id;
    }
    get x() {
        return this._layout.x;
    }
    get y() {
        return this._layout.y;
    }
    get width() {
        return this._layout.width * this.scale;
    }
    get height() {
        return this._layout.height * this.scale;
    }
    get radius() {
        return (this._layout.height / 2) * this.scale;
    }
    get layout() {
        return this._layout;
    }
    adjustScale(scale) {
        this._layout.width /= scale;
        this._layout.height /= scale;
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
    get minX() {
        return this.x - this.circleDiff;
    }
    get minY() {
        return this.y - this.circleDiff;
    }
    get maxX() {
        return this.x + this.width + this.circleDiff;
    }
    get maxY() {
        return this.y + this.height + this.circleDiff;
    }
    get circleDiff() {
        return this.height * 0.12;
    }
    renderCircle() {
        const ctx = this.offscreenCtx;
        this.offscreenCtx.lineWidth = this.scale * this.style.outlineWeight;
        ctx.beginPath();
        ctx.arc(this.radius + this.circleDiff, this.radius + this.circleDiff, this.radius + this.circleDiff, 0, Math.PI * 2, false);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.radius + this.circleDiff, this.radius + this.circleDiff, this.radius +
            this.circleDiff -
            (this.style.outlineWeight + this.style.outlineDiff) * this.scale, 0, Math.PI * 2, false);
        ctx.fillStyle = this.style.backgroundColor;
        ctx.fill();
    }
    renderOutLine() {
        const ctx = this.offscreenCtx;
        ctx.beginPath();
        ctx.arc(this.radius + this.circleDiff, this.radius + this.circleDiff, this.radius +
            this.circleDiff -
            (this.style.outlineWeight * this.scale) / 2, 0, Math.PI * 2, false);
        // ctx.fillStyle = "green";
        // ctx.fill();
        ctx.lineWidth = this.style.outlineWeight * this.scale;
        ctx.strokeStyle = this.style.outlineColor;
        ctx.stroke();
    }
    renderLabel() {
        this.offscreenCtx.lineWidth = this.scale * 2;
        this.offscreenCtx.beginPath();
        this.offscreenCtx.font = `${this.style.fontSize * this.scale}px serif`;
        this.offscreenCtx.fillStyle = this.style.fontColor;
        this.offscreenCtx.textAlign = "center";
        this.offscreenCtx.fillText(this.label, this.radius + this.circleDiff, this.radius + this.circleDiff + (this.style.fontSize * this.scale) / 3);
    }
    renderOffscreen(scale) {
        this.scale = scale;
        this.offscreenCanvas = new OffscreenCanvas(this.radius * 2 + this.circleDiff * 2, this.radius * 2 + this.circleDiff * 2);
        this.offscreenCtx = this.offscreenCanvas.getContext("2d");
        this.renderCircle();
        this.renderLabel();
        this.renderOutLine();
    }
    draw(ctx) {
        ctx.drawImage(this.offscreenCanvas, 0, 0, this.offscreenCanvas.height, this.offscreenCanvas.height, this.x - this.circleDiff, this.y - this.circleDiff, this.offscreenCanvas.height, this.offscreenCanvas.height);
    }
}
