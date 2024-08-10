import { Position, Size } from "../index.type";
import { RenderingLayer } from "../renderingLayer/renderingLayer";

type EventHandler = {
  onClick: (e: MouseEvent, elementId?: string) => void;
  onCtxClick: (e: MouseEvent, elementId?: string) => void;
  onHover: (e: MouseEvent, elementId?: string) => void;
};

class WindowLayer {
  private _windowCanvas: HTMLCanvasElement | null = null;
  private _renderingLayer: RenderingLayer;

  private _dpiRatio: number = 2;
  private _size: Size = { width: 0, height: 0 };
  private _scale: number = 1;

  private _position: Position = { x: 0, y: 0 };
  private _minScale: number = 0.2;
  private _maxScale: number = 5;

  private _eventHandler: EventHandler;

  constructor({
    canvasElement,
    eventHandler = {},
    renderingLayer,
  }: {
    canvasElement?: HTMLCanvasElement;
    eventHandler?: Partial<EventHandler>;
    renderingLayer: RenderingLayer;
  }) {
    this._renderingLayer = renderingLayer;
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

    let spacePress = false;

    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 32) {
        spacePress = true;
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.keyCode === 32) {
        spacePress = false;
      }
    });

    const getId = (e: MouseEvent) => {
      const position = {
        x: e.offsetX,
        y: e.offsetY,
      };
      const convertedPoint = this.convertPointToRenderLayout(position);
      const id = this._renderingLayer.getElementId(convertedPoint);

      return id;
    };

    this._windowCanvas.addEventListener("click", (e) => {
      if (spacePress) {
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
        return;
      }

      const id = getId(e);
      this._eventHandler.onClick(e, id);
    });

    this._windowCanvas.addEventListener("mousemove", (e) => {
      const id = getId(e);
      this._eventHandler.onHover(e, id);
    });

    this._windowCanvas.addEventListener("contextmenu", (e) => {
      const id = getId(e);
      this._eventHandler.onCtxClick(e, id);
    });

    this._windowCanvas.addEventListener("wheel", (e) => {
      e.preventDefault();

      if (e.metaKey || e.ctrlKey) {
        const worldX = (e.offsetX - this._position.x) / this._scale;

        const worldY = (e.offsetY - this._position.y) / this._scale;

        if (e.deltaY > 0) {
          this.scaleUp();
        }
        if (e.deltaY < 0) {
          this.scaleDown();
        }

        this.setPosition({
          x: (e.offsetX - worldX * this._scale) * 2,
          y: (e.offsetY - worldY * this._scale) * 2,
        });

        this.render();
      }
    });
  }

  private resizeCanvas() {
    const rect = this.windowCanvas.getBoundingClientRect();
    this._size = {
      width: rect.width * this._dpiRatio,
      height: rect.height * this._dpiRatio,
    };
    this.windowCanvas.width = rect.width * this._dpiRatio;
    this.windowCanvas.height = rect.height * this._dpiRatio;

    this._position.x = (this._size.width - this._renderingLayer.size.width) / 2;
    this._position.y =
      (this._size.height - this._renderingLayer.size.height) / 2;
  }

  private movePosition(dPosition: Partial<Position>) {
    const { x, y } = dPosition;
    if (x) this.setPosition({ x: this._position.x + x });
    if (y) this.setPosition({ y: this._position.y + y });
  }

  private setPosition(position: Partial<Position>) {
    const { x, y } = position;
    if (x) {
      const renderWidth = this._renderingLayer.size.width * this._scale;
      const maxX = Math.max(renderWidth, this._size.width);
      const minX = -this._size.width;

      this._position.x = Math.max(minX, Math.min(maxX, x));
    }

    if (y) {
      const renderHeight = this._renderingLayer.size.height * this._scale;
      const maxY = Math.max(renderHeight, this._size.height);
      const minY = -this._size.height;
      this._position.x = Math.max(minY, Math.min(maxY, y));
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

  render() {
    const graph = this._renderingLayer.offscreenCanvas;
    const ctx = this.windowCanvas.getContext("2d")!;
    ctx.save();

    // ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.clearRect(0, 0, this._size.width, this._size.height);

    // console.log(graph.width);

    // const move = { dx: 0, dy: 0 };

    ctx.translate(this._position.x, this._position.y);
    ctx.scale(this._scale, this._scale);

    // ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(graph, 0, 0, graph.width, graph.height);

    ctx.restore();
  }
}
