import { Position, Size } from "../index.type";
import { RenderingLayer } from "../renderingLayer/renderingLayer";

export type EventHandler = {
  onClick: (e: MouseEvent, elementId?: string) => void;
  onCtxClick: (e: MouseEvent, elementId?: string) => void;
  onHover: (e: MouseEvent, elementId?: string) => void;
};

export class WindowLayer {
  private _windowElement: HTMLDivElement;
  private _windowCanvas: HTMLCanvasElement | null = null;
  private _mapCanvas: HTMLCanvasElement | null = null;
  private _renderingLayer: RenderingLayer;

  private _dpiRatio: number = 2;
  private _size: Size = { width: 0, height: 0 };
  private _scale: number;

  private _position: Position = { x: 0, y: 0 };

  private _eventHandler: EventHandler;

  private _spaceHold = false;

  private _isRender = false;

  private get minScale() {
    return (
      Math.min(
        this._size.height / this._renderingLayer.size.height,
        this._size.width / this._renderingLayer.size.width
      ) / 2
    );
  }

  private get maxScale() {
    return 4;
  }

  constructor({
    windowElement,

    eventHandler = {},
    renderingLayer,
    scale,
  }: {
    windowElement: HTMLDivElement;

    eventHandler?: Partial<EventHandler>;
    renderingLayer: RenderingLayer;
    scale: number;
  }) {
    this._renderingLayer = renderingLayer;
    this._scale = 1 / scale;

    this._eventHandler = {
      onClick: () => {},
      onCtxClick: () => {},
      onHover: () => {},
      ...eventHandler,
    };

    this._windowElement = windowElement;

    this.init();
  }

  private convertPointToRenderLayout(point: Position) {
    let x = this._dpiRatio * point.x;
    x -= this._position.x;
    x /= this._scale;

    let y = this._dpiRatio * point.y;
    y -= this._position.y;
    y /= this._scale;

    return { x, y };
  }

  private get windowCanvas() {
    if (this._windowCanvas === null) {
      throw Error("canvas가 없습니다.");
    }
    return this._windowCanvas;
  }

  private get mapCanvas() {
    if (this._mapCanvas === null) {
      throw Error("canvas가 없습니다.");
    }
    return this._mapCanvas;
  }

  init() {
    this._windowElement.style.position = "relative";
    const canvas = document.createElement("canvas");
    canvas.setAttribute("style", "width: 100%; height: 100%");

    this._windowElement.appendChild(canvas);

    this._windowCanvas = canvas;

    this.resizeCanvas();

    this.detachEvent();
    this.attachEvent();

    this.initMap();
    this.render();

    this.initZoomNav();
  }
  private getIdFromMouseEvent = (e: MouseEvent) => {
    const position = {
      x: e.offsetX,
      y: e.offsetY,
    };
    const convertedPoint = this.convertPointToRenderLayout(position);
    const id = this._renderingLayer.getElementId(convertedPoint);

    return id;
  };

  attachEvent() {
    document.addEventListener("keydown", this.keydown);

    document.addEventListener("keyup", this.keyup);

    this.windowCanvas.addEventListener("mousedown", this.mousedown);

    this.windowCanvas.addEventListener("click", this.click);

    this.windowCanvas.addEventListener("mousemove", this.move);

    this.windowCanvas.addEventListener("contextmenu", this.contextMenu);

    this.windowCanvas.addEventListener("wheel", this.wheel);
  }

  detachEvent() {
    document.removeEventListener("keydown", this.keydown);

    document.removeEventListener("keyup", this.keyup);

    this.windowCanvas.removeEventListener("mousedown", this.mousedown);

    this.windowCanvas.removeEventListener("click", this.click);

    this.windowCanvas.removeEventListener("mousemove", this.move);

    this.windowCanvas.removeEventListener("contextmenu", this.contextMenu);

    this.windowCanvas.removeEventListener("wheel", this.wheel);
  }

  private click = (e: MouseEvent) => {
    const id = this.getIdFromMouseEvent(e);
    this._eventHandler.onClick(e, id);
  };

  private move = (e: MouseEvent) => {
    const id = this.getIdFromMouseEvent(e);
    this._eventHandler.onHover(e, id);
  };
  private contextMenu = (e: MouseEvent) => {
    const id = this.getIdFromMouseEvent(e);
    this._eventHandler.onCtxClick(e, id);
  };

  private wheel = (e: WheelEvent) => {
    e.preventDefault();

    if (e.deltaY > 0) {
      this.scaleUpWithPoint({
        x: e.offsetX * this._dpiRatio,
        y: e.offsetY * this._dpiRatio,
      });
    }
    if (e.deltaY < 0) {
      this.scaleDownWithPoint({
        x: e.offsetX * this._dpiRatio,
        y: e.offsetY * this._dpiRatio,
      });
    }

    this.render();
    // }
  };

