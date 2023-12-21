"use client";

import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./drawer.module.css";
import { useCSR } from "@/hooks/isCSR";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Drawer = ({ open, onClose, children }: DrawerProps) => {
  const [rootStyle, setRootStyle] = useState([
    styles.drawerRoot,
    styles.drawerRootActive,
  ]);

  const [contentsStyle, setContentsStyle] = useState([
    styles.drawerContents,
    styles.drawerContentsActive,
  ]);

  useEffect(() => {
    if (open) {
      setContentsStyle([styles.drawerContents]);
      setRootStyle([styles.drawerRoot, styles.drawerRootActive]);
    }
  }, [open]);
  const isCSR = useCSR();

  if (!isCSR) {
    return <></>;
  }

  const contents = open ? (
    <div
      className={rootStyle.join(" ")}
      onClick={() => {
        setContentsStyle([styles.drawerContents, styles.drawerContentsActive]);
        setRootStyle([styles.drawerRoot]);
        setTimeout(() => {
          onClose();
        }, 250);
      }}
    >
      <section
        className={contentsStyle.join(" ")}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </section>
    </div>
  ) : null;

  return ReactDOM.createPortal(
    contents,
    document!.querySelector("#modal_section")
  );
};

export default Drawer;
