import { Position, Size } from "../index.type";
import { RenderingLayer } from "../renderingLayer/renderingLayer";

export type EventHandler = {
  onClick: (e: MouseEvent, elementId?: string) => void;
  onCtxClick: (e: MouseEvent, elementId?: string) => void;
  onHover: (e: MouseEvent, elementId?: string) => void;
};

export class WindowLayer {
  private _windowCanvas: HTMLCanvasElement | null = null;
  private _renderingLayer: RenderingLayer;

  private _dpiRatio: number = 2;
  private _size: Size = { width: 0, height: 0 };
  private _scale: number;

  private _position: Position = { x: 0, y: 0 };
  private _minScale: number = 0.2;
  private _maxScale: number = 5;

  private _eventHandler: EventHandler;

  private _spaceHold = false;

  constructor({
    canvasElement,
    eventHandler = {},
    renderingLayer,
    scale,
  }: {
    canvasElement?: HTMLCanvasElement;
    eventHandler?: Partial<EventHandler>;
    renderingLayer: RenderingLayer;
    scale: number;
  }) {
    this._renderingLayer = renderingLayer;
    this._scale = 1 / Math.sqrt(scale);
    this._eventHandler = {
      onClick: () => {},
      onCtxClick: () => {},
      onHover: () => {},
      ...eventHandler,
    };

    if (canvasElement) {
      this.setElement(canvasElement);
    }
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

  setElement(element: HTMLCanvasElement) {
    this._windowCanvas = element;
    this.resizeCanvas();

    this.detachEvent();
    this.attachEvent();

    this.render();
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

    // if (e.metaKey || e.ctrlKey) {
    const worldX =
      (e.offsetX * this._dpiRatio - this._position.x) / this._scale;

    const worldY =
      (e.offsetY * this._dpiRatio - this._position.y) / this._scale;

    if (e.deltaY > 0) {
      this.scaleUp();
    }
    if (e.deltaY < 0) {
      this.scaleDown();
    }

    // offsetX = (worldX / this._scale + this._position.x) * this._dpiRatio;

    // offsetX * this._dpiRatio -   worldX * this._scale = (this._position.x +)

    this.setPosition({
      x: e.offsetX * this._dpiRatio - worldX * this._scale,
      y: e.offsetY * this._dpiRatio - worldY * this._scale,
    });

    this.render();
    // }
  };

  private keydown = (e: KeyboardEvent) => {
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
      const gap = renderWidth * 0.5;

      const maxX = Math.max(renderWidth, this._size.width) - gap;
      const minX = -renderWidth + gap;

      this._position.x = Math.max(minX, Math.min(maxX, x));
    }

    if (y) {
      const renderHeight = this._renderingLayer.size.height * this._scale;
      const gap = renderHeight * 0.5;
      const maxY = Math.max(renderHeight, this._size.height) - gap;
      const minY = -renderHeight + gap;
      this._position.y = Math.max(minY, Math.min(maxY, y));
    }
  }

  scaleUp(dRatio: number = 1) {
    this.setScale(this._scale + dRatio * 0.02);
  }
  scaleDown(dRatio: number = 1) {
    this.setScale(this._scale - dRatio * 0.02);
  }

  private setScale(scale: number) {
    this._scale = Math.max(this._minScale, Math.min(this._maxScale, scale));
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
  }
}
