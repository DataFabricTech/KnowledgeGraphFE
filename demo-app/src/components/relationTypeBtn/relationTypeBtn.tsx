import { useRef, useState } from "react";
import Image from "next/image";
import Modal from "../modal/modal";
import styles from "./relationTypeBtn.module.css";
import union from "public/asset/icon/union.svg";
import gradation from "public/asset/icon/color-gradation.svg";
import brightness from "public/asset/icon/btightness.svg";
import thickness from "public/asset/icon/thickness.svg";
import { observer } from "mobx-react-lite";
import { useRootStore } from "@/store/storeContext";
import { RelationVisualizationStore } from "@/store/relationVisualizationStore";

const opt = {
  gradient: { icon: gradation, label: "gradient" },
  brightness: { icon: brightness, label: "brightness" },
  thickness: { icon: thickness, label: "thickness" },
} as const;

const optList = Object.values(opt);

export const useRelationType = () => {
  const [type, setType] = useState<"gradient" | "brightness" | "thickness">(
    "gradient"
  );

  return { type, setType };
};

interface RelationTypeBtnProps {
  type: "gradient" | "brightness" | "thickness";
  setType: (type: "gradient" | "brightness" | "thickness") => void;
  relationStore: RelationVisualizationStore;
}

const RelationTypeBtn = ({
  type,
  setType,
  relationStore,
}: RelationTypeBtnProps) => {
  const buttonEl = useRef<null | HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button className={styles.btn} ref={buttonEl} onClick={handleOpen}>
        <Image src={opt[relationStore.style].icon} alt={opt[type].label} />

        <Image src={union} alt="union" />
      </button>
      <Modal anchorEl={buttonEl} open={open} onClose={handleClose}>
        <div
          style={{
            width: "128px",

            background: "#222222",
            color: "#fff",
            borderRadius: "2px",

            display: "flex",
            flexDirection: "column",
            fontSize: "12px",
            fontWeight: 400,
          }}
        >
          {optList.map(({ icon, label }) => {
            return (
              <div
                key={label}
                style={{
                  display: "grid",
                  padding: "0px 10px",
                  gap: "10px",
                  height: "40px",
                  gridTemplateColumns: "24px 1fr",
                }}
                className={styles.btnItem}
                onClick={() => {
                  relationStore.setStyle(label);

                  handleClose();
                }}
              >
                <Image src={icon} alt="label" />
                <p>{label}</p>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default observer(RelationTypeBtn);
