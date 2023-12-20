export interface Visualization {
  type: "category" | "relation";
  zoomIn: () => void;
  zoomOut: () => void;
  zoomToFit: () => void;

  setContainer: (container: HTMLDivElement) => void;
}
