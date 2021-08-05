import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import DataGrid from "react-data-grid";
import {
  ColumnType,
  NumberEditor,
  TimeEditor,
} from "../component/datagrid/CommonDataGrid";
import "./CalculatorPage.scss";

import {
  targetMonthState,
  targetYearState,
  workListQuerySeqState,
  workListState,
} from "../data/WorkAtoms";

export interface CalculatorPageI {
  match: any;
}

export const CalculatorPage: React.FC<CalculatorPageI> = ({ match }) => {
  const [targetYear, setTargetYear] = useRecoilState(targetYearState);
  const [targetMonth, setTargetMonth] = useRecoilState(targetMonthState);
  const workList = useRecoilValue(workListState);
  const setWorkListQuerySeqState = useSetRecoilState(workListQuerySeqState);

  const columnDef = [
    {
      key: "workDate",
      name: "날짜",
      editable: false,
    },
    {
      key: "weekday",
      name: "요일",
      editable: false,
    },
    {
      key: "startTime",
      name: "출근 시각",
      type: ColumnType.START_TIME,
      editor: TimeEditor(),
      editable: true,
    },
    {
      key: "endTime",
      name: "퇴근 시각",
      type: ColumnType.END_TIME,
      editor: TimeEditor(),
      editable: true,
    },
    {
      key: "pauseInfo",
      name: "휴게 시간(분)",
      type: ColumnType.NUMBER,
      editor: NumberEditor,
      editable: true,
    },
  ];

  return (
    <div id="CalculatorPage">
      <div className="data-gird">
        <DataGrid
          columns={columnDef}
          rows={workList}
          defaultColumnOptions={{
            resizable: true,
          }}
          className="common-data-grid"
        />
      </div>
      {/* <CommonDataGrid
        title={
          <>
            <select
              id="storeSelect"
              className="title-highlight"
              onChange={(e) => setTargetYear(+e.target.value)}
              value={targetYear}
            >
              {[2021, 2020].map((year) => {
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
            <h1>{`년 `}</h1>
            <select
              id="storeSelect"
              className="title-highlight"
              onChange={(e) => setTargetMonth(+e.target.value)}
              value={targetMonth}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((year) => {
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
            <h1>{`월 ${employeeName} 님의 실근무이력`}</h1>
          </>
        }
        columns={columnDef}
        rows={workList}
      /> */}
    </div>
  );
};
