import { makeAutoObservable } from "mobx";
import { RootStore } from "./rootStore";
import { Visualization } from "./type";
import data from "@/components/canvas/data/category/data.json";
import { Category, DO } from "@/components/canvas/data/type";
import cytoscape, { ElementDefinition, Stylesheet } from "cytoscape";
import cola from "cytoscape-cola";
import fcose from "cytoscape-fcose";
import { getCategoryData } from "@/components/canvas/data/getData";

const categoryData: Category = data.category;

type DOResult = DO & { isTarget: boolean };

type CategoryResult = {
  name: string;
  id: string;
  children: CategoryResult[];
  doList: DOResult[];
  hasTarget: boolean;
  open: boolean;
  level: number;
};

const convert = (id: string, data: Category) => {
  // const category = JSON.parse(JSON.stringify(categoryData));

  return _convert(id, data);
};

const _convert = (id: string, category: Category): CategoryResult => {
  const doList: DOResult[] = category.doList.map((value) => {
    return { ...value, isTarget: value.id === id };
  });

  if (doList.some((value) => value.isTarget)) {
    return {
      ...category,
      doList,
      children: [],
      hasTarget: true,
      open: true,
      level: 1,
    };
  }

  const children = category.children.map((category) => {
    return _convert(id, category);
  });

  const level = (children[0]?.level || 0) + 1;

  return {
    ...category,
    children,
    doList,
    hasTarget: children.some((category) => category.hasTarget),
    open: false,
    level,
  };
};

class CategoryVisualizationStore implements Visualization {
  private _root: RootStore;

  private _core: cytoscape.Core | null = null;
  private _container: HTMLDivElement | null = null;
  private _id: string;

  private _fetchData: Promise<any>;
  private _data: CategoryResult | null;
  private _isLoading: boolean = false;

  private _color: string = "#EF3F3F";

  constructor({ id, root }: { id: string; root: RootStore }) {
    this._root = root;
    this._id = id;

    this._fetchData = getCategoryData();

    this._fetchData.then((data) => {
      this._data = convert(this._id, data.category);
    });

    this._data = null;

    this.setContainer = this.setContainer.bind(this);

    makeAutoObservable(this);
  }

  setContainer(container: HTMLDivElement) {
    this._container = container;
    this.render();
  }

  get color() {
    return this._color;
  }

  setColor(color: string) {
    this._color = color;

    this._core?.style(this.stylesheet);
  }

  get type() {
    return "category" as const;
  }

  zoomIn() {}
  zoomOut() {}
  zoomToFit() {}

  async render() {
    if (this._isLoading || this._data === null) {
      requestAnimationFrame(() => {
        this.render();
      });

      return;
    }

    if (this._container === null) {
      return null;
    }

    if (this._core === null) {
      cytoscape.use(fcose);

      this._core = cytoscape({
        container: this._container,

        layout: {
          name: "fcose",
          // animate: true,
          animationEasing: "ease-out",
          animationDuration: 500,
          nodeRepulsion: 100,
          nodeSeparation: 75,
          maxSimulationTime: 2000,
          fit: false,
          padding: 300,
          idealEdgeLength: (edge) => {
            return Math.pow(edge.data().gap, 1.2) * 50;
          },
        } as any,

        style: this.stylesheet,

        elements: this.elements,

        // initial viewport state:
        zoom: 1,
        pan: { x: 1000, y: 500 },

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
        ...this._core.json(),
        elements: this.elements,
        style: this.stylesheet,
      });

      this._core
        .layout({
          name: "fcose",
          // animate: true,
          animationEasing: "ease-out",
          animationDuration: 500,
          nodeRepulsion: 100,
          nodeSeparation: 75,
          maxSimulationTime: 2000,
          fit: false,
          padding: 300,
          // randomize: false,
          idealEdgeLength: (edge) => {
            return Math.pow(edge.data().gap, 0.8) * 50;
          },
        })
        .run();
    }
    const clickHandler = (e: any) => {
      const node = e.target.data();

      if (node.level === 0) {
        this._core?.nodes().once("click", clickHandler);
        return;
      }

      this._open(this._data, node.id);

      this.render();
    };

    this._core.nodes().once("click", clickHandler);

    this._core.nodes().on("cxttap", (e) => {
      const DO = e.target.data();
      this._root.setMenuNode(DO);
    });
  }

