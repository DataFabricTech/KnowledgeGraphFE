"use client";

import cytoscape, { ElementDefinition, Ext } from "cytoscape";

import cola from "cytoscape-cola";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const useCytoscape = (data: ElementDefinition[]) => {
  const [rootEL, setRootEL] = useState<HTMLDivElement | null>(null);

  const cytoscapeCore = useMemo(() => {
    if (rootEL === null) {
      return null;
    }

    cytoscape.use(cola);

    const core = cytoscape({
      container: rootEL,

      layout: {
        name: "cola",
        animate: false,
        animationEasing: "ease-out",
        animationDuration: 500,
        nodeRepulsion: 100,
      } as any,

      style: [
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
            "border-color": function (ele) {
              return ele.data().isTarget ? "#EF3F3F" : "#000";
            },
            "border-width": 1,
            "text-valign": "center",
            "text-halign": "center",
            "font-weight": 500,
            color: function (ele) {
              return ele.data().isTarget ? "#EF3F3F" : "#000";
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
            width: 3,
            "line-color": "#000",
          },
        },
      ],

      elements: data,

      // initial viewport state:
      zoom: 1,
      pan: { x: 0, y: 0 },

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

    return core;
  }, [data, rootEL]);

  return { rootEL, cytoscapeCore, setRootEL };
};
