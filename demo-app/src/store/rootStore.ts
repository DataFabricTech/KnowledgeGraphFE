import { makeAutoObservable } from "mobx";
import { DO } from "@/components/canvas/data/type";
import { Visualization } from "./type";
import { RelationVisualizationStore } from "./relationVisualizationStore";
import CategoryVisualizationStore from "./categoryVisualizationStore";

export class RootStore {
  private _visualization: Visualization;
  private _targetNode: DO | null = null;
  private _menuNode: DO | null = null;

  constructor({
    categoryData,
    relationData,
  }: {
    categoryData: any;
    relationData: any;
  }) {
    this._visualization = new RelationVisualizationStore({
      id: "0",
      root: this,
    });

    makeAutoObservable(this);
  }

  get visualization() {
    return this._visualization;
  }

  get targetNode() {
    return this._targetNode;
  }

  setTargetNode(node: DO | null) {
    this._targetNode = node;
    console.log(this._targetNode);
  }

  get menuNode() {
    return this._menuNode;
  }

  setMenuNode(node: DO | null) {
    this._menuNode = node;
  }

  relation(id?: string) {
    this._visualization = new RelationVisualizationStore({
      id: id || "100",
      root: this,
    });
  }
  category(id?: string) {
    this._visualization = new CategoryVisualizationStore({
      id: id || "393",
      root: this,
    });
  }
}
