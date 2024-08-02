import { ResultRelation } from "./data.type";

export const getRelationData = async () => {
  const data = await import(`./relationData.json`);
  return data as ResultRelation;
};
