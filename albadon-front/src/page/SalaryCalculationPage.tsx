import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { SampleComponent } from "../component/SampleComponent";
import { currentStoreId } from "../data/Atoms";
import { currentStoreState } from "../data/Selectors";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { getEmpMonthWorkInfo } from "../service/SalaryCalculationService";

export const SalaryCalculationPage = () => {
  const store = useRecoilValue(currentStoreState);
  const [storeId, setStoreId] = useRecoilState(currentStoreId);
  const [workData, setWorkData] = useState();

  useEffect(() => {
    getEmpMonthWorkInfo().then((res) => {
      setWorkData(res.data.data);
    });
  }, [storeId]);
  const columnInfo = [
    { key: "date", label: "날짜", sortable: true, filter: true },
    { key: "weekDay", label: "요일", sortable: true, filter: true },
    { key: "weekSeq", label: "주차", sortable: true, filter: true },
    { key: "workingFlag", label: "근무여부", sortable: true, filter: true },
    {
      key: "startDatetime",
      label: "근무시작시간",
      sortable: true,
      filter: true,
    },
    { key: "endDatetime", label: "근무종료시간", sortable: true, filter: true },
    {
      key: "workingTimeMinutes",
      label: "근무시간(분)",
      sortable: true,
      filter: true,
    },
    {
      key: "workingTimeHours",
      label: "근무시간(시)",
      sortable: true,
      filter: true,
    },
    {
      key: "weekWorkingTimeSum",
      label: "주간근무시간",
      sortable: true,
      filter: true,
    },
    {
      key: "expectedHolidayTime",
      label: "예상주휴시간",
      sortable: true,
      filter: true,
    },
    { key: "weekSalary", label: "주급", sortable: true, filter: true },
    { key: "weekSalarySum", label: "주급합산", sortable: true, filter: true },
    {
      key: "preWeekSalary",
      label: "지난달 마지막 주 주급",
      sortable: true,
      filter: true,
    },
    { key: "finalSalary", label: "최종월급", sortable: true, filter: true },
  ];
  return (
    <div
      id="SalaryCalculationPage"
      className="ag-theme-alpine"
      style={{ height: 1000, width: 1200 }}
    >
      <AgGridReact rowData={workData}>
        {columnInfo.map((column) => {
          return (
            <AgGridColumn
              field={column.key}
              headerName={column.label}
              sortable={column.sortable}
              filter={column.filter}
            ></AgGridColumn>
          );
        })}
      </AgGridReact>
    </div>
  );
};
