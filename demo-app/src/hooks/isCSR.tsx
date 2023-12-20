import { useEffect, useState } from "react";

export const useCSR = () => {
  const [isCSR, setIsCSR] = useState(false);

  useEffect(() => {
    setIsCSR(true);
  }, []);

  return typeof window !== "undefined" || isCSR;
};
