import { useCallback, useRef, useState } from "react";
import union from "public/asset/icon/union.svg";
import Image from "next/image";
import styles from "./relationFilter.module.css";
import Modal from "../modal/modal";
import Slider from "rc-slider";
import x from "public/asset/icon/x.svg";
import "rc-slider/assets/index.css";
import "./rc-slider-custom.css";
import { RelationVisualizationStore } from "@/store/relationVisualizationStore";
import RadioButton from "../radioButton/radioButton";
import { observer } from "mobx-react-lite";

interface RelationFilterProps {
  relationStore: RelationVisualizationStore;
}

const RelationFilter = ({ relationStore }: RelationFilterProps) => {
  const [range, setRange] = useState([0, 100]);

  const buttonEl = useRef<null | HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);

  const labels = {
    all: "전체",
    5: "상위 5개",
    10: "상위 10개",
    20: "상위 20개",
    score: `${range.join(" ~ ")} %`,
  } as const;

  return (
    <div className={styles.root}>
      <p className={styles.btnParam}>Relatedness:</p>
      <button
        ref={buttonEl}
        className={styles.rootBtn}
        onClick={() => setOpen(true)}
      >
        <p>{labels[relationStore.filterOption]} </p>
        <Image src={union} alt="union" />
      </button>
      <Modal
        anchorEl={buttonEl}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className={styles.popoverRoot}>
          <div className={styles.header}>
            <h2 className={styles.title}>연관도 노출 범위</h2>
            <button className={styles.closeBtn} onClick={() => setOpen(false)}>
              <Image src={x} alt="x" />
            </button>
          </div>
          <RadioButton
            list={[
              { label: "전체", value: "all" },
              { label: "상위 5개", value: "5" },
              { label: "상위 10개", value: "10" },
              { label: "상위 20개", value: "20" },
              { label: "직접입력", value: "score" },
            ]}
            value={relationStore.filterOption}
            onSwitch={(value) => relationStore.setFilterOption(value as any)}
          />
          {relationStore.filterOption === "score" && (
            <>
              <div className={styles.sliderRoot}>
                <div className={styles.sliderLabelRoot}>
                  <div
                    className={styles.sliderLabel}
                    style={{ left: range[0] + "%" }}
                  >
                    {range[0]}%
                  </div>
                  <div
                    className={styles.sliderLabel}
                    style={{ left: range[1] + "%" }}
                  >
                    {range[1]}%
                  </div>
                </div>
                <div
                  onMouseUp={() => {
                    relationStore.setScoreRange(range as any);
                  }}
                >
                  <Slider
                    min={0}
                    max={100}
                    value={range}
                    range
                    onChange={(value) => {
                      if (typeof value === "number") {
                        return;
                      }

                      setRange(value);
                    }}
                  />
                </div>
              </div>
              <div className={styles.inputRoot}>
                <div>
                  <p className={styles.inputLabel}>Min</p>
                  <div className={styles.inputContainer}>
                    <input
                      type="text"
                      className={styles.input}
                      value={range[0]}
                      onChange={(e) => {
                        setRange((prev) => [Number(e.target.value), prev[1]]);
                      }}
                    />
                    <p className={styles.inputEnd}>%</p>
                  </div>
                </div>
                <p className={styles.inputRange}>~</p>
                <div>
                  <p className={styles.inputLabel}>Max</p>
                  <div className={styles.inputContainer}>
                    <input
                      type="text"
                      className={styles.input}
                      value={range[1]}
                      onChange={(e) => {
                        setRange((prev) => [prev[0], Number(e.target.value)]);
                      }}
                    />
                    <p className={styles.inputEnd}>%</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default observer(RelationFilter);

const throtle = (fn: Function) => {
  let timer: undefined | NodeJS.Timeout;

  const throtleFn = (...args: any) => {
    if (timer !== undefined) {
      clearTimeout(timer);
    }

    fn(args);
    timer = setTimeout(() => {}, 400);
  };

  return throtleFn;
};
