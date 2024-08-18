import * as ITEM from "knowledge-graph-canvas";
import { Category } from "knowledge-graph-canvas/dist/category-graph";
const { CategoryGraph } = ITEM;
const categoryContainer = document.getElementById("category") as HTMLDivElement;

const categoryData: Category = {
  id: "1002",
  name: "서울",

  children: [
    {
      id: "1004",
      name: "강남구",

      children: [],
      nodeList: [
        { id: "411", name: "논현1동" },
        { id: "412", name: "삼성2동" },
        { id: "413", name: "역삼1동" },
        { id: "414", name: "일원본동" },
        { id: "436", name: "논현2동" },
        { id: "437", name: "도곡1동" },
        { id: "464", name: "청담동" },
        { id: "518", name: "수서동" },
        { id: "682", name: "일원1동" },
        { id: "683", name: "일원2동" },
        { id: "369", name: "신사동" },
      ],
    },
    {
      id: "1005",
      name: "강동구",

      children: [],
      nodeList: [
        { id: "349", name: "둔촌1동" },
        { id: "350", name: "성내1동" },
        { id: "351", name: "암사3동" },
        { id: "352", name: "천호1동" },
        { id: "465", name: "둔촌2동" },
        { id: "483", name: "성내2동" },
        { id: "484", name: "천호2동" },
        { id: "519", name: "천호3동" },
        { id: "574", name: "명일1동" },
        { id: "623", name: "암사2동" },
        { id: "647", name: "명일2동" },
        { id: "684", name: "성내3동" },
        { id: "685", name: "암사1동" },
      ],
    },
    {
      id: "1006",
      name: "강북구",

      children: [],
      nodeList: [
        { id: "353", name: "번2동" },
        { id: "354", name: "수유1동" },
        { id: "415", name: "번3동" },
        { id: "438", name: "수유2동" },
        { id: "485", name: "삼각산동" },
        { id: "486", name: "수유3동" },
        { id: "520", name: "삼양동" },
        { id: "548", name: "미아동" },
        { id: "549", name: "우이동" },
        { id: "605", name: "송중동" },
        { id: "606", name: "인수동" },
        { id: "648", name: "번1동" },
        { id: "649", name: "송천동" },
      ],
    },
  ],

  nodeList: [],
};

const graph = new CategoryGraph({
  container: categoryContainer,
  categoryData,
  pixelQuality: "middle",
});
