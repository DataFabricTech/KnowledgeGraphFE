import { ElkExtendedEdge } from "elkjs";

export const drawEdge = (
  ctx: OffscreenCanvasRenderingContext2D,
  edge: ElkExtendedEdge,
  scale: number = 1
) => {
  console.log(scale);
  const section = edge.sections ? edge.sections[0] : undefined;
  if (!section) {
    return;
  }
  ctx.save();

  ctx.lineWidth = scale * 1;
  ctx.beginPath();
  ctx.moveTo(section.startPoint.x, section.startPoint.y);
  section.bendPoints?.forEach((point) => {
    ctx.lineTo(point.x, point.y);
  });
  ctx.lineTo(section.endPoint.x, section.endPoint.y);

  ctx.strokeStyle = "black";

  ctx.stroke();
  ctx.restore();
};
