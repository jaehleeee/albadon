import React, { useEffect, useMemo, useState } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import DataGrid from "react-data-grid";
import { NumberEditor, TimeEditor } from "../component/datagrid/CommonDataGrid";
import "./CalculatorPage.scss";

import {
  targetMonthState,
  targetYearState,
  workListQuerySeqState,
  workListState,
} from "../data/WorkAtoms";
import {
  contractDetailState,
  contractScheduleListState,
  contractSummaryState,
} from "../data/ContractAtoms";
import { ContractSchedule, WorkDetail } from "../data/Interfaces";
import { deleteWork, updateWorkList } from "../service/WorkService";
import { WorkUpdateRequest } from "../service/Interfaces";
import { storeDetailState } from "../data/StoreAtoms";
import { infoModalState } from "../data/Atoms";
import axios from "axios";
import moment from "moment";
import { Collapse } from "@material-ui/core";

export interface CalculatorPageI {
  match: any;
}

export const CalculatorPage: React.FC<CalculatorPageI> = ({ match }) => {
  const [targetYear, setTargetYear] = useRecoilState(targetYearState);
  const [targetMonth, setTargetMonth] = useRecoilState(targetMonthState);
  const store = useRecoilValue(storeDetailState);
  const workList = useRecoilValueLoadable(workListState);
  const contractDetail = useRecoilValueLoadable(contractDetailState);
  const contractScheduleList = useRecoilValueLoadable(
    contractScheduleListState
  );
  const setcontractSummaryState = useSetRecoilState(contractSummaryState);
  const setWorkListQuerySeqState = useSetRecoilState(workListQuerySeqState);

  const setInfoModal = useSetRecoilState(infoModalState);

  const [editedRows, setEditedRows] = useState<WorkDetail[]>([]);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const dayList = ["일", "월", "화", "수", "목", "금", "토"];

  useEffect(() => {
    match.params.contractId &&
      setcontractSummaryState({ contractId: match.params.contractId });
  }, [match]);

  const columnDef = [
    {
      key: "workId",
      name: "workId",
      maxWidth: 0,
    },
    {
      key: "workDate",
      name: "날짜",
      editable: false,
    },
    {
      key: "weekday",
      name: "요일",
      editable: false,
      formatter: (p: any) => {
        return <>{`${dayList[+p.row.weekday]}요일`}</>;
      },
    },
    {
      key: "startTime",
      name: "출근 시각",
      editor: TimeEditor("00:00"),
      formatter: (p: any) => {
        return (
          <div
            className={
              editedRows.length > 0 &&
              editedRows[p.rowIdx]?.startTime !==
                workList.contents[p.rowIdx]?.startTime
                ? "editied-cell"
                : ""
            }
          >
            {(p.row.startTime || "").substring(0, 5)}
          </div>
        );
      },
      editable: true,
    },
    {
      key: "endTime",
      name: "퇴근 시각",
      editor: TimeEditor("00:00"),
      formatter: (p: any) => {
        return (
          <div
            className={
              editedRows.length > 0 &&
              editedRows[p.rowIdx]?.endTime !==
                workList.contents[p.rowIdx]?.endTime
                ? "editied-cell"
                : ""
            }
          >
            {(p.row.endTime || "").substring(0, 5)}
          </div>
        );
      },
      editable: true,
    },
    {
      key: "pauseMinutes",
      name: "휴게 시간(분)",
      formatter: (p: any) => (
        <div
          className={
            editedRows.length > 0 &&
            editedRows[p.rowIdx]?.pauseMinutes !==
              workList.contents[p.rowIdx]?.pauseMinutes
              ? "editied-cell"
              : ""
          }
        >
          {p.row.pauseMinutes}
        </div>
      ),
      editor: NumberEditor,
      editable: true,
    },
    {
      key: "buttons",
      name: "",
      editable: false,
      formatter: (p: any) => {
        return (
          <div>
            {p.row.workId && (
              <button
                className="delete-btn"
                onClick={() => {
                  let tempRows;
                  if (editedRows.length > 0) {
                    tempRows = [...editedRows];
                  } else if (workList.state === "hasValue") {
                    tempRows = [...workList.contents];
                  }

                  if (tempRows && tempRows.length > 0) {
                    tempRows[+p.rowIdx] = {
                      ...tempRows[+p.rowIdx],
                      startTime: undefined,
                      endTime: undefined,
                      pauseInfo: undefined,
                      pauseMinutes: undefined,
                    };
                    setEditedRows([...tempRows]);
                  }
                }}
              >
                삭제
              </button>
            )}
          </div>
        );
      },
    },
  ];

  const calculator = useMemo(() => {
    if (
      contractDetail.state === "hasValue" &&
      contractScheduleList.state === "hasValue" &&
      workList.state === "hasValue"
    ) {
      const targetList = editedRows.length > 0 ? editedRows : workList.contents;

      let weekTotalWorkMin = 0;
      let satisfied = true;
      let weekInfoList: {
        weekTotalWorkMin: number;
        satisfied: boolean;
      }[] = [];

      targetList.forEach((target, idx) => {
        const scheduleInfo = contractScheduleList.contents.filter((item) => {
          return item.weekday === target.weekday;
        });

        if (target.startTime && target.endTime) {
          weekTotalWorkMin +=
            +target.endTime.substring(0, 2) * 60 +
            +target.endTime.substring(3, 5) -
            +target.startTime.substring(0, 2) * 60 -
            +target.startTime.substring(3, 5) -
            (target.pauseMinutes || 0);

          if (scheduleInfo.length > 0) {
            satisfied =
              target.startTime <= scheduleInfo[0].startTime &&
              target.endTime >= scheduleInfo[0].endTime &&
              satisfied;
          }
        } else {
          if (scheduleInfo.length > 0) {
            satisfied = false;
          }
        }

        if (target.weekday === 0 || idx === targetList.length - 1) {
          weekInfoList.push({
            weekTotalWorkMin,
            satisfied,
          });

          weekTotalWorkMin = 0;
          satisfied = true;
        }
      });

      let totalWageForMonth = 0;
      const totalWageForWeekList = weekInfoList.map((week, idx) => {
        console.log(week, contractDetail.contents.wage);
        const wageForWeek =
          week.weekTotalWorkMin >= 15 * 60 && week.satisfied
            ? (week.weekTotalWorkMin * 1.2 * contractDetail.contents.wage) / 60
            : (week.weekTotalWorkMin * 1 * contractDetail.contents.wage) / 60;
        totalWageForMonth += wageForWeek;

        return {
          weekSeq: idx,
          weekTotalWorkMin: week.weekTotalWorkMin,
          satisfied: week.satisfied,
          totalWage: wageForWeek,
        };
      });

      return {
        totalWageForMonth,
        totalWageForWeekList,
      };
    } else {
      return null;
    }
  }, [contractDetail, contractScheduleList, workList, editedRows]);

  const calculatorView = (
    totalWageForMonth?: number,
    totalWageForWeekList?: {
      weekSeq: number;
      weekTotalWorkMin: number;
      satisfied: boolean;
      totalWage: number;
    }[]
  ) => {
    return (
      <div className="calculator">
        {totalWageForMonth && totalWageForWeekList ? (
          <>
            <span className="total">{`이번 달 알바비 : 총 `}</span>
            <span className="bold">{`${totalWageForMonth.toString()}`}</span>
            <span>{` 원`}</span>
            <button
              className="more-info"
              onClick={() => setShowDetail(!showDetail)}
            >
              ?
            </button>
            <Collapse in={showDetail}>
              <div className="calculator-detail">
                {totalWageForWeekList.map((week, idx) => {
                  return (
                    <div className="detail-item">
                      <div>{`${idx + 1}주차 : 총 근로시간 (${Math.floor(
                        week.weekTotalWorkMin / 60
                      )}시간${
                        week.weekTotalWorkMin % 60
                          ? " " + (week.weekTotalWorkMin % 60) + "분 "
                          : ""
                      }) * 시급(${contractDetail.contents.wage}원)${
                        week.satisfied
                          ? ` + 주휴수당 (${
                              ((week.weekTotalWorkMin / 5) *
                                contractDetail.contents.wage) /
                              60
                            }원)`
                          : ""
                      } = ${week.totalWage}원`}</div>
                      <div></div>
                      <div></div>
                    </div>
                  );
                })}
              </div>
            </Collapse>
          </>
        ) : (
          <span className="total">계산중...</span>
        )}
      </div>
    );
  };

  return (
    <div id="CalculatorPage">
      <div className="data-grid">
        <div className="title">
          <h1 className="highlight">{`${
            contractDetail?.contents?.employee?.employeeName || ""
          }`}</h1>
          <h1>{` 님의 알바비 계산기`}</h1>
        </div>
        <div className="calculator-wrapper">
          {calculatorView(
            calculator?.totalWageForMonth,
            calculator?.totalWageForWeekList
          )}
        </div>
        <button
          className="add-btn"
          disabled={editedRows.length === 0}
          onClick={() => {
            setInfoModal({
              open: true,
              label: `변경사항을 저장하시겠어요?`,
              onConfirm: async () => {
                const request: WorkUpdateRequest[] = [];
                const deleteTargets: number[] = [];
                editedRows.forEach((row) => {
                  if (row.endTime || row.startTime) {
                    request.push({
                      contractId: contractDetail.contents?.contractId,
                      endTime: row.endTime
                        ? row.endTime.substring(0, 5).replace(":", "")
                        : undefined,
                      pauseInfo: {
                        duration: row.pauseMinutes
                          ? `${Math.floor(row.pauseMinutes / 60)
                              .toString()
                              .padStart(2, "0")}${(row.pauseMinutes % 60)
                              .toString()
                              .padStart(2, "0")}`
                          : "0000",
                      },
                      startTime: row.startTime
                        ? row.startTime.substring(0, 5).replace(":", "")
                        : undefined,
                      storeId: contractDetail.contents.store.storeId,
                      weekday: row.weekday,
                      workDate: row.workDate,
                      workId: row.workId,
                    });
                  } else if (!row.endTime && !row.startTime && row.workId) {
                    deleteTargets.push(row.workId);
                  }
                });

                await axios.all([
                  ...deleteTargets.map((target) => {
                    return deleteWork(target);
                  }),
                  updateWorkList(request),
                ]);

                setWorkListQuerySeqState((currVal) => currVal + 1);
                setEditedRows([]);
              },
              onCancel: () => {},
            });
          }}
        >
          변경내용 저장
        </button>
        <button
          className="add-btn"
          disabled={editedRows.length === 0}
          onClick={() => {
            setEditedRows([]);
          }}
        >
          변경내용 초기화
        </button>
        <button
          className="add-btn"
          onClick={() => {
            let changedRowCount = 0;
            const tempRows: WorkDetail[] = [
              ...(editedRows.length === 0 ? workList.contents : editedRows),
            ];

            contractScheduleList.contents.forEach(
              (schedule: ContractSchedule) => {
                const targets: WorkDetail[] = tempRows.filter(
                  (row) => row.weekday === schedule.weekday
                );

                targets.forEach((target) => {
                  const idx = tempRows.findIndex(
                    (item) => item.workDate === target.workDate
                  );
                  if (
                    idx >= 0 &&
                    (!tempRows[idx].startTime || !tempRows[idx].endTime)
                  ) {
                    tempRows[idx] = {
                      ...tempRows[idx],
                      startTime: tempRows[idx].startTime || schedule.startTime,
                      endTime: tempRows[idx].endTime || schedule.endTime,
                    };
                    changedRowCount += 1;
                  }
                });
              }
            );
            if (changedRowCount > 0) setEditedRows(tempRows);
          }}
        >
          스케줄 자동입력
        </button>
        <div className="calculator-wrapper"></div>
        <DataGrid
          columns={columnDef}
          rows={
            editedRows.length === 0 && workList.state === "hasValue"
              ? workList.contents
              : editedRows
          }
          defaultColumnOptions={{
            resizable: true,
          }}
          onRowsChange={(rows: any[], data: any) => {
            setEditedRows([...rows]);
          }}
          className="common-data-grid"
        />
      </div>
    </div>
  );
};