  private keydown = (e: KeyboardEvent) => {
    if (e.shiftKey && e.key === "!") this.fitToWindow();
    if (e.keyCode === 32) {
      this._spaceHold = true;
    }
  };

  private keyup = (e: KeyboardEvent) => {
    if (e.keyCode === 32) {
      this._spaceHold = false;
    }
  };

  private mousedown = (e: MouseEvent) => {
    // if (this._spaceHold) {
    const movePosition = (e: MouseEvent) => {
      this.movePosition({ x: e.movementX, y: e.movementY });
      this.render();
    };

    const cleanUp = () => {
      document.removeEventListener("mousemove", movePosition);
      document.removeEventListener("mouseup", cleanUp);
    };

    document.addEventListener("mousemove", movePosition);
    document.addEventListener("mouseup", cleanUp);
    // return;
    // }
  };

  private resizeCanvas() {
    const rect = this.windowCanvas.getBoundingClientRect();
    this._size = {
      width: rect.width * this._dpiRatio,
      height: rect.height * this._dpiRatio,
    };
    this.windowCanvas.width = rect.width * this._dpiRatio;
    this.windowCanvas.height = rect.height * this._dpiRatio;

    this._position.x =
      (this._size.width - this._renderingLayer.size.width * this._scale) / 2;
    this._position.y =
      (this._size.height - this._renderingLayer.size.height * this._scale) / 2;
  }

  private movePosition(dPosition: Partial<Position>) {
    const { x, y } = dPosition;

    if (x) this.setPosition({ x: this._position.x + x * this._dpiRatio });
    if (y) this.setPosition({ y: this._position.y + y * this._dpiRatio });
  }

  private setPosition(position: Partial<Position>) {
    const { x, y } = position;
    if (x) {
      const renderWidth = this._renderingLayer.size.width * this._scale;
      const gap = Math.min(renderWidth, this._size.width) * 0.5;

      const maxX = Math.max(renderWidth, this._size.width) - gap;
      const minX = -renderWidth + gap;

      this._position.x = Math.max(minX, Math.min(maxX, x));
    }

    if (y) {
      const renderHeight = this._renderingLayer.size.height * this._scale;
      const gap = Math.min(renderHeight, this._size.height) * 0.5;
      const maxY = Math.max(renderHeight, this._size.height) - gap;
      const minY = -renderHeight + gap;
      this._position.y = Math.max(minY, Math.min(maxY, y));
    }
  }

  scaleUpWithPoint(point: Position, dRatio?: number) {
    const worldX = (point.x - this._position.x) / this._scale;
    const worldY = (point.y - this._position.y) / this._scale;

    this.scaleUp(dRatio);

    this.setPosition({
      x: point.x - worldX * this._scale,
      y: point.y - worldY * this._scale,
    });
  }

  scaleDownWithPoint(point: Position, dRatio: number = 1) {
    const worldX = (point.x - this._position.x) / this._scale;
    const worldY = (point.y - this._position.y) / this._scale;

    this.scaleDown(dRatio);

    this._position.x = point.x - worldX * this._scale;
    this._position.y = point.y - worldY * this._scale;
  }

  scaleUp(dRatio: number = 2) {
    const diffUnit = 0.01;
    const diff = Math.max(diffUnit, this._scale * diffUnit * dRatio);

    this.setScale(this._scale + diff);
  }
  scaleDown(dRatio: number = 2) {
    const diffUnit = 0.01;
    const diff = Math.max(diffUnit, this._scale * diffUnit * dRatio);
    this.setScale(this._scale - diff);
  }

  private setScale(scale: number) {
    this._scale = Math.max(this.minScale, Math.min(this.maxScale, scale));
  }

  fitToWindow() {
    this._scale = Math.min(
      this._size.height / this._renderingLayer.size.height,
      this._size.width / this._renderingLayer.size.width
    );

    this._position.x =
      (this._size.width - this._renderingLayer.size.width * this._scale) / 2;
    this._position.y =
      (this._size.height - this._renderingLayer.size.height * this._scale) / 2;

    this.render();
  }

  render() {
    if (this._isRender) {
      return;
    }
    this._isRender = true;

    requestAnimationFrame(() => {
      this._isRender = false;
    });

    const graph = this._renderingLayer.offscreenCanvas;
    const ctx = this.windowCanvas.getContext("2d")!;
    ctx.save();

    // ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.clearRect(0, 0, this._size.width, this._size.height);

    ctx.translate(this._position.x, this._position.y);
    ctx.scale(this._scale, this._scale);

    // ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(graph, 0, 0, graph.width, graph.height);

    ctx.restore();
    this.renderMap();
  }

