"use client";
import Cytoscape, { useCytoscape } from "@/module/cytoscape/cytoscape";
import { ElementDefinition } from "cytoscape";
import { useEffect, useMemo, useState } from "react";

const NodeZoom = () => {
  const nodeNumber = 1000;

  const nodeData: ElementDefinition[] = useMemo(() => {
    return new Array(nodeNumber).fill(null).map((_, i) => {
      return {
        data: {
          id: `n${i}`,
          label: i,
        },

        group: "nodes",
        removed: false,
        selected: false,
        selectable: true,
        locked: false,
        grabbed: false,
        grabbable: false,
        classes: "",
      };
    });
  }, [nodeNumber]);

  const { setRootEL, cytoscapeCore } = useCytoscape(nodeData);

  useEffect(() => {
    cytoscapeCore?.on("select", (e) => {
      const position = e.target.position();

      // cytoscapeCore.zoom({ position });

      cytoscapeCore.animate({ zoom: 3, center: { eles: e.target } });
    });
  }, [cytoscapeCore]);

  return (
    <section>
      <h2>대용량 노드</h2>

      <section>
        <div
          style={{ width: "800px", height: "500px", border: "1px solid black" }}
          ref={setRootEL}
        ></div>
      </section>
      <section>
        <ul style={{ height: "300px", overflow: "scroll" }}>
          {cytoscapeCore?.nodes().map((node) => {
            const id = node.id();
            return (
              <li
                key={id}
                onClick={() => {
                  cytoscapeCore.animate({ zoom: 3, center: { eles: node } });
                }}
              >
                {id}
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
};

export default NodeZoom;
