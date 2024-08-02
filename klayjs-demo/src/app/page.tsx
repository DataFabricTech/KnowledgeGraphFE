import Image from "next/image";
import styles from "./page.module.css";
import Canvas from "@/graph/Canvas";

export default function Home() {
  return (
    <main className={styles.main}>
      <Canvas />
    </main>
  );
}
