import { useRootStore } from "@/store/storeContext";
import styles from "./doInfoSide.module.css";

const DoInfoSide = () => {
  const root = useRootStore();

  return (
    <section className={styles.root}>
      <section className={styles.header}>
        <h2 className={styles.headerTitle}>data1</h2>
        <button
          className={styles.analysisBtn}
          onClick={() => {
            root.relation(root.targetNode?.id || "0");
            root.setTargetNode(null);
          }}
        >
          연관 파악 실행하기
        </button>
      </section>
      <section className={styles.tab}>
        <div className={styles.tabItem}> 상세 정보</div>
      </section>
      <section className={styles.contents}>
        <div className={styles.contentsTable}>
          <div>id</div>
          <div>{root.targetNode?.id}</div>
          <div>이름</div>
          <div className={styles.dataPath}>{root.targetNode?.name}</div>
          <div>데이터 타입</div>
          <div>{root.targetNode?.type}</div>
          <div>생성자</div>
          <div>{root.targetNode?.user}</div>
        </div>
      </section>
    </section>
  );
};

export default DoInfoSide;
