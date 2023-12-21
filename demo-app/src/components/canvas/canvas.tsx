"use client";
import { useMemo, useState } from "react";
import styles from "./canvas.module.css";
import CanvasModal from "./canvas-modal";
import { useCytoscape } from "./cytoscape";
import relationData from "./data/relation/0.json";
import { convertRelation } from "./data/convert";
import { getRelationData } from "./data/getData";
import { useRootStore } from "@/store/storeContext";
import { observer } from "mobx-react-lite";

const Canvas = () => {
  const [coordinate, setCoordinate] = useState({ x: 0, y: 0 });

  const rootStore = useRootStore();

  return (
    <>
      <div
        className={styles.root}
        ref={rootStore.visualization.setContainer}
        onContextMenu={(e) => {
          e.preventDefault();

          setCoordinate({ x: e.clientX, y: e.clientY });
        }}
      ></div>

      {useMemo(() => {
        return (
          <CanvasModal
            open={Boolean(rootStore.menuNode)}
            onClose={() => {
              rootStore.setMenuNode(null);
              setCoordinate({ x: 0, y: 0 });
            }}
            coordinate={coordinate}
          >
            {[
              {
                label: "연관관계 실행하기",
                fn: () => {
                  rootStore.relation(rootStore.menuNode?.id);
                },
              },
              {
                label: "카테고리 실행하기",
                fn: () => {
                  rootStore.category(rootStore.menuNode?.id);
                },
              },
              {
                label: "상세 정보 보기",
                fn: () => {
                  rootStore.setTargetNode(rootStore.menuNode);
                },
              },
            ].map(({ label, fn }) => {
              return (
                <div
                  key={label}
                  style={{
                    padding: "10px",
                    color: "#202020",
                    fontSize: "14px",

                    fontWeight: 500,

                    cursor: "pointer",
                  }}
                  onClick={() => {
                    fn();
                    rootStore.setMenuNode(null);
                  }}
                >
                  {label}
                </div>
              );
            })}
          </CanvasModal>
        );
      }, [coordinate])}
    </>
  );
};

export default observer(Canvas);
