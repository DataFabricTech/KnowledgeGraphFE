"use client";
import Cytoscape, { useCytoscape } from "@/module/cytoscape/cytoscape";
import { ElementDefinition } from "cytoscape";
import { useEffect, useMemo, useState } from "react";

import nodeData from "./data.json";

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
          name,
          animate: "end",
          animationEasing: "ease-out",
          animationDuration: 1000,
        } as any),
      };
    });
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
