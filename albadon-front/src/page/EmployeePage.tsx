import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import React, { useEffect, useState } from 'react'
import { getEmployeeListByStoreId } from '../service/EmployeeService';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


export const EmployeePage : React.FC = ()=>{
    const [employeeList, setEmployeeList] = useState( []);

    useEffect(()=>{
       
            getEmployeeListByStoreId("1").then(res => setEmployeeList(res.data.data))
            
    }, [])

 

const columnInfo = [

    { key : "employeeName", label: "이름", sortable: true, filter: false, width: 90},
    { key : "employeePhoneNumber", label: "전화번호 ", sortable: true, filter: false, width: 160},
    { key : "holidayWage", label: "주간시급", sortable: true, filter: false, width: 100},
    { key : "nightWage", label: "야간시급 ", sortable: true, filter: false, width: 100},
    { key : "startDate", label: "근무시작일", sortable: true, filter: false, width: 140},
    { key : "endDate", label: "근무종료일 ", sortable: true, filter: false, width: 140},
    { key : "role", label: "역할 ", sortable: true, filter: false,  width: 110},
]
    
    return <div id="EmployeePage">
       

       <div className="ag-theme-alpine" >
           <AgGridReact
               rowData={employeeList}>
                {columnInfo.map(column=>{
                    return  <AgGridColumn field={column.key} headerName={column.label} sortable={column.sortable} width={column.width} filter={column.filter}></AgGridColumn>
                })}
           </AgGridReact>
       </div></div>
}