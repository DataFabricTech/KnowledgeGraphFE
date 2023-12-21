import { useRef, useState } from "react";

import { ChromePicker } from "react-color";
import Modal from "../modal/modal";

import styles from "./categoryColorPicker.module.css";

import union from "public/asset/icon/union.svg";
import Image from "next/image";
import { useRootStore } from "@/store/storeContext";
import CategoryVisualizationStore from "@/store/categoryVisualizationStore";
import { observer } from "mobx-react-lite";

interface CategoryColorPickerProps {
  category: CategoryVisualizationStore;
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
}

const CategoryColorPicker = ({
  category,
  open,
  handleClose,
  handleOpen,
}: CategoryColorPickerProps) => {
  const buttonEl = useRef<null | HTMLButtonElement>(null);

  return (
    <>
      <button className={styles.btn} ref={buttonEl} onClick={handleOpen}>
        <div
          className={styles.btnIcon}
          style={{ backgroundColor: category.color }}
        ></div>
        <Image src={union} alt="union" />
      </button>
      <Modal anchorEl={buttonEl} open={open} onClose={handleClose}>
        <ChromePicker
          color={category.color}
          onChange={({ hex }) => category.setColor(hex)}
        />
      </Modal>
    </>
  );
};

export default observer(CategoryColorPicker);

export const useCategoryColor = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return { open, handleClose, handleOpen };
};
