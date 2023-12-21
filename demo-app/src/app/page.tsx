// "use client";
import Image from "next/image";
import styles from "./page.module.css";
import Tab from "@/components/tab/tab";
import Header from "@/components/header/header";
import Drawer from "@/components/drawer/drawer";
import { useState } from "react";
import DoInfoSide from "@/components/doInfoSide/doInfoSide";
import Canvas from "@/components/canvas/canvas";
import { StoreContextProvider, useRootStore } from "@/store/storeContext";
import { observer } from "mobx-react-lite";
import {
  getCategoryData,
  getRelationData,
} from "@/components/canvas/data/getData";
import Inner from "./pageInnerContents";

export const dynamic = "force-dynamic";

export const getData = async () => {
  const [relationData, categoryData] = await Promise.all([
    getRelationData("1"),
    getCategoryData(),
  ]);

  return { relationData, categoryData };
};

async function Home() {
  const data = await getData();

  return (
    <main className={styles.main}>
      <StoreContextProvider {...JSON.parse(JSON.stringify(data))}>
        <Inner />
      </StoreContextProvider>
    </main>
  );
}

export default Home;