  private _open(data: CategoryResult, id: string) {
    if (data.level === 0) {
      return;
    }
    if (data.id === id) {
      data.open = !data.open;
      return;
    }

    if (data.open || data.hasTarget) {
      data.children.forEach((item) => {
        this._open(item, id);
      });
    }
  }

  get elements(): ElementDefinition[] {
    return this._elements(this._data);
  }

  private _elements(
    data: CategoryResult,
    parentId?: string
  ): ElementDefinition[] {
    const result: ElementDefinition[] = [
      {
        data: {
          label: data.name,
          hasTarget: data.hasTarget,
          id: data.id,
          level: data.level,
          open: data.open,
        },
        group: "nodes",

        selected: false,
        selectable: true,
        locked: false,
        grabbable: false,
        classes: "",
      },
    ];

    if (parentId) {
      result.push({
        data: {
          source: data.id,
          target: parentId,
          gap: data.level + 1,
        },
        selectable: true,
        locked: false,

        grabbable: true,
        classes: "",
      });
    }
    if (!data.hasTarget && !data.open) {
      return result;
    }

    if (data.hasTarget && !data.open) {
      const child = data.children.find((category) => category.hasTarget);

      if (child) {
        const item = this._elements(child, data.id);
        result.push(...item);
      } else {
        const target = data.doList.find((data) => data.isTarget);

        if (target) {
          result.push({
            data: {
              label: target.name,
              isTarget: target.isTarget,
              id: target.id,
              level: 0,
            },
            group: "nodes",

            selected: false,
            selectable: true,
            locked: false,
            grabbable: false,
            classes: "",
          });

          result.push({
            data: {
              source: target.id,
              target: data.id,
              gap: 1,
            },
            selectable: true,
            locked: false,

            grabbable: true,
            classes: "",
          });
        }
      }

      return result;
    }

    data.children.forEach((category) => {
      const item = this._elements(category, data.id);
      result.push(...item);
    });

    data.doList.forEach((item) => {
      result.push({
        data: {
          label: item.name,
          isTarget: item.isTarget,
          id: item.id,
          level: 0,
        },
        group: "nodes",

        selected: false,
        selectable: true,
        locked: false,
        grabbable: false,
        classes: "",
      });

      result.push({
        data: {
          source: data.id,
          target: item.id,
          gap: 1,
        },
        selectable: true,
        locked: false,

        grabbable: true,
        classes: "",
      });
    });

    return result;
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
          "background-color": (ele) => {
            const data = ele.data();

            if (data.isTarget || data.hasTarget) {
              return this._color;
            }

            if (data.level === 0) {
              return "#B3B3B3";
            }
            if (data.level === 1) {
              return "#808080";
            }

            if (data.level === 2) {
              return "#4D4D4D";
            }
            return "#000";
          },
          "border-color": (ele) => {
            const data = ele.data();

            if (data.isTarget || data.hasTarget) {
              return this._color;
            }

            if (data.level === 0) {
              return "#B3B3B3";
            }
            if (data.level === 1) {
              return "#808080";
            }

            if (data.level === 2) {
              return "#4D4D4D";
            }
            return "#000";
          },
          "border-width": 1,
          "text-valign": "center",
          "text-halign": "center",
          "font-weight": 500,
          color: "#fff",
          "border-style": (ele) => {
            return "solid";
          },

          height: function (ele) {
            const data = ele.data();
            return Math.pow(1.2, data.level + 1) * 50;
          },
          width: function (ele) {
            const data = ele.data();
            return Math.pow(1.2, data.level + 1) * 50;
          },
          "font-size": function (ele) {
            const data = ele.data();
            return Math.pow(1.2, data.level + 1) * 15;
          },
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
          width: 1,
          "line-color": "#000",
          "line-opacity": 1,
        },
      },
    ];
  }
}

export default CategoryVisualizationStore;
