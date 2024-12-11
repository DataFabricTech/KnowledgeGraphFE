import cytoscape, { ElementDefinition, Stylesheet } from "cytoscape";
import cola from "cytoscape-cola";
import fcose from "cytoscape-fcose";
import elk from "cytoscape-elk";
import { Visualization } from "./type";
import { getDemoData, getRelationData } from "@/components/canvas/data/getData";
import { convertRelation } from "@/components/canvas/data/convert";
import { RootStore } from "./rootStore";
import { makeAutoObservable, toJS } from "mobx";
import { getColorInterpolator } from "@/util/gradientColor";

export class RelationVisualizationStore implements Visualization {
  private _root: RootStore;

  private _core: cytoscape.Core | null = null;
  private _container: HTMLDivElement | null = null;
  private _id: string;

  private _style: "gradient" | "brightness" | "thickness";
  private _scoreRange: [number, number];
  private _filterOption: "all" | "5" | "10" | "20" | "score" = "5";
  private _isExpand: boolean = false;

  private _elements: Map<
    string,
    { nodes: ElementDefinition[]; edges: ElementDefinition[] }
  > = new Map();
  private _isLoading: boolean = false;

  private _nodeClickHandler = (e: any) => {
    const node = e.target;

    this.expand(node.data().id);

    this.render();
  };

  private _nodeCtxHandler = (e: any) => {
    const DO = e.target.data();
    this._root.setMenuNode(DO);
  };

  constructor({
    id,
    root,
    scoreRange,
    style,
  }: {
    id: string;
    root: RootStore;
    scoreRange?: [number, number];
    style?: "gradient" | "brightness" | "thickness";
  }) {
    this._root = root;
    this._id = id;
    this._scoreRange = scoreRange || [0, 100];
    this._style = style || "gradient";

    this._init();

    this._nodeClickHandler = this._nodeClickHandler.bind(this);
    this._nodeCtxHandler = this._nodeCtxHandler.bind(this);
    this.setContainer = this.setContainer.bind(this);

    makeAutoObservable(this);
  }

  private async _init() {
    this._isLoading = true;
    // const data = await getRelationData(this._id);
    const data = await getDemoData();

    this._elements.set("origin", convertRelation(data, { targetId: this._id }));

    this._isLoading = false;
  }

  get filterOption() {
    return this._filterOption;
  }

  setFilterOption(option: "all" | "5" | "10" | "20" | "score") {
    this._filterOption = option;

    this._elements.forEach((value, key) => {
      if (this._id !== key && key !== "origin") {
        this._elements.delete(key);
      }
    });
    this._isExpand = false;
    this.render();
  }

  async expand(id: string) {
    if (id === "origin" || this._id === id) {
      return;
    }
    if (this._elements.has(id)) {
      this._isExpand = false;
      this._elements.delete(id);

      return;
    }

    this._isExpand = true;

    this._isLoading = true;

    const data = await getRelationData(id);

    const elements = convertRelation(data, {
      targetPosition: this._core?.elements(`#${id}`).position(),
    });

    this._elements.set(id, elements);

    this._isLoading = false;
  }

  get type() {
    return "relation" as const;
  }

  setContainer(el?: HTMLDivElement) {
    this._container = el || null;
    this.render();
  }

  async render() {
    if (this._isLoading) {
      requestAnimationFrame(() => {
        this.render();
      });

      return;
    }

    if (this._container === null) {
      return null;
    }

    if (this._core === null) {
      cytoscape.use(cola);
      cytoscape.use(fcose);
      // cytoscape.use(elk);

      this._core = cytoscape({
        container: this._container,

        layout: this.layoutConfig,

        style: this.stylesheet,

        elements: this.elements,

        // initial viewport state:
        // zoom: 1,
        // pan: { x: 0, y: 0 },

        // interaction options:
        minZoom: 1e-1,
        maxZoom: 1e1,
        zoomingEnabled: true,
        userZoomingEnabled: true,
        panningEnabled: true,
        userPanningEnabled: true,
        boxSelectionEnabled: true,
        selectionType: "single",
        touchTapThreshold: 8,
        desktopTapThreshold: 4,
        autolock: false,
        autoungrabify: false,
        autounselectify: false,

        // rendering options:
        headless: false,
        styleEnabled: true,
        hideEdgesOnViewport: false,
        textureOnViewport: false,
        motionBlur: false,
        motionBlurOpacity: 0.2,
        wheelSensitivity: 1,
        pixelRatio: "auto",
      });
    } else {
      this._core.add(this.elements);
      this._core.json({
        // ...this._core.json(),
        elements: this.elements,
        style: this.stylesheet,
      });

      this._core.$id(this._id).data("isTarget", true);

      this._core.layout(this.layoutConfig).run();
    }

    this._core.nodes().off("click", undefined, this._nodeClickHandler);

    this._core.nodes().on("click", this._nodeClickHandler);

    this._core.nodes().off("cxttap", undefined, this._nodeCtxHandler);

    this._core.nodes().on("cxttap", this._nodeCtxHandler);

    // this._core.nodes().on("doubleTap", (e) => {
    //   console.log("double");
    //   const node = e.target;

    //   this.expand(node.data().id);
    //   this.render();
    // });
  }

