import { CategoryGraph, NetworkDiagram } from "knowledge-graph-canvas";
import { Category } from "knowledge-graph-canvas/dist/category-graph";
import {
  NetworkDiagramEdgeInfo,
  NetworkDiagramNodeInfo,
} from "knowledge-graph-canvas/dist/network-diagram/layout/layout.type";

const categoryContainer = document.getElementById("category") as HTMLDivElement;

const categoryData = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "ROOT",
  children: [
    {
      id: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
      parentId: "550e8400-e29b-41d4-a716-446655440000",
      tagId: "63dd5318-2908-4bf4-84f8-4b71dcc518c7",
      name: "미분류",
      desc: "미분류",
      children: [
        {
          id: "21cdb3bc-ecb7-407f-a3f2-4c1ddfd8c046",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "INNODB_CMP_PER_INDEX_RESET",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "2268c2bc-aa18-4369-bd7e-fdf40e58522d",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "character_sets",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "22aa3a34-372d-4e72-b1c0-01a511b7d042",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "foreign_data_wrapper_options",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "24a89e5b-d483-40a3-9ef3-34092fdde533",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "한국연구재단_연도별_채용공고별_지원현황",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "27c0adc8-8e9d-4ea7-aaa7-1494d6375978",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "routine_column_usage",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "2823dfc4-5065-41e2-966a-e691c002c0e2",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "충청북도_충주시_굿충주헬스케어_콘텐츠정보",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "285aff36-4fce-48b6-afb4-3aa22dca58fb",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "부산광역시_동래구_아동복지시설현황",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "28608390-561a-45b9-be21-7f1c0b41a859",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "_pg_foreign_table_columns",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "2b751890-2122-4489-833c-5a48edd906f1",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "CHECK_CONSTRAINTS",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "2c2c0c7d-2069-4315-a88c-91228cfbd5a7",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "addr",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "2cde1804-ecc4-4640-ba90-c6dc900e40fd",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "VIEWS",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "2ce74edc-7133-4d47-9afa-cd23df4fd8b5",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "tb_seocho_50m_grid_area",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "2d3d2e85-5bb6-4d0b-b031-0772e4a10a79",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "TRIGGERS",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "2eef7ade-33e3-4f33-b8bd-b7ac7e29b2ca",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "transforms",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "2f6ae1f7-b0fd-4474-ad30-9ffb63e7dc65",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "topology",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "30737167-dd95-4466-8d13-20e344e7b112",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "_pg_foreign_tables",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "3185d3d8-8965-41f4-aca7-2794b28f7d46",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "INNODB_FT_BEING_DELETED",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "3199ded9-7634-4c92-b514-84f39b9ca1c3",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "과학기술정보통신부_회선설비_보유_기간통신사",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "31b752df-6599-4287-9cd6-7a952ffc7a91",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "user_mappings",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "31c56545-324f-412d-9a4e-8564e31b5dcb",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "transforms",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "3259341d-2563-4f99-80bf-c00293234eee",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "column_column_usage",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "32b19a55-4913-4334-8a68-e461b08b8716",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "column_options",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "32ba7135-8b5c-442e-be07-65d81d6c4f86",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "사립학교교직원연금공단_지역별_연금수급자_인원현황(주소지)",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "33c28769-05b4-4563-b28a-782a9fb0fa0c",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "tbl_day_daejeon_weather",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "340432e5-93b0-4871-b4ed-189389eeb0e6",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "user_defined_types",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "3409b4e1-3437-4d31-9de2-7cd11d07220d",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "PARAMETERS",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "340c170f-03fe-4cc9-86a3-ce217346215b",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "view_table_usage",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "34ade37c-89a9-40ce-bc7b-979374a3f0fc",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "table_constraints",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "35bd6832-38c1-4101-9f70-b3e95f8d2121",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "한국연구재단_학교검색_리스트_목록",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "364f35cb-4ba5-46a5-b348-b08ff3415efa",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "TABLES",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "365ef121-a113-4241-87df-80822874d6a2",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "routines",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "37e3089f-651b-444a-9ddf-dc286a295f82",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "_pg_foreign_data_wrappers",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "380f2f60-e198-4dfd-9ede-f31dda982354",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "applicable_roles",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "38916dfb-1daa-4990-8244-5067c47628a4",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "routine_routine_usage",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "38cff74b-103e-49d3-b593-9c4a8dd4a753",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "국민건강보험공단_신규_중증(암)등록환자의_암",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "38f0ead5-aee0-44aa-8e8a-d68c1ed9cfdd",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "routine_privileges",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "3925c1e3-0e70-43f6-9c01-6ec2b2c52f72",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "constraint_table_usage",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "3ae96dff-d45b-4607-965a-7b0413371209",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "서울특별시_종로구_어린이집",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "3b3b9728-9476-4932-b321-31ec470718ac",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "column_column_usage",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "3c7ed01b-df82-4236-a996-b27f0bb7a6ce",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "routines",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "3cf23761-8e1d-458b-a8bf-0fdb8b1c3ba4",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "domain_constraints",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "3ea70c78-c984-493d-b039-c189755baf45",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "check_constraint_routine_usage",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "3f7f4c82-f910-48e6-99cd-7e98c9d6cedd",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "sequences",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "3f8d8745-b673-4df0-a6e8-03cedfff3d2e",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "열차_혼잡도_최고치",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "40de545a-889b-4251-a67e-f0027a697ab0",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "전북특별자치도_완주군_의료기관현황",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "410aa535-6e30-4475-bd51-046102549e1d",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "INNODB_TABLESPACES_BRIEF",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "0268c60b-d3e9-41b5-bd0c-49dc3ec9df2b",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "domain_udt_usage",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "0274437e-72d7-4521-a1b2-080d16768754",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "foreign_tables",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "02f604fd-2c8a-4661-806f-edfe72283d5e",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "information_schema_catalog_name",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "081bbdaa-7a78-47a5-9720-88871d19c1f8",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "role_udt_grants",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "09064956-509b-47d3-9e75-25ca775826e3",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "_pg_user_mappings",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "0930064b-3789-4f77-92af-30e423f6b2f3",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "routine_column_usage",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "0b151a8d-eb04-4045-95c2-3041fcbe396d",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "tabblock",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "0c34b147-2845-4560-b32e-b704b4a719d1",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "information_schema_catalog_name",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "0c8710a3-ddc6-438e-ae40-5be5c043911f",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "tables",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "0d8fcebe-02e8-4801-b0f9-8f4cb55a7985",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "column_privileges",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "0e7a7edd-de41-4c99-affd-06a44d2f2c53",
          parentId: "ff7c765c-d4d0-458b-884e-bb9ebca3efc9",
          tagId: null,
          name: "대구광역시_토크대구_및_오픈소스_시스템",
          desc: null,
          children: [],
          nodeList: [],
        },
      ],
      nodeList: [],
    },
    {
      id: "9f582bd5-8c58-4d2f-ac56-60dfd5611139",
      parentId: "550e8400-e29b-41d4-a716-446655440000",
      tagId: "ebaf4374-b504-4899-b271-3a8c139b08f3",
      name: "카테고리1-2",
      desc: "설명 카테",
      children: [
        {
          id: "6a4ebc5b-9a28-4144-8fa2-cf7b483a20ce",
          parentId: "9f582bd5-8c58-4d2f-ac56-60dfd5611139",
          tagId: "cfb992c8-81cf-43f5-84e1-9acff66270ff",
          name: "수정",
          desc: "설명 수정",
          children: [],
          nodeList: [],
        },
      ],
      nodeList: [],
    },
    {
      id: "0f6d33bd-b2dd-4066-a91c-8de6930ae7bd",
      parentId: "550e8400-e29b-41d4-a716-446655440000",
      tagId: "9a31ac6e-caab-4b13-8067-eeb23e278e35",
      name: "카테고리1-3",
      desc: "카테고리 1-3 설명",
      children: [
        {
          id: "0827fbc0-f365-40c4-98e5-f4f354d75ded",
          parentId: "0f6d33bd-b2dd-4066-a91c-8de6930ae7bd",
          tagId: null,
          name: "INNODB_DATAFILES",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "09400e47-02e3-44c6-beae-312ff25ba9df",
          parentId: "0f6d33bd-b2dd-4066-a91c-8de6930ae7bd",
          tagId: null,
          name: "충청북도_단양군_흡연구역_정보",
          desc: null,
          children: [],
          nodeList: [],
        },
        {
          id: "0aa4a123-5d53-43b5-8913-71aa5c79e452",
          parentId: "0f6d33bd-b2dd-4066-a91c-8de6930ae7bd",
          tagId: null,
          name: "geometry_columns",
          desc: null,
          children: [],
          nodeList: [],
        },
      ],
      nodeList: [],
    },
    {
      id: "08a5a97d-a879-44de-900c-9f6e880a723f",
      parentId: "550e8400-e29b-41d4-a716-446655440000",
      tagId: "f142df8e-d5c5-4b1c-9c1d-25ed3d191832",
      name: "카테고리1-1-1",
      desc: "수정",
      children: [],
      nodeList: [],
    },
    {
      id: "2569ac52-0d31-4055-9192-21cb18f202a3",
      parentId: "550e8400-e29b-41d4-a716-446655440000",
      tagId: "7d471da4-33ca-458d-b951-cb8a040adef8",
      name: "제목",
      desc: "dhdhdh",
      children: [],
      nodeList: [],
    },
    {
      id: "ee9c5463-835d-44f2-bedc-efa751e49bac",
      parentId: "550e8400-e29b-41d4-a716-446655440000",
      tagId: "a4924925-b5c4-43d8-9584-bd902a75a3b9",
      name: "카테고리임시추가",
      desc: "오",
      children: [
        {
          id: "837ccd79-9512-4f55-8371-4dcc955e6529",
          parentId: "ee9c5463-835d-44f2-bedc-efa751e49bac",
          tagId: "6a89ce47-8468-4099-9e54-2f3ba0fd1805",
          name: "오엣",
          desc: "오",
          children: [
            {
              id: "b08e514f-852a-4b90-becf-75ac5a1ca712",
              parentId: "837ccd79-9512-4f55-8371-4dcc955e6529",
              tagId: "d2add500-15c2-4652-a5fb-a4b91b997318",
              name: "추가",
              desc: "우",
              children: [],
              nodeList: [],
            },
          ],
          nodeList: [],
        },
      ],
      nodeList: [],
    },
    {
      id: "6fe38450-08f4-4b97-9645-97bcc296668c",
      parentId: "550e8400-e29b-41d4-a716-446655440000",
      tagId: "ba1d4175-1653-45f5-ab32-45ee20bff118",
      name: "수정",
      desc: "오",
      children: [
        {
          id: "4131556c-81be-4002-a376-da20e5658661",
          parentId: "6fe38450-08f4-4b97-9645-97bcc296668c",
          tagId: "ab546612-d6a3-467f-b693-07ddc58e9e57",
          name: "수정추가",
          desc: "ㅇ",
          children: [
            {
              id: "6c270d11-8e42-4a13-80ad-90d665df7a56",
              parentId: "4131556c-81be-4002-a376-da20e5658661",
              tagId: "914b61c6-46be-4df0-94ef-9a034707836d",
              name: "뎁스더깊이",
              desc: "ㄴㅇ",
              children: [],
              nodeList: [],
            },
          ],
          nodeList: [],
        },
      ],
      nodeList: [],
    },
    {
      id: "49fc0423-9cdd-4854-8933-36d209b90df6",
      parentId: "550e8400-e29b-41d4-a716-446655440000",
      tagId: "72abdb94-2c94-4259-94a0-c0f9e5ce677d",
      name: "카테고리1",
      desc: "등",
      children: [],
      nodeList: [],
    },
    {
      id: "f5724be2-d938-4f51-8d03-83ff1a3164dd",
      parentId: "550e8400-e29b-41d4-a716-446655440000",
      tagId: "64c17108-08c8-461f-b954-4e94e5eceaba",
      name: "dd",
      desc: "dd",
      children: [],
      nodeList: [],
    },
  ],
  nodeList: [],
};
// const item: Category = {
//   id: "0099999",
//   name: "test",
//   children: [],
//   nodeList: [],
// };
// new Array(80).fill(null).forEach((_, i) => {
//   item.nodeList.push({ id: "100000" + i, name: i.toFixed() });
// });

