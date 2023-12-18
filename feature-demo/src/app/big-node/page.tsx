"use client";
import Cytoscape, { useCytoscape } from "@/module/cytoscape/cytoscape";
import { ElementDefinition } from "cytoscape";
import { useEffect, useMemo, useState } from "react";

const BigNode = () => {
  const [nodeNumber, setNodeNumber] = useState(1000);

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
        {[50, 500, 1000, 5000].map((num) => (
          <label htmlFor="" onClick={() => setNodeNumber(num)} key={num}>
            <input type="radio" checked={nodeNumber === num} />
            {num}
          </label>
        ))}
      </section>
    </section>
  );
};

export default BigNode;
