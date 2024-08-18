"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Canvas from "@/graph/Canvas";
import { ElkExtendedEdge, ElkNode } from "elkjs";
import { useEffect, useRef } from "react";
// import { NetworkDiagram } from "@/network-diagram";
// import { Category, CategoryGraph } from "@/network-diagram/category-graph";
import { CategoryGraph, NetworkDiagram } from "knowlege-gragh-canvas";
import { Category } from "@/network-diagram/category-graph";

const data: Category = {
  id: "1002",
  name: "서울",

  children: [
    {
      id: "1004",
      name: "강남구",

      children: [],
      nodeList: [
        { id: "411", name: "논현1동" },
        { id: "412", name: "삼성2동" },
        { id: "413", name: "역삼1동" },
        { id: "414", name: "일원본동" },
        { id: "436", name: "논현2동" },
        { id: "437", name: "도곡1동" },
        { id: "464", name: "청담동" },
        { id: "518", name: "수서동" },
        { id: "682", name: "일원1동" },
        { id: "683", name: "일원2동" },
        { id: "369", name: "신사동" },
      ],
    },
    {
      id: "1005",
      name: "강동구",

      children: [],
      nodeList: [
        { id: "349", name: "둔촌1동" },
        { id: "350", name: "성내1동" },
        { id: "351", name: "암사3동" },
        { id: "352", name: "천호1동" },
        { id: "465", name: "둔촌2동" },
        { id: "483", name: "성내2동" },
        { id: "484", name: "천호2동" },
        { id: "519", name: "천호3동" },
        { id: "574", name: "명일1동" },
        { id: "623", name: "암사2동" },
        { id: "647", name: "명일2동" },
        { id: "684", name: "성내3동" },
        { id: "685", name: "암사1동" },
      ],
    },
    {
      id: "1006",
      name: "강북구",

      children: [],
      nodeList: [
        { id: "353", name: "번2동" },
        { id: "354", name: "수유1동" },
        { id: "415", name: "번3동" },
        { id: "438", name: "수유2동" },
        { id: "485", name: "삼각산동" },
        { id: "486", name: "수유3동" },
        { id: "520", name: "삼양동" },
        { id: "548", name: "미아동" },
        { id: "549", name: "우이동" },
        { id: "605", name: "송중동" },
        { id: "606", name: "인수동" },
        { id: "648", name: "번1동" },
        { id: "649", name: "송천동" },
      ],
    },
  ],

  nodeList: [],
};
const nodes = [
  { id: "n1", width: 100, height: 100 },
  { id: "n2", width: 100, height: 100 },
  { id: "n3", width: 100, height: 100 },
  { id: "n4", width: 100, height: 100 },
];
const edges: ElkExtendedEdge[] = [
  { id: "e1", sources: ["n1"], targets: ["n2"] },
  { id: "e2", sources: ["n1"], targets: ["n3"] },
  { id: "e3", sources: ["n4"], targets: ["n1"] },
];
// data.

export default function Home() {
  const ref = useRef<HTMLDivElement | null>(null);
  const diagram = useRef<CategoryGraph | null>(null);

  useEffect(() => {
    if (ref.current && !diagram.current) {
      diagram.current = new CategoryGraph({
        container: ref.current,
        categoryData: data,
        eventHandler: {
          onClick: (e, id) => {
            console.log(e, id);
          },
        },
        pixelQuality: "high",
      });
      // diagram.current = new NetworkDiagram({
      //   container: ref.current,
      //   nodes,
      //   edges,
      //   eventHandler: {
      //     onClick: (e, id) => {
      //       console.log(e, id);
      //     },
      //     onHover: (e, id) => {},
      //   },
      // });

      // ref.current.addEventListener(
      //   "click",
      //   () => {
      //     const nodes = [
      //       { id: "n5", width: 100, height: 100 },
      //       { id: "n6", width: 100, height: 100 },
      //       { id: "n7", width: 100, height: 100 },
      //       { id: "n8", width: 100, height: 100 },
      //       { id: "n9", width: 100, height: 100 },
      //       { id: "n10", width: 100, height: 100 },
      //       { id: "n11", width: 100, height: 100 },
      //     ];
      //     const edges: ElkExtendedEdge[] = [
      //       { id: "e4", sources: ["n1"], targets: ["n5"] },
      //       { id: "e5", sources: ["n1"], targets: ["n6"] },
      //       { id: "e6", sources: ["n7"], targets: ["n2"] },
      //       { id: "e7", sources: ["n8"], targets: ["n2"] },
      //       { id: "e8", sources: ["n9"], targets: ["n2"] },
      //       { id: "e9", sources: ["n10"], targets: ["n2"] },
      //       { id: "e10", sources: ["n11"], targets: ["n2"] },
      //     ];

      //     diagram.current?.addElement({ nodes, edges });
      //   },
      //   { once: true }
      // );

      // return () => diagram.cleanUp();
    }
  }, []);
  return (
    <main className={styles.main} onClick={() => {}}>
      <div style={{ background: "#fff", height: 500, width: 1000 }} ref={ref} />
    </main>
  );
}