// categoryData.children.push(item);

new CategoryGraph({
  container: categoryContainer,
  categoryData,
  pixelQuality: "middle",
  isFitScreenInit: true,
  // edgeStyle: {
  //   color: "red",
  // },
});

const relativeContainer = document.getElementById(
  "network-container"
) as HTMLDivElement;

const info = document.querySelector(".network-info") as HTMLDivElement;

let idCount = 10;

const nodes: NetworkDiagramNodeInfo[] = [
  { id: "n1", width: 100, height: 100, style: { backgroundColor: "red" } },
  { id: "n2", width: 100, height: 100 },
  { id: "n3", width: 100, height: 100 },
  { id: "n4", width: 100, height: 100 },
];
const edges: NetworkDiagramEdgeInfo[] = [
  {
    id: "e1",
    sources: ["n1"],
    targets: ["n2"],
    style: { isLabel: true, color: "red", fontSize: 20 },
    labels: [{ text: "최고점수" }],
  },
  { id: "e2", sources: ["n1"], targets: ["n3"] },
  { id: "e3", sources: ["n4"], targets: ["n1"] },
];
info.innerHTML = `
<div>
position x: 
</div>
<div>
position y: 
</div>
<div>
element id: 
</div>
<div>
element type: 
</div>
`;
const diagram = new NetworkDiagram({
  container: relativeContainer,
  nodes,
  edges,
  eventHandler: {
    onClick: (e, id, type) => {
      if (type === "node" && id) {
        const nodes: NetworkDiagramNodeInfo[] = [
          { id: `n${idCount++}`, width: 100, height: 100 },
          { id: `n${idCount++}`, width: 100, height: 100 },
          { id: `n${idCount++}`, width: 100, height: 100 },
        ];
        const edges: NetworkDiagramEdgeInfo[] = nodes.map((node) => ({
          id: `${id}_${node.id}`,
          sources: [id],
          targets: [node.id],
        }));

        diagram.addElement({ nodes, edges });
      }
    },
    onHover: (e, id, type) => {
      info.innerHTML = `
      <div>
      position x: ${e.offsetX || ""}
      </div>
      <div>
      position y: ${e.offsetY || ""}
      </div>
      <div>
      element id: ${id || "none"}
      </div>
      <div>
      element type: ${type || "none"}
      </div>
      `;
    },
  },
});
