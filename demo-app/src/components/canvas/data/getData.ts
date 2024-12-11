const SERVER_IP = process.env.NEXT_PUBLIC_SERVER_IP;

export const getRelationData = async (id: string) => {
  if (SERVER_IP) {
    const res = await fetch(
      `${SERVER_IP}/datafabric/relation/byDataObject?dataObjectId=${id}`
    );
    const data = res.json();

    return data;
  }
  const data = await import(`./relation/${id}.json`);
  return data;
};
export const getCategoryData = async () => {
  if (SERVER_IP) {
    const res = await fetch(`${SERVER_IP}/datafabric/category`);
    const data = res.json();
    return data;
  }

  const data = await import("./category/data.json");

  return data;
};
export const getDemoData = async () => {
  const data = await import("./demo/demo.json");

  return data;
};
