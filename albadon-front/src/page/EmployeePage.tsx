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
import { ContractDetail, ContractSchedule, Employee } from "../data/Interfaces";
import { useHistory } from "react-router";
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

export const EmployeePage: React.FC = () => {
  const history = useHistory();

  const setInfoBar = useSetRecoilState(infoBarState);
  const store = useRecoilValue(storeDetailState);
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

  const [modifyTargetDetail, setModifyTargetDetail] =
    useState<any | null>(null);
  const [createDetailModalOpen, setCreateDetailModalOpen] =
    useState<boolean>(false);

  const setInfoModal = useSetRecoilState(infoModalState);

  const columnDef = [
    { key: "contractId", name: "계약ID", maxWidth: 0, visible: false },
    {
      key: "employeeName",
      name: "이름",
      editable: false,
      type: ColumnType.TEXT,
      mandatory: true,
    },
    {
      key: "employeePhoneNumber",
      name: "연락처",
      width: 130,
      editable: false,
      type: ColumnType.PHONE,
      mandatory: true,
    },
    {
      key: "wage",
      name: "주간시급",
      editable: false,
      type: ColumnType.NUMBER,
      mandatory: true,
    },
    {
      key: "holidayWage",
      name: "휴일시급",
      editable: false,
      type: ColumnType.NUMBER,
    },
    {
      key: "nightWage",
      name: "야간시급",
      editable: false,
      type: ColumnType.NUMBER,
    },
    {
      key: "startDate",
      name: "근무시작일",
      width: 150,
      editable: false,
      type: ColumnType.DATE,
      mandatory: true,
    },
    // {
    //   key: "endDate",
    //   name: "근무종료일",
    //   width: 150,
    //   editable: false,
    //   type: ColumnType.DATE,
    // },
    {
      key: "role",
      name: "역할",
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
              수정
            </button>
            <button
              className="delete-btn"
              onClick={() => {
                setInfoModal({
                  open: true,
                  label: `${p.row.employeeName} 님을 삭제하시겠어요?`,
                  onConfirm: () => {
                    deleteEmployee(+p.row.contractId)
                      .then((res) => {
                        resetContractSummary();
                      })
                      .catch((e) => {
                        setInfoBar({
                          open: true,
                          label: "직원 삭제에 실패했어요 😭",
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
              삭제
            </button>
          </div>
        );
      },
    },
  ];
  const dateLabel = ["일", "월", "화", "수", "목", "금", "토"];
  const contractDetailColumnList = [
    {
      key: "contractDetailId",
      name: "계약상세ID",
      maxWidth: 0,
      visible: false,
    },
    {
      key: "weekday",
      name: "요일",
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
      name: "시작시간",
      editable: false,
      mandatory: true,
      type: ColumnType.START_TIME,
    },
    {
      key: "endTime",
      name: "종료시간",
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
              수정
            </button>
            <button
              className="delete-btn"
              onClick={() => {
                setInfoModal({
                  open: true,
                  label: `${
                    contractDetail?.contents?.employee?.employeeName
                  } 님의 ${
                    dateLabel[p.row.weekday]
                  }요일 스케줄을 삭제하시겠어요?`,
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
                          label: "스케줄 삭제에 실패했어요 😭",
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
              삭제
            </button>
          </div>
        );
      },
    },
  ];
  return (
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
                  label: "직원 추가에 실패했어요 😭",
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
          title="직원 추가"
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
          title="직원 수정"
        />
      )}
      <div className="data-grid">
        <div className="title">
          {store.storeName && (
            <h1 className="highlight">{`${store.storeName}`}</h1>
          )}
          <h1>{`직원 관리`}</h1>
        </div>
        <button
          className="add-btn"
          onClick={() => {
            setCreateModalOpen(true);
          }}
        >
          직원 추가
        </button>
        <DataGrid
          columns={columnDef}
          rows={employeeList.state === "hasValue" ? employeeList.contents : []}
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
                    label: "스케줄 추가에 실패했어요 😭",
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
            title="스케줄 추가"
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
                setContractScheduleListQuerySeqState((currVal) => currVal + 1);
              })
              .catch(() => {
                setInfoBar({
                  open: true,
                  label: "스케줄 수정에 실패했어요 😭",
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
          title="스케줄 수정"
        />
      )}

      {contractDetail?.state === "hasValue" &&
      contractDetail?.contents?.employee?.employeeName ? (
        <div className="detail data-grid">
          <div className="title">
            <h1 className="highlight">{`${contractDetail?.contents?.employee?.employeeName}`}</h1>
            <h1>{` 님의 스케줄 관리`}</h1>
          </div>

          <button
            className="add-btn"
            onClick={() => {
              setCreateDetailModalOpen(true);
            }}
            disabled={contractScheduleList.contents.length === 7}
          >
            스케줄 추가
          </button>
          <button
            className="add-btn"
            onClick={() => {
              history.push(`calculator/${contractSummary.contractId}`);
            }}
          >
            <img id="calculatorIcon" alt="cal" src={calculatorIcon} />
            알바비 계산기
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
          직원을 선택하면 스케줄을 확인할 수 있어요
        </div>
      )}
    </div>
  );
};
