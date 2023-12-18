"use client";
import Cytoscape, { useCytoscape } from "@/module/cytoscape/cytoscape";
import { ElementDefinition } from "cytoscape";
import { useEffect, useState } from "react";

const demoData: ElementDefinition[] = new Array(49).fill(null).map((_, i) => {
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

const Select = () => {
  const { setRootEL, cytoscapeCore } = useCytoscape(demoData);

  const [id, setId] = useState<null | string>(null);

  useEffect(() => {
    cytoscapeCore?.on("select", (e) => {
      setId(e.target.id());
    });

    cytoscapeCore?.on("unselect", (e) => {
      setId("");
    });
  }, [cytoscapeCore]);

  return (
    <section>
      <h2>select</h2>

      <section>
        <div
          style={{ width: "800px", height: "500px", border: "1px solid black" }}
          ref={setRootEL}
        ></div>
        <section>
          <h2>selected</h2>
          <div>{id}</div>
        </section>
      </section>
    </section>
  );
};

export default Select;
