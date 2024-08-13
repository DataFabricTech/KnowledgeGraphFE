export type CategoryNode = {
  id: string;
  name: string;
};
export type Category = {
  name: string;
  id: string;
  children: Category[];
  nodeList: CategoryNode[];
};
