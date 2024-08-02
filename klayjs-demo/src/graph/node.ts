import { RequiredKeys } from "@/util/type.util";
import { ElkNode } from "elkjs";
import { drawEdge } from "./edge";

const NodeMap = new Map<string, OffscreenCanvas>();

const createParentNode = (
  node: RequiredKeys<ElkNode, "width" | "height">,
  scale: number = 1
) => {
  const offscreenCanvas = new OffscreenCanvas(node.width, node.height);
  const ctx = offscreenCanvas.getContext("2d")!;

  // Draw the node (circle with text)
  ctx.lineWidth = scale * 2;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, node.width, node.height);
  ctx.strokeStyle = "black";
  ctx.strokeRect(0, 0, node.width, node.height);

  return offscreenCanvas;
};

const createLeafNode = (
  node: RequiredKeys<ElkNode, "width" | "height">,
  scale: number = 1
) => {
  const memo = NodeMap.get(node.id);
  if (memo) {
    return memo;
  }

  const circleDiff = scale * 10;

  const offscreenCanvas = new OffscreenCanvas(
    node.width + circleDiff,
    node.height + circleDiff
  );
  const ctx = offscreenCanvas.getContext("2d")!;

  ctx.lineWidth = scale * 2;

  // ctx.fillStyle = "lightblue";
  // ctx.fillRect(0, 0, node.width, node.height);
  // ctx.strokeStyle = "blue";
  // ctx.strokeRect(0, 0, node.width, node.height);

  ctx.beginPath();

  ctx.arc(
    (node.height + circleDiff) / 2,
    (node.height + circleDiff) / 2,
    (node.height + circleDiff) / 2,
    0,
    Math.PI * 2,
    false
  ); // x, y, radius, startAngle, endAngle, counterclockwise
  ctx.fillStyle = "blue";
  ctx.fill();

  // Draw a stroked circle
  // ctx.beginPath();
  // ctx.arc(
  //   node.height / 2,
  //   node.height / 2,
  //   node.height / 2 - 2,
  //   0,
  //   Math.PI * 2,
  //   false
  // );
  // ctx.strokeStyle = "red";
  // ctx.lineWidth = 2;
  // ctx.stroke();

  // // Draw a circle with both fill and stroke
  // ctx.beginPath();
  // ctx.arc(0, 0, 50, 0, Math.PI * 2, false);
  // ctx.fillStyle = "green";
  // ctx.fill();
  // ctx.lineWidth = 3;
  // ctx.strokeStyle = "black";
  // ctx.stroke();

  // Draw the label
  const label = node.id;
  //|| (node.labels ? node.labels[0].text : "");
  // ctx.lineWidth = 1;

  ctx.font = `${8 * scale}px serif`;

  ctx.fillStyle = "#000";

  ctx.textAlign = "center";
  ctx.fillText(
    "안녕하세요",

    node.width / 2,
    node.height / 2
    // node.width
  );

  NodeMap.set(node.id, offscreenCanvas);
  return offscreenCanvas;
};

export const createNode = (
  node: RequiredKeys<ElkNode, "width" | "height">,
  scale: number = 1
) => {
  if (!node.children || node.children.length === 0) {
    return createLeafNode(node, scale);
  }

  const canvas = createParentNode(node, scale);
  const ctx = canvas.getContext("2d")!;

  node.edges?.map((edge) => {
    drawEdge(ctx, edge, scale);
  });

  node.children
    .map((node) => ({
      canvas: createNode(node as any, scale),
      context: node as any,
    }))
    .forEach((node) => {
      // ctx.save();

      // ctx.beginPath();
      // ctx.arc(
      //   node.context.x,
      //   node.context.y,
      //   node.canvas.height / 2,
      //   0,
      //   Math.PI * 2,
      //   true
      // );
      // ctx.closePath();
      // ctx.clip();

      // ctx.restore();

      ctx.drawImage(
        node.canvas,
        0,
        0,
        node.canvas.height,
        node.canvas.height,
        node.context.x - 5 * scale,
        node.context.y - 5 * scale,
        node.canvas.height,
        node.canvas.height
      );
      // ctx.restore();
    });

  return canvas;
};

// export const drawNode = (
//   ctx: OffscreenCanvasRenderingContext2D,
//   node: RequiredKeys<ElkNode, "width" | "height" | "x" | "y">
// ) => {
//   let nodeCanvas = NodeMap.get(node.id);

//   if (!nodeCanvas) {
//     nodeCanvas = createLeafNode(node);
//   }

//   ctx.drawImage(
//     nodeCanvas,
//     0,
//     0,
//     node.width,
//     node.height,
//     node.x,
//     node.y,
//     node.width,
//     node.height
//   );
// };
