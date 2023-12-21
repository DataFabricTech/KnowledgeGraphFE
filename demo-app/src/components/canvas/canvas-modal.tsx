"use client";

import { useCSR } from "@/hooks/isCSR";
import ReactDOM from "react-dom";

interface CanvasModalProps {
  open: boolean;
  onClose: () => void;
  coordinate: { x: number; y: number };
  children: React.ReactNode;
}

const CanvasModal = ({
  open,
  onClose,
  coordinate,
  children,
}: CanvasModalProps) => {
  const contents = open ? (
    <div
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: 1400,
        top: 0,
      }}
      onClick={() => onClose()}
    >
      <section
        style={{
          position: "absolute",
          boxShadow: "0px 4px 5px 0px rgba(0, 0, 0, 0.30)",

          padding: "4px",
          borderRadius: "8px",

          border: "1px solid  #DADADA",
          background: "#FFF",

          top: coordinate.y,
          left: coordinate.x,
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </section>
    </div>
  ) : null;

  const isCSR = useCSR();

  if (!isCSR) {
    return <></>;
  }

  return ReactDOM.createPortal(contents, document?.body);
};

export default CanvasModal;
