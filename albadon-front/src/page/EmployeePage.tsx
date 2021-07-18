import React from "react";
import { useRecoilValue } from "recoil";
import { employeeListState } from "../data/Selectors";
import {
  ColumnType,
  CommonDataGrid,
} from "../component/datagrid/CommonDataGrid";
import "./EmployeePage.scss";

export const EmployeePage: React.FC = () => {
  const employeeList = useRecoilValue(employeeListState);

  const columnDef = [
    {
      key: "employeeName",
      name: "이름",
      type: ColumnType.TEXT,
      editable: true,
    },
    {
      key: "employeePhoneNumber",
      name: "연락처",
      width: 130,
      type: ColumnType.TEXT,
      editable: true,
    },
    {
      key: "wage",
      name: "주간시급",
      type: ColumnType.NUMBER,
      editable: true,
    },
    {
      key: "holidayWage",
      name: "휴일시급",
      type: ColumnType.NUMBER,
      editable: true,
    },
    {
      key: "nightWage",
      name: "야간시급",
      type: ColumnType.NUMBER,
      editable: true,
    },
    {
      key: "startDate",
      name: "근무시작일",
      width: 150,
      type: ColumnType.DATE,
      editable: true,
    },
    {
      key: "endDate",
      name: "근무종료일",
      width: 150,
      type: ColumnType.DATE,
      editable: true,
    },
    {
      key: "role",
      name: "역할",
      type: ColumnType.COMBO,
      editable: true,
      comboArray: [
        { value: "manager", label: "manager" },
        { value: "employee", label: "employee" },
      ],
    },
  ];

  return (
    <div id="EmployeePage">
      <CommonDataGrid columns={columnDef} rows={employeeList} />
    </div>
  );
};
