"use client";

import { useCSR } from "@/hooks/isCSR";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  anchorEl: React.MutableRefObject<null | HTMLElement>;
  open: boolean;
  onClose: () => void;
  children: React.ReactElement;
}

const Modal = ({ anchorEl, children, open, onClose }: ModalProps) => {
  // const [target, setTarget] = useState<Element | null>(null);

  // useEffect(() => {
  //   if (document) {
  //     setTarget();
  //   }
  // }, []);

  const innerSection = useRef<HTMLElement | null>(null);

  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const computePosition = useCallback(() => {
    if (innerSection.current === null || anchorEl.current === null) {
      setPosition({ top: 0, left: 0 });
      return;
    }

    const position = getModalPosition({
      innerSection: innerSection.current,
      anchorEl: anchorEl.current,
    });

    setPosition(position);
  }, [anchorEl]);

  useEffect(() => {
    const throtleCompute = throtle(computePosition);
    addEventListener("resize", throtleCompute);
    return () => removeEventListener("resize", throtleCompute);
  }, [computePosition]);

  useLayoutEffect(() => {
    computePosition();
  }, [computePosition, open]);

  const isCSR = useCSR();

  if (!isCSR) {
    return <></>;
  }

  const contents = open ? (
    <div
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: 1400,
      }}
      onMouseDown={() => onClose()}
    >
      <section
        ref={innerSection}
        style={{
          position: "absolute",
          boxShadow:
            "0px 4px 6px 0px rgba(31, 41, 55, 0.05), 0px 10px 15px 0px rgba(31, 41, 55, 0.10)",
          top: position.top,
          left: position.left,
          backgroundColor: "#fff",
        }}
        onMouseDown={(e) => {
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

export default Modal;
const throtle = (fn: Function) => {
  // let timer: undefined | NodeJS.Timeout;

  const throtleFn = () => {
    // if (timer !== undefined) {
    //   clearTimeout(timer);
    // }

    fn();
    // timer = setTimeout(() => {
    // }, 200);
  };

  return throtleFn;
};

const getModalPosition = ({
  innerSection,
  anchorEl,
}: {
  innerSection: HTMLElement;
  anchorEl: HTMLElement;
}) => {
  const viewPortHeight = window.innerHeight;
  const viewPortWidth = window.innerWidth;

  const innerHeight = innerSection.clientHeight;
  const innerWidth = innerSection.clientWidth;

  const viewPortRelationRect = anchorEl.getBoundingClientRect();

  const anchorHeight = viewPortRelationRect.height;

  let top = viewPortRelationRect.top;
  let left = viewPortRelationRect.left;

  top = Math.min(
    top + anchorHeight + 5,
    top + anchorHeight + 5 - Math.max(0, top + innerHeight - viewPortHeight)
  );
  left = Math.min(
    left,
    left - Math.max(0, left + innerWidth - viewPortWidth + 6)
  );

  return { top, left };
};
