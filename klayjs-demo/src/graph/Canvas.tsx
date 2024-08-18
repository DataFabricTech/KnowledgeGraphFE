"use client";
import { useEffect, useRef } from "react";
import { drawLayout, getLayout } from "./layout";

const maxScale = 8;

const pixel = {
  width: 1600,
  height: 1000,
};

const Canvas = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  const graphCanvas = useRef<null | OffscreenCanvas>(null);

  const zoom = useRef(4);
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    drawLayout(maxScale).then((graph) => {
      graphCanvas.current = graph;
      drawGraph();
    });
  }, []);

  useEffect(() => {
    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();

      const worldX =
        (e.offsetX - (positionRef.current.x / 2 + 400)) / (zoom.current / 1);
      const worldY =
        (e.offsetY - (positionRef.current.y / 2 + 250)) / (zoom.current / 1);
      if (e.metaKey || e.ctrlKey) {
        if (e.deltaY > 0) {
          zoom.current += 0.2;
        }
        if (e.deltaY < 0) {
          zoom.current -= 0.2;
        }

        positionRef.current.x =
          (e.offsetX - 400 - worldX * (zoom.current / 1)) * 2;
        positionRef.current.y =
          (e.offsetY - 250 - worldY * (zoom.current / 1)) * 2;

        drawGraph();

        return;
      }

      positionRef.current.x -= e.deltaX;
      positionRef.current.y -= e.deltaY;
      drawGraph();
    };
    ref.current?.addEventListener("wheel", wheelHandler as any);

    return () => ref.current?.removeEventListener("wheel", wheelHandler);
  }, []);

  const drawGraph = () => {
    const inputScale = zoom.current;
    const position = positionRef.current;
    if (!ref.current) {
      return;
    }
    if (!graphCanvas.current) {
      return;
    }

    const graph = graphCanvas.current;
    const ctx = ref.current.getContext("2d")!;
    ctx.save();

    // ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.clearRect(0, 0, pixel.width, pixel.height);

    const scale = inputScale / maxScale;

    const centerPoint = {
      x: (pixel.width - graph.width * scale) / 2,
      y: (pixel.height - graph.height * scale) / 2,
    };
    // const move = { dx: 0, dy: 0 };

    ctx.translate(centerPoint.x + position.x, centerPoint.y + position.y);
    ctx.scale(scale, scale);

    // ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(graph, 0, 0, graph.width, graph.height);

    ctx.restore();
  };

  return (
    <canvas
      style={{ width: "800px", height: "500px", background: "#fff" }}
      onClick={(e) => {}}
      width={pixel.width}
      height={pixel.height}
      ref={ref}
    />
  );
};
export default Canvas;
