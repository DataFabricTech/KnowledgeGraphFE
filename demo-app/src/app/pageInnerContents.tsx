"use client";

import Canvas from "@/components/canvas/canvas";
import DoInfoSide from "@/components/doInfoSide/doInfoSide";
import Drawer from "@/components/drawer/drawer";
import Header from "@/components/header/header";
import Tab from "@/components/tab/tab";
import { useRootStore } from "@/store/storeContext";
import { observer } from "mobx-react-lite";

const Inner = observer(() => {
  const root = useRootStore();

  return (
    <>
      <Tab
        tabList={[{ name: "test", id: "test" }]}
        selectedId="test"
        onSelect={() => {}}
      />
      <Header />

      <Drawer
        open={Boolean(root.targetNode)}
        onClose={() => {
          root.setTargetNode(null);
        }}
      >
        <DoInfoSide />
      </Drawer>
      <Canvas />
    </>
  );
});

export default Inner;
