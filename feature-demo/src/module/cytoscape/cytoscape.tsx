"use client";

import cytoscape, { ElementDefinition, Ext } from "cytoscape";
import coseBilkent from "cytoscape-cose-bilkent";
import cola from "cytoscape-cola";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface CytoscapeProps {
  chartData: ElementDefinition[];
  ext?: Ext;
}

const Cytoscape = ({ chartData, ext }: CytoscapeProps) => {
  const { setRootEL } = useCytoscape(chartData, ext);
  return (
    <div
      style={{ width: "800px", height: "500px", border: "1px solid black" }}
      ref={setRootEL}
    ></div>
  );
};

export default Cytoscape;

export const useCytoscape = (data: ElementDefinition[], ext?: Ext) => {
  const [rootEL, setRootEL] = useState<HTMLDivElement | null>(null);

  const cytoscapeCore = useMemo(() => {
    if (rootEL === null) {
      return null;
    }

    cytoscape.use(ext || coseBilkent);
    cytoscape.use(cola);

    const core = cytoscape({
      container: rootEL,

      layout: {
        name: "cose-bilkent",
        animate: "end",
        animationEasing: "ease-out",
        animationDuration: 1000,
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
            "background-color": "#ad1a66",
            height: function (ele) {
              return Math.pow(ele.data().level + 1, 1.4) * 30;
            },
            width: function (ele: any) {
              return Math.pow(ele.data().level + 1, 1.4) * 30;
            },
          },
        },
        {
          selector: ":selected",
          style: {
            "background-color": "blue",
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
            "line-color": "#ad1a66",
          },
        },
      ],

      elements: data,
    });

    return core;
  }, [data, ext, rootEL]);

  return { rootEL, cytoscapeCore, setRootEL };
};

// useEffect(() => {
//   cytoscape.use(coseBilkent);

//   const core = cytoscape({
//     container: rootEL.current,

//     layout: {
//       name: "cose-bilkent",
//       animate: "end",
//       animationEasing: "ease-out",
//       animationDuration: 1000,
//     } as any,

//     style: [
//       {
//         selector: "node[label]",
//         style: {
//           label: "data(label)",
//         },
//       },
//       {
//         selector: "node",
//         style: {
//           "background-color": "#ad1a66",
//         },
//       },

//       {
//         selector: ":parent",
//         style: {
//           "background-opacity": 0,
//         },
//       },

//       {
//         selector: "edge",
//         style: {
//           width: 3,
//           "line-color": "#ad1a66",
//         },
//       },
//     ],

//     elements: data,
//   });

//   core.on("tap", "node", (e) => {
//     console.log(e.target.id());
//   });

//   // const cose = core.layout({
//   //   name: "cose-bilkent",
//   //   animate: "end",
//   //   animationEasing: "ease-out",
//   //   animationDuration: 1000,
//   // });

//   // const random = core.layout({
//   //   name: "random",
//   //   animate: true,
//   //   animationDuration: 1000,
//   //   animationEasing: "ease-out",
//   // });
//   // random.run();
//   // core.addListener()
// }, []);
