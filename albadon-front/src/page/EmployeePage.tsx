import React, { useState } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { infoBarState, infoModalState } from "../data/Atoms";
import DataGrid from "react-data-grid";
import { ColumnType } from "../component/datagrid/DataEditors";
import "./EmployeePage.scss";

import { createEmployee, deleteEmployee } from "../service/EmployeeService";
import { CommonDataModal } from "../component/datagrid/CommonDataModal";
import {
  ContractDetail,
  ContractSchedule,
  Employee,
  MinWage,
} from "../data/Interfaces";
import { RouteComponentProps, useHistory } from "react-router";
import { minWageState } from "../data/BossAtoms";
import {
  contractDetailState,
  contractScheduleListQuerySeqState,
  contractScheduleListState,
  contractSummaryState,
} from "../data/ContractAtoms";
import {
  employeeListQuerySeqState,
  employeeListState,
  storeDetailState,
} from "../data/StoreAtoms";
import {
  createContractDetail,
  deleteContractDetail,
  updateContractDetail,
} from "../service/ContractService";
import { ContractDetailRequest } from "../service/Interfaces";
import { useAPICall } from "../hook/useAPICall";

import calculatorIcon from "../icons/calculator.svg";
import { Sidebar } from "../layout/Sidebar";

export const EmployeePage: React.FC<RouteComponentProps> = (
  routeProps: RouteComponentProps
) => {
  const history = useHistory();

  const setInfoBar = useSetRecoilState(infoBarState);
  const store = useRecoilValue(storeDetailState);
  const minWage = useAPICall<MinWage>(useRecoilValueLoadable(minWageState));
  const employeeList = useAPICall<Employee[]>(
    useRecoilValueLoadable(employeeListState)
  );
  const contractDetail = useAPICall<ContractDetail>(
    useRecoilValueLoadable(contractDetailState)
  );
  const contractScheduleList = useAPICall<ContractSchedule[]>(
    useRecoilValueLoadable(contractScheduleListState)
  );
  const [contractSummary, setContractSummary] =
    useRecoilState(contractSummaryState);
  const setEmployeeListQuerySeq = useSetRecoilState(employeeListQuerySeqState);
  const setContractScheduleListQuerySeqState = useSetRecoilState(
    contractScheduleListQuerySeqState
  );
  const resetContractSummary = useResetRecoilState(contractSummaryState);

  const [modifyTargetContract, setModifyTargetContract] =
    useState<Employee | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

  const [modifyTargetDetail, setModifyTargetDetail] = useState<any | null>(
    null
  );
  const [createDetailModalOpen, setCreateDetailModalOpen] =
    useState<boolean>(false);

  const setInfoModal = useSetRecoilState(infoModalState);

  const columnDef = [
    { key: "contractId", name: "??????ID", maxWidth: 0, visible: false },
    {
      key: "employeeName",
      name: "??????",
      editable: false,
      type: ColumnType.TEXT,
      mandatory: true,
    },
    {
      key: "employeePhoneNumber",
      name: "?????????",
      width: 130,
      editable: false,
      type: ColumnType.PHONE,
      mandatory: true,
    },
    {
      key: "wage",
      name: "????????????",
      editable: false,
      type: ColumnType.NUMBER,
      defaultValue: minWage.contents.value,
      mandatory: true,
    },
    // {
    //   key: "holidayWage",
    //   name: "????????????",
    //   editable: false,
    //   type: ColumnType.NUMBER,
    // },
    // {
    //   key: "nightWage",
    //   name: "????????????",
    //   editable: false,
    //   type: ColumnType.NUMBER,
    // },
    {
      key: "startDate",
      name: "???????????????",
      width: 150,
      editable: false,
      type: ColumnType.DATE,
      mandatory: true,
    },
    // {
    //   key: "endDate",
    //   name: "???????????????",
    //   width: 150,
    //   editable: false,
    //   type: ColumnType.DATE,
    // },
    {
      key: "role",
      name: "??????",
      editable: false,
      type: ColumnType.COMBO,
      comboArray: [
        { value: "manager", label: "manager" },
        { value: "employee", label: "employee" },
      ],
      mandatory: true,
    },
    {
      key: "buttons",
      name: "",
      editable: false,
      formatter: (p: any) => {
        return (
          <div>
            <button
              className="modify-btn"
              onClick={() => {
                setModifyTargetContract(p.row);
              }}
            >
              ??????
            </button>
            <button
              className="delete-btn"
              onClick={() => {
                setInfoModal({
                  open: true,
                  label: `${p.row.employeeName} ?????? ??????????????????????`,
                  onConfirm: () => {
                    deleteEmployee(+p.row.contractId)
                      .then((res) => {
                        resetContractSummary();
                        setEmployeeListQuerySeq((currVal) => currVal + 1);
                      })
                      .catch((e) => {
                        setInfoBar({
                          open: true,
                          label: "?????? ????????? ??????????????? ????",
                          type: "error",
                        });
                        setInterval(() => {
                          setInfoBar({
                            open: false,
                            label: "",
                            type: "",
                          });
                        }, 8000);
                      });
                  },
                  onCancel: () => {},
                });
              }}
            >
              ??????
            </button>
          </div>
        );
      },
    },
  ];
  const dateLabel = ["???", "???", "???", "???", "???", "???", "???"];
  const contractDetailColumnList = [
    {
      key: "contractDetailId",
      name: "????????????ID",
      maxWidth: 0,
      visible: false,
    },
    {
      key: "weekday",
      name: "??????",
      editable: false,
      mandatory: true,
      type: ColumnType.COMBO,
      comboArray: dateLabel.map((date, idx) => {
        return { value: `${idx}`, label: dateLabel[idx] };
      }),
      formatter: (p: any) => {
        return <div>{`${dateLabel[+p.row["weekday"]]}`}</div>;
      },
    },
    {
      key: "startTime",
      name: "????????????",
      editable: false,
      mandatory: true,
      type: ColumnType.START_TIME,
    },
    {
      key: "endTime",
      name: "????????????",
      editable: false,
      mandatory: true,
      type: ColumnType.END_TIME,
    },
    {
      key: "buttons",
      name: "",
      editable: false,
      visible: false,
      formatter: (p: any) => {
        return (
          <div>
            <button
              className="modify-btn"
              onClick={() => {
                setModifyTargetDetail(p.row);
              }}
            >
              ??????
            </button>
            <button
              className="delete-btn"
              onClick={() => {
                setInfoModal({
                  open: true,
                  label: `${
                    contractDetail?.contents?.employee?.employeeName
                  } ?????? ${
                    dateLabel[p.row.weekday]
                  }?????? ???????????? ??????????????????????`,
                  onConfirm: () => {
                    deleteContractDetail(p.row.contractDetailId)
                      .then((res) => {
                        setContractScheduleListQuerySeqState(
                          (currVal) => currVal + 1
                        );
                      })
                      .catch(() => {
                        setInfoBar({
                          open: true,
                          label: "????????? ????????? ??????????????? ????",
                          type: "error",
                        });
                        setInterval(() => {
                          setInfoBar({
                            open: false,
                            label: "",
                            type: "",
                          });
                        }, 8000);
                      });
                  },
                  onCancel: () => {},
                });
              }}
            >
              ??????
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <Sidebar {...routeProps} />
      <div id="EmployeePage">
        {createModalOpen && (
          <CommonDataModal
            onClose={() => {
              setCreateModalOpen(false);
            }}
            onSave={(newRow: any) => {
              createEmployee({ ...newRow, storeId: store.storeId })
                .then(() => {
                  setEmployeeListQuerySeq((currVal) => currVal + 1);
                })
                .catch(() => {
                  setInfoBar({
                    open: true,
                    label: "?????? ????????? ??????????????? ????",
                    type: "error",
                  });
                  setInterval(() => {
                    setInfoBar({
                      open: false,
                      label: "",
                      type: "",
                    });
                  }, 8000);
                });
            }}
            colDef={columnDef}
            initialRow={{}}
            title="?????? ??????"
          />
        )}
        {modifyTargetContract && (
          <CommonDataModal
            onClose={() => {
              setModifyTargetContract(null);
            }}
            onSave={(newRow: any) => {}}
            colDef={columnDef}
            initialRow={modifyTargetContract}
            title="?????? ??????"
          />
        )}
        <div className="data-grid">
          <div className="title">
            {store.storeName && (
              <h1 className="highlight">{`${store.storeName}`}</h1>
            )}
            <h1>{`?????? ??????`}</h1>
          </div>
          <button
            className="add-btn"
            onClick={() => {
              setCreateModalOpen(true);
            }}
          >
            ?????? ??????
          </button>
          <DataGrid
            columns={columnDef}
            rows={
              employeeList.state === "hasValue" ? employeeList.contents : []
            }
            defaultColumnOptions={{
              resizable: true,
            }}
            className="common-data-grid"
            onRowClick={(idx, value) => {
              setContractSummary(value);
            }}
          />
        </div>

        {contractSummary &&
          contractDetail.state === "hasValue" &&
          createDetailModalOpen && (
            <CommonDataModal
              onClose={() => {
                setCreateDetailModalOpen(false);
              }}
              onSave={(newRow: any) => {
                const request: ContractDetailRequest = {
                  contractId: contractDetail.contents.contractId,
                  endTime: `${newRow.endTime}`.substring(0, 5),
                  startTime: `${newRow.startTime}`.substring(0, 5),
                  weekday: newRow.weekday,
                };
                createContractDetail(request)
                  .then((res) => {
                    setContractScheduleListQuerySeqState(
                      (currVal) => currVal + 1
                    );
                  })
                  .catch(() => {
                    setInfoBar({
                      open: true,
                      label: "????????? ????????? ??????????????? ????",
                      type: "error",
                    });
                    setInterval(() => {
                      setInfoBar({
                        open: false,
                        label: "",
                        type: "",
                      });
                    }, 8000);
                  });
              }}
              colDef={contractDetailColumnList}
              initialRow={{}}
              title="????????? ??????"
            />
          )}
        {contractDetail?.state === "hasValue" && modifyTargetDetail && (
          <CommonDataModal
            onClose={() => {
              setModifyTargetDetail(null);
            }}
            onSave={(newRow: any) => {
              const request: ContractDetailRequest = {
                contractId: contractDetail.contents.contractId,
                endTime: newRow.endTime,
                startTime: newRow.startTime,
                weekday: newRow.weekday,
              };
              updateContractDetail(modifyTargetDetail.contractDetailId, request)
                .then((res) => {
                  setContractScheduleListQuerySeqState(
                    (currVal) => currVal + 1
                  );
                })
                .catch(() => {
                  setInfoBar({
                    open: true,
                    label: "????????? ????????? ??????????????? ????",
                    type: "error",
                  });
                  setInterval(() => {
                    setInfoBar({
                      open: false,
                      label: "",
                      type: "",
                    });
                  }, 8000);
                });
            }}
            colDef={contractDetailColumnList}
            initialRow={modifyTargetDetail}
            title="????????? ??????"
          />
        )}

        {contractDetail?.state === "hasValue" &&
        contractDetail?.contents?.employee?.employeeName ? (
          <div className="detail data-grid">
            <div className="title">
              <h1 className="highlight">{`${contractDetail?.contents?.employee?.employeeName}`}</h1>
              <h1>{` ?????? ????????? ??????`}</h1>
            </div>

            <button
              className="add-btn"
              onClick={() => {
                setCreateDetailModalOpen(true);
              }}
              disabled={contractScheduleList.contents.length === 7}
            >
              ????????? ??????
            </button>
            <button
              className="add-btn"
              onClick={() => {
                history.push(`calculator/${contractSummary.contractId}`);
              }}
            >
              <img id="calculatorIcon" alt="cal" src={calculatorIcon} />
              ????????? ?????????
            </button>
            <DataGrid
              columns={contractDetailColumnList}
              rows={
                contractScheduleList.state === "hasValue"
                  ? contractScheduleList.contents
                  : []
              }
              defaultColumnOptions={{
                resizable: true,
              }}
              className="detail-data-grid"
            />
          </div>
        ) : (
          <div className="info-icon empty-data-grid">
            ????????? ???????????? ???????????? ????????? ??? ?????????
          </div>
        )}
      </div>
    </>
  );
};
