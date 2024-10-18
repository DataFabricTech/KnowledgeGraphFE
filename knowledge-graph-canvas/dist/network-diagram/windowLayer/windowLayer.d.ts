import { Position } from "../index.type";
import { RenderingLayer } from "../renderingLayer/renderingLayer";
export type DiagramElementType = "node" | "edge";
export type EventHandler = {
    onClick: (e: MouseEvent, elementId?: string, type?: DiagramElementType) => void;
    onCtxClick: (e: MouseEvent, elementId?: string, type?: DiagramElementType) => void;
    onHover: (e: MouseEvent, elementId?: string, type?: DiagramElementType) => void;
};
export declare class WindowLayer {
    private _windowElement;
    private _windowCanvas;
    private _mapCanvas;
    private _renderingLayer;
    private _dpiRatio;
    private _size;
    private _scale;
    private _position;
    private _eventHandler;
    private _spaceHold;
    private _isRender;
    private get minScale();
    private get maxScale();
    constructor({ windowElement, eventHandler, renderingLayer, scale, isFitScreenInit, }: {
        windowElement: HTMLDivElement;
        eventHandler?: Partial<EventHandler>;
        renderingLayer: RenderingLayer;
        scale: number;
        isFitScreenInit?: boolean;
    });
    private convertPointToRenderLayout;
    private get windowCanvas();
    private get mapCanvas();
    init({ isFitScreenInit }: {
        isFitScreenInit?: boolean;
    }): void;
    private getIdFromMouseEvent;
    attachEvent(): void;
    detachEvent(): void;
    private click;
    private move;
    private contextMenu;
    private wheel;
    private keydown;
    private keyup;
    private mousedown;
    private resizeCanvas;
    private movePosition;
    private setPosition;
    scaleUpWithPoint(point: Position, dRatio?: number): void;
    scaleDownWithPoint(point: Position, dRatio?: number): void;
    scaleUp(dRatio?: number): void;
    scaleDown(dRatio?: number): void;
    private setScale;
    fitToWindow(): void;
    render(): void;
    private renderMap;
    private initZoomNav;
    private initMap;
}
