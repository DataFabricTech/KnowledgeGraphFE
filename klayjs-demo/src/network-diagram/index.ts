import { layoutDefault } from "./layout/layout";
import {
  NetworkDiagramEdgeInfo,
  NetworkDiagramNodeInfo,
} from "./layout/layout.type";
import { RenderingLayer } from "./renderingLayer/renderingLayer";
import { EventHandler, WindowLayer } from "./windowLayer/windowLayer";

export class NetworkDiagram {
  private _container: HTMLDivElement;
  private _scale: number;
  private _window?: WindowLayer;
  private _renderingLayer?: RenderingLayer;

  constructor({
    container,
    nodes,
    edges,
    eventHandler,
  }: {
    container: HTMLDivElement;
    nodes: NetworkDiagramNodeInfo[];
    edges: NetworkDiagramEdgeInfo[];
    eventHandler?: Partial<EventHandler>;
  }) {
    this._container = container;
    this._scale = 4;

    this.init({ nodes, edges, eventHandler });
  }
  private async init({
    nodes,
    edges,
    eventHandler,
  }: {
    nodes: NetworkDiagramNodeInfo[];
    edges: NetworkDiagramEdgeInfo[];
    eventHandler?: Partial<EventHandler>;
  }) {
    const layout = await layoutDefault({
      scale: this._scale,
      nodes,
      edges,
    });

    this._renderingLayer = new RenderingLayer({ layout, scale: this._scale });
    this._window = new WindowLayer({
      renderingLayer: this._renderingLayer,
      scale: this._scale,
      eventHandler,
      windowElement: this._container,
    });
  }

  cleanUp() {
    this._window?.detachEvent();
  }
}