  get core() {
    return this._core;
  }

  get layoutConfig() {
    return {
      name: "cola",
      // animate: true,
      animationEasing: "ease-out",
      animationDuration: 500,
      nodeRepulsion: 100,
      nodeSeparation: 75,
      maxSimulationTime: 2000,
      fit: false,
      padding: 300,
      // idealEdgeLength: (edge) => {
      //   return 130;
      // },
    };
  }

  get stylesheet(): Stylesheet[] {
    return [
      {
        selector: "node[label]",
        style: {
          label: "data(label)",
        },
      },
      {
        selector: "node",
        style: {
          "background-color": "#fff",
          "border-color": (ele) => {
            const color = ele.data().color;

            return color;
          },
          "border-width": 1,
          "text-valign": "center",
          "text-halign": "center",
          "font-weight": 500,
          color: function (ele) {
            return ele.data().isTarget ? "#EF3F3F" : "#000";
          },
          "border-style": (ele) => {
            return this._elements.has(ele.data().id) ? "dotted" : "solid";
          },

          height: 60,
          width: 60,
        },
      },
      {
        selector: ":selected",
        style: {
          "font-weight": 600,
        },
      },

      {
        selector: ":parent",
        style: {
          "background-opacity": 0,
        },
      },

      {
        selector: "edge",
        style: {
          width: (ele) => {
            if (this.style === "thickness") {
              return Math.ceil(ele.data().score * 5);
            }

            return 3;
          },
          "line-color": (ele) => {
            if (this.style === "gradient") {
              return interpolator(ele.data().score);
            }

            return "#000";
          },
          "line-opacity": (ele) => {
            if (this.style === "brightness") {
              return ele.data().score;
            }

            return 1;
          },
        },
      },
    ];
  }

  get style() {
    return this._style;
  }

  setStyle(style: "gradient" | "brightness" | "thickness") {
    this._style = style;

    this._core?.style(this.stylesheet);
  }

  get scoreRange() {
    return this._scoreRange;
  }

  setScoreRange(range: [number, number]) {
    this._scoreRange = range;

    this._elements.forEach((value, key) => {
      if (this._id !== key && key !== "origin") {
        this._elements.delete(key);
      }
    });
    this._isExpand = false;
    this.render();
  }

  get elements() {
    let groupEdges: ElementDefinition[][] = Array.from(
      this._elements.values()
    ).map((e) => e.edges);

    if (this._filterOption === "score") {
      groupEdges = groupEdges.map((e) =>
        e.filter(
          (edge) =>
            edge.data.score <= this._scoreRange[1] / 100 &&
            edge.data.score >= this._scoreRange[0] / 100
        )
      );
    }

    if (["5", "10", "20"].includes(this._filterOption)) {
      groupEdges = groupEdges.map((item) =>
        item
          .slice()
          .sort((prev, curr) => curr.data.score - prev.data.score)
          .slice(0, Number(this._filterOption))
      );
    }
    const edges = groupEdges.flatMap((_) => _);

    const ori = Array.from(this._elements.values());

    const nodes = ori
      .map((e) => e.nodes)
      .map((e, i) =>
        e.filter((node) => {
          return groupEdges[i].some(
            (edge) =>
              edge.data.source === node.data.id ||
              edge.data.target === node.data.id
          );
        })
      )
      .flatMap((e, index) => {
        console.log(index, toJS(e));
        return e.map((node) => ({
          ...node,
          data: {
            ...node.data,
            color:
              this._id === node.data.id || "origin" === node.data.id
                ? "#EF3F3F"
                : this._isExpand && index === ori.length - 1
                ? "#0085FF"
                : "#000",
          },
        }));
      });
    // const data = ele.data();
    // if (this._isExpand) {
    //   const keys = Array.from(this._elements.keys());
    //   const lastKey = keys[keys.length - 1];
    //   const isExpanded = this._elements
    //     .get(lastKey)
    //     ?.nodes.find((node) => node.data.id === data.id);

    //   if (isExpanded) return "#0085FF";
    // }
    // const color = ele.data().isTarget ? "#EF3F3F" : "#000";
    return [...edges, ...nodes];
  }

  zoomIn() {}
  zoomOut() {}
  zoomToFit() {}
}

const interpolator = getColorInterpolator([
  { color: "#E4F1F7", value: 0 },
  { color: "#6CB0D6", value: 0.5 },
  { color: "#0D4A70", value: 1 },
]);
