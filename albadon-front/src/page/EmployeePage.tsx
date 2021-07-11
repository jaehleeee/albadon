import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import React, { useEffect } from 'react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ValueFormatterParams } from 'ag-grid-community';
import moment from 'moment';
import { useRecoilValue } from 'recoil';
import { employeeListState } from '../data/Selectors';


export const EmployeePage : React.FC = ()=>{
    const employeeList = useRecoilValue(employeeListState);
    const columnInfo = [

        { key : "employeeName", label: "이름", sortable: true, filter: false, width: 90, type: "string"},
        { key : "employeePhoneNumber", label: "전화번호 ", sortable: true, filter: false, width: 160, type: "string"},
        { key : "holidayWage", label: "주간시급", sortable: true, filter: false, width: 100, type: "number"},
        { key : "nightWage", label: "야간시급 ", sortable: true, filter: false, width: 100, type: "number"},
        { key : "startDate", label: "근무시작일", sortable: true, filter: false, width: 140, type: "date"},
        { key : "endDate", label: "근무종료일 ", sortable: true, filter: false, width: 140, type: "date"},
        { key : "role", label: "역할 ", sortable: true, filter: false,  width: 110, type: "string"},
    ]
    const valueFormatter = (params: ValueFormatterParams)=>{
        if(params.colDef.type === 'date'){
            return moment(params.value).format('YYYY/MM/DD')
        }else{
            return params.value
        }
        
    }
    return <div id="EmployeePage">
       

       <div className="ag-theme-alpine" >
           <AgGridReact
               rowData={employeeList}>
                {columnInfo.map(column=>{
                    return  <AgGridColumn field={column.key} headerName={column.label} sortable={column.sortable} width={column.width} filter={column.filter} valueFormatter={valueFormatter} type={column.type}></AgGridColumn>
                })}
           </AgGridReact>
       </div></div>
}