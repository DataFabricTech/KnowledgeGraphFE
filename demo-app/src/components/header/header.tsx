"use client";
import styles from "./header.module.css";
import project from "public/asset/icon/project.svg";
import share from "public/asset/icon/share.svg";
import union from "public/asset/icon/union.svg";
import Image from "next/image";
import Modal from "../modal/modal";
import { useRef, useState } from "react";
import CategoryColorPicker, {
  useCategoryColor,
} from "../colorPicker/categoryColorPicker";
import RelationTypeBtn, {
  useRelationType,
} from "../relationTypeBtn/relationTypeBtn";
import RelationFilter from "../relationFilter/relationFilter";
import { useRootStore } from "@/store/storeContext";
import { RelationVisualizationStore } from "@/store/relationVisualizationStore";
import { observer } from "mobx-react-lite";
import CategoryVisualizationStore from "@/store/categoryVisualizationStore";

interface HeaderProps {}

const Header = () => {
  const menu = useRef<null | HTMLButtonElement>(null);

  const root = useRootStore();

  // const [type, setType] = useState<"category" | "relation">("category");
  const [open, setOpen] = useState(false);
  const categoryState = useCategoryColor();
  const relationTypeState = useRelationType();

  return (
    <div className={styles.root}>
      <div className={styles.leftGroup}>
        <div className={styles.switchButtonGroup}>
          <SwitchButton
            onClick={() => {
              root.category();
            }}
            selected={root.visualization.type === "category"}
          >
            <Image src={project} alt="project" />
          </SwitchButton>
          <SwitchButton
            onClick={() => {
              root.relation();
            }}
            selected={root.visualization.type === "relation"}
          >
            <Image src={share} alt="share" />
          </SwitchButton>
        </div>
        <div className={styles.headerDivider}>
          <div></div>
        </div>
        {root.visualization.type === "category" ? (
          <CategoryColorPicker
            {...categoryState}
            category={root.visualization as CategoryVisualizationStore}
          />
        ) : (
          <>
            <RelationTypeBtn
              {...relationTypeState}
              relationStore={root.visualization as RelationVisualizationStore}
            />
            <RelationFilter
              relationStore={root.visualization as RelationVisualizationStore}
            />
          </>
        )}
      </div>
      <h2 className={styles.title}>dataname1_fullname_blahblah</h2>
      <button
        ref={menu}
        className={`${styles.zoomBtn} ${open ? styles.selected : ""}`}
        onClick={() => setOpen(true)}
      >
        Zoom <Image src={union} alt="union" />
      </button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        anchorEl={menu}
      >
        <div
          style={{
            width: "240px",
            height: "109px",
            background: "#222222",
            color: "#fff",
            borderRadius: "2px",
            paddingTop: "8px",
            display: "flex",
            flexDirection: "column",
            fontSize: "12px",
            fontWeight: 400,
          }}
        >
          <div style={{ padding: "0px" }}>
            <div className={styles.zoomBtnItem}>Zoom in</div>
            <div className={styles.zoomBtnItem}>Zoom out</div>
          </div>
          <div
            style={{
              margin: "8px 0px",
              borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          ></div>
          <div>
            <div className={styles.zoomBtnItem}>Zoom to Fit</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default observer(Header);

interface SwitchButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  selected: boolean;
}

const SwitchButton = ({ children, onClick, selected }: SwitchButtonProps) => {
  const classNames = [styles.switchButton];
  if (selected) {
    classNames.push(styles.selected);
  }

  return (
    <button className={classNames.join(" ")} onClick={onClick}>
      {children}
    </button>
  );
};
