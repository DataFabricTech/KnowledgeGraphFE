"use client";
import { createContext, useContext } from "react";
import { RootStore } from "./rootStore";

const StoreContext = createContext<null | RootStore>(null);

export const StoreContextProvider = ({
  children,
  categoryData,
  relationData,
}: {
  children: React.ReactNode;
  categoryData: any;
  relationData: any;
}) => {
  const rootStore = new RootStore({ categoryData, relationData });
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};

export const useRootStore = () => {
  const context = useContext(StoreContext);

  if (context === null) {
    throw Error("rootStore context 범위 밖입니다.");
  }

  return context;
};
