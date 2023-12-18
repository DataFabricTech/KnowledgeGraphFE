"use client";
import Cytoscape, { useCytoscape } from "@/module/cytoscape/cytoscape";
import { ElementDefinition } from "cytoscape";
import { useEffect, useMemo, useState } from "react";

import nodeData from "./data.json";

let tempId = 0;

const NetworkDiagramLayout = () => {
  const [layoutName, setLayoutName] = useState("cose-bilkent");

  const { setRootEL, cytoscapeCore } = useCytoscape(
    nodeData as ElementDefinition[]
  );

  const layoutList = useMemo(() => {
    return ["random", "cose-bilkent"].map((name) => {
      return {
        name,
        runner: cytoscapeCore?.layout({
          name: "cola",
          nodeSpacing: 5,
          edgeLengthVal: 45,
          animate: true,
          randomize: false,
          maxSimulationTime: 1500,
        } as any),
      };
    });
  }, [cytoscapeCore]);

  useEffect(() => {
    cytoscapeCore?.on("select", (e) => {
      const targetNode = e.target;

      const id = targetNode.id();

      const position = targetNode.position();

      const result = new Array(10).fill(null).map((_, i) => {
        const rad = ((Math.PI * 2) / 50) * i;
        const x = Math.cos(rad);
        const y = Math.sin(rad);
        const multiple = (i % 3) + 1;

        const newId = `${id}_${tempId++}`;

        const newPosition = {
          x: position.x + x * multiple,
          y: position.y + y * multiple,
        };

        cytoscapeCore.add([
          {
            data: {
              id: newId,
            },
            position: newPosition,

            group: "nodes",
          },
          {
            group: "edges",
            data: {
              id: `${id}:${newId}`,
              source: id,
              target: newId,
            },
          },
        ] as ElementDefinition[]);

        return { x, y, rad };
      });

      console.log(result);

      cytoscapeCore
        ?.layout({
          name: "cola",
          nodeSpacing: 5,
          edgeLengthVal: 45,
          animate: true,
          randomize: false,
          maxSimulationTime: 1500,
        } as any)
        .run();
    });

    cytoscapeCore?.on("unselect", (e) => {});
  }, [cytoscapeCore]);

  return (
    <div>
      <h2>네트워크 다이어그램 레이아웃</h2>
      <section>
        <div
          style={{ width: "800px", height: "500px", border: "1px solid black" }}
          ref={setRootEL}
        ></div>
      </section>
      <section>
        {layoutList.map((layout) => (
          <label
            htmlFor=""
            onClick={() => {
              setLayoutName(layout.name);
              layout.runner?.run();
            }}
            key={layout.name}
          >
            <input type="radio" checked={layoutName === layout.name} />
            {layout.name}
          </label>
        ))}
      </section>
    </div>
  );
};

export default NetworkDiagramLayout;
