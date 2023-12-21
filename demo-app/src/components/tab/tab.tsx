"use client";
import styles from "./tab.module.css";

type TabType = {
  name: string;
  id: string;
};

interface TabProps {
  tabList: TabType[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const Tab = ({ tabList, selectedId, onSelect }: TabProps) => {
  const selectedIdx = tabList.findIndex((tab) => tab.id === selectedId);
  console.log(process.env);

  return (
    <div className={styles.main}>
      {tabList.map((tab) => {
        const className = [styles.tab];
        if (selectedId === tab.id) {
          className.push(styles.selectedTab);
        }
        return (
          <div
            key={tab.id}
            className={className.join(" ")}
            onClick={() => onSelect(tab.id)}
          >
            {tab.name}
          </div>
        );
      })}
    </div>
  );
};

export default Tab;
