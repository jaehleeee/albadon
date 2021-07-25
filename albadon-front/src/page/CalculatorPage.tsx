import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { storeListState } from "../data/Selectors";
import {
  ColumnType,
  CommonDataGrid,
} from "../component/datagrid/CommonDataGrid";
import "./CalculatorPage.scss";
import { Button } from "@material-ui/core";
import moment from "moment";
import { getWorkList } from "../service/WorkService";

export interface CalculatorPageI {
  match: any;
}

export const CalculatorPage: React.FC<CalculatorPageI> = ({ match }) => {
  const [workList, setWorkList] = useState<any[]>([]);
  const [targetYear, setTargetYear] = useState<number>(
    //+moment().format("YYYY")
    2021
  );
  const [targetMonth, setTargetMonth] = useState<number>(
    // +moment().format("MM")
    6
  );
  useEffect(() => {
    getWorkList({
      contractId: match.params.contractId,
      year: targetYear,
      month: targetMonth,
    }).then((res) => {
      setWorkList(res.data);
    });
  }, [match.params.contractId, targetYear, targetMonth]);

  const columnDef = [
    {
      key: "weekday",
      name: "상호",
      type: ColumnType.TEXT,
      editable: true,
    },
    {
      key: "startTime",
      name: "주소",
      width: 400,
      type: ColumnType.TEXT,
      editable: true,
    },
    {
      key: "endTime",
      name: "전화번호",
      type: ColumnType.TEXT,
      editable: true,
    },
  ];

  return (
    <div id="CalculatorPage">
      <CommonDataGrid
        title="알바비 계산기"
        columns={columnDef}
        rows={workList}
        insertable={false}
      />
    </div>
  );
};
