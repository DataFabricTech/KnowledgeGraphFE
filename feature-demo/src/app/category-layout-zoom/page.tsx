"use client";
import { useCytoscape } from "@/module/cytoscape/cytoscape";
import { ElementDefinition } from "cytoscape";

import { useEffect, useMemo, useState } from "react";

const makeDemoData = (level: number) => {
  const demoData: ElementDefinition[] = [];

  const makeNode = (n: number, m: number, number: number, level: number) => {
    new Array(n).fill(null).forEach((_, i) => {
      const parent1: any = {
        data: {
          id: `n${i}`,
          label: `n${i}`,
          level: 2,
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
      demoData.push(parent1);

      if (level > 1) {
        return;
      }

      new Array(m).fill(null).forEach((_, j) => {
        const parent2: any = {
          data: {
            id: `n${i}_${j}`,
            label: `n${i}_${j}`,
            parent: parent1.data.id,
            level: 1,
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

        demoData.push(parent2);

        if (level > 0) {
          return;
        }

        const num = Math.floor(number / (n * m));

        new Array(num).fill(null).forEach((_, k) => {
          const item: any = {
            data: {
              id: `n${i}_${j}_${k}`,
              label: `n${i}_${j}_${k}`,
              parent: parent2.data.id,
              level: 0,
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

          demoData.push(item);
        });
      });
    });
  };

  makeNode(3, 3, 50, level);

  return demoData;
};

const CategoryLayout = () => {
  const [level, setLevel] = useState(1);

  const elements = useMemo(
    () => makeDemoData(0),
    // new Array(3).fill(null).map((_, level) => {
    //   return makeDemoData(level);
    // })
    []
  );
  const { setRootEL, cytoscapeCore } = useCytoscape(elements);

  const eleList = useMemo(() => {
    return new Array(3)
      .fill(null)
      .map((_, i) => cytoscapeCore?.elements(`node[level = ${i}]`));
  }, [cytoscapeCore]);

  useEffect(() => {
    cytoscapeCore?.on("zoom", (e) => {
      const zoom = cytoscapeCore?.zoom();

      console.log(zoom);

      if (zoom === undefined) {
        return;
      }

      if (zoom < 0.5) {
        setLevel(2);
        return;
      }

      if (zoom < 2) {
        setLevel(1);
        return;
      }

      setLevel(0);
    });

    // eleList[2] && cytoscapeCore?.remove(eleList[2]);
    if (eleList[1]) {
      cytoscapeCore?.add(eleList[1]);
      // eleList[1].position
    }

    // eleList[0] && cytoscapeCore?.add(eleList[0]);

    eleList[1]?.ungrabify();
    // eleList[0] && cytoscapeCore?.add(eleList[0]);

    // cytoscapeCore?.on("select", (e) => {});

    // console.log(cytoscapeCore?.zoom());
  }, [cytoscapeCore]);

  useEffect(() => {
    new Array(3).fill(null).forEach((_, j) => {
      j = 2 - j;

      const ele = eleList[j];

      if (!ele) {
        return;
      }

      if (level > j) {
        cytoscapeCore?.remove(ele);
      } else {
        cytoscapeCore?.add(ele);
      }
    });
  }, [level, cytoscapeCore]);

  return (
    <div>
      <h2>카테고리 레이아웃</h2>
      <section>
        <div
          style={{ width: "800px", height: "500px", border: "1px solid black" }}
          ref={setRootEL}
        ></div>
      </section>
      <section>
        {eleList.map((element, i) => (
          <label
            htmlFor=""
            onClick={() => {
              setLevel(i);
            }}
            key={i}
          >
            <input type="radio" checked={level === i} />
            {i}
          </label>
        ))}
      </section>
    </div>
  );
};

export default CategoryLayout;
