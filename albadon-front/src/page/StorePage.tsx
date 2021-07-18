import React from "react";
import { useRecoilValue } from "recoil";
import { storeListState } from "../data/Selectors";
import {
  ColumnType,
  CommonDataGrid,
} from "../component/datagrid/CommonDataGrid";
import "./StorePage.scss";

export const StorePage: React.FC = () => {
  const storeList = useRecoilValue(storeListState);
  console.log(storeList);
  const columnDef = [
    {
      key: "storeName",
      name: "가게명",
      type: ColumnType.TEXT,
      editable: true,
    },
    {
      key: "storeAddress",
      name: "주소",
      width: 400,
      type: ColumnType.TEXT,
      editable: true,
    },
    {
      key: "storePhoneNumber",
      name: "가게 전화번호",
      type: ColumnType.TEXT,
      editable: true,
    },
  ];

  return (
    <div id="StorePage">
      <CommonDataGrid columns={columnDef} rows={storeList} />
    </div>
  );
};