  private renderMap() {
    const map = this.mapCanvas;

    const ctx = map.getContext("2d")!;
    ctx.save();
    ctx.clearRect(0, 0, map.width, map.height);
    const minMargin = 32;

    const graph = this._renderingLayer.offscreenCanvas;

    const scale = Math.min(
      (map.width - minMargin * 2) / graph.width,
      (map.height - minMargin * 2) / graph.height
    );

    const leftMargin = (map.width - graph.width * scale) / 2;
    const topMargin = (map.height - graph.height * scale) / 2;

    ctx.translate(leftMargin, topMargin);

    ctx.scale(scale, scale);

    ctx.drawImage(this._renderingLayer.offscreenCanvas, 0, 0);
    ctx.restore();

    const point = this.convertPointToRenderLayout({ x: 0, y: 0 });

    const view = {
      x: leftMargin + point.x * scale,
      y: topMargin + point.y * scale,
      width: (this._size.width * scale) / this._scale,
      height: (this._size.height * scale) / this._scale,
    };

    ctx.fillStyle = "gray";
    ctx.globalAlpha = 0.8;
    // ctx.fillRect(view.x, view.y, view.width, view.height);

    ctx.beginPath();
    ctx.rect(0, 0, map.width, map.height);
    ctx.rect(view.x, view.y, view.width, view.height);
    ctx.stroke;
    ctx.fillStyle = "gray";
    ctx.globalAlpha = 0.5;
    ctx.fill("evenodd");
    ctx.globalAlpha = 1.0;

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(view.x, view.y, view.width, view.height);

    ctx.restore();
  }

  private initZoomNav() {
    const nav = document.createElement("div");
    nav.style.position = "absolute";
    nav.style.bottom = "20px";
    nav.style.left = "20px";
    nav.style.border = "1px solid grey";
    nav.style.display = "flex";
    nav.style.flexDirection = "column";
    nav.style.background = "#fff";

    nav.innerHTML = `
      <button class="graph_nav_plus_btn" style="color: #000; width: 32px; height: 32px; border: none; outline: none; background-color: inherit; cursor: pointer;">${plus}</button>
      <button class="graph_nav_minus_btn" style="color: #000; width: 32px; height: 32px; border: none; outline: none; background-color: inherit; cursor: pointer;">${minus}</button>
      <button class="graph_nav_fullscreen_btn" style="color: #000; width: 32px; height: 32px; border: none; outline: none; background-color: inherit; cursor: pointer;">${fullscreen}</button>
    `;

    this._windowElement.appendChild(nav);

    nav.querySelector(".graph_nav_plus_btn")?.addEventListener("click", () => {
      this.scaleUpWithPoint(
        { x: this._size.width / 2, y: this._size.height / 2 },
        30
      );
      this.render();
    });

    nav.querySelector(".graph_nav_minus_btn")?.addEventListener("click", () => {
      this.scaleDownWithPoint(
        { x: this._size.width / 2, y: this._size.height / 2 },
        30
      );
      this.render();
    });

    nav
      .querySelector(".graph_nav_fullscreen_btn")
      ?.addEventListener("click", () => {
        this.fitToWindow();
        this.render();
      });
  }

  private initMap() {
    const map = document.createElement("canvas");
    map.style.position = "absolute";
    map.style.bottom = "20px";
    map.style.left = "72px";
    map.style.width = "196px";
    map.style.height = "128px";
    map.style.background = "#fff";
    map.style.border = "1px solid grey";

    map.width = 392;
    map.height = 256;

    this._windowElement.appendChild(map);
    this._mapCanvas = map;
  }
}

const plus = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159ZM4.25 6.5C4.25 6.22386 4.47386 6 4.75 6H6V4.75C6 4.47386 6.22386 4.25 6.5 4.25C6.77614 4.25 7 4.47386 7 4.75V6H8.25C8.52614 6 8.75 6.22386 8.75 6.5C8.75 6.77614 8.52614 7 8.25 7H7V8.25C7 8.52614 6.77614 8.75 6.5 8.75C6.22386 8.75 6 8.52614 6 8.25V7H4.75C4.47386 7 4.25 6.77614 4.25 6.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`;
const minus = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 10C8.433 10 10 8.433 10 6.5C10 4.567 8.433 3 6.5 3C4.567 3 3 4.567 3 6.5C3 8.433 4.567 10 6.5 10ZM6.5 11C7.56251 11 8.53901 10.6318 9.30884 10.0159L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L10.0159 9.30884C10.6318 8.53901 11 7.56251 11 6.5C11 4.01472 8.98528 2 6.5 2C4.01472 2 2 4.01472 2 6.5C2 8.98528 4.01472 11 6.5 11ZM4.75 6C4.47386 6 4.25 6.22386 4.25 6.5C4.25 6.77614 4.47386 7 4.75 7H8.25C8.52614 7 8.75 6.77614 8.75 6.5C8.75 6.22386 8.52614 6 8.25 6H4.75Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`;
const fullscreen = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0.75L9.75 3H5.25L7.5 0.75ZM7.5 14.25L9.75 12H5.25L7.5 14.25ZM3 5.25L0.75 7.5L3 9.75V5.25ZM14.25 7.5L12 5.25V9.75L14.25 7.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`;
