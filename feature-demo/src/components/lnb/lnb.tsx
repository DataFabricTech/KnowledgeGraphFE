"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const linkList = [
  { label: "선택", link: "./select" },
  { label: "대용량 노드", link: "./big-node" },
  { label: "네트워크 다이어그램 레이아웃", link: "./network-diagram-layout" },
  { label: "카테고리 레이아웃", link: "./category-layout" },
  { label: "줌 카테고리 레이아웃", link: "./category-layout-zoom" },
  { label: "노드 줌", link: "./node-zoom" },
  { label: "노드 추가", link: "./add-node" },
];

const LNB = () => {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <ul>
      {linkList.map(({ label, link }) => {
        return (
          <li key={label}>
            <Link href={link}>{label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default LNB;
