const SERVER_IP = "http://192.168.120.85:8081" as const;

export const getRelationData = async (id: string) => {
  // const res = await fetch(
  //   `${SERVER_IP}/datafabric/relation/byDataObject?dataObjectId=${id}`
  // );

  // const data = res.json();

  const data = await import(`./relation/${id}.json`);

  return data;
};
export const getCategoryData = async () => {
  // const res = await fetch(`${SERVER_IP}/datafabric/category`);

  // const data = res.json();
  const data = await import("./category/data.json");

  return data;
};
