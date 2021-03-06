import React, { useEffect, useMemo, useState } from "react";
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import DataGrid from "react-data-grid";
import { NumberEditor, TimeEditor } from "../component/datagrid/DataEditors";
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
import {
  ContractDetail,
  ContractSchedule,
  Employee,
  WorkDetail,
  WorkDetailItem,
} from "../data/Interfaces";
import { deleteWork, updateWorkList } from "../service/WorkService";
import { WorkUpdateRequest } from "../service/Interfaces";
import { infoModalState } from "../data/Atoms";
import axios from "axios";
import moment from "moment";
import { Collapse, FormControlLabel, Switch } from "@material-ui/core";

import { useAPICall } from "../hook/useAPICall";
import { employeeListState } from "../data/StoreAtoms";
import { Link, RouteComponentProps } from "react-router-dom";
import { Sidebar } from "../layout/Sidebar";

export interface CalculatorPageI {
  match: any;
}

export const CalculatorPage: React.FC<RouteComponentProps> = (
  routeProps: RouteComponentProps
) => {
  const [targetYear, setTargetYear] = useRecoilState(targetYearState);
  const [targetMonth, setTargetMonth] = useRecoilState(targetMonthState);
  const [additionalFee, setAdditionalFee] = useState<boolean>(true);

  const workList = useAPICall<WorkDetail>(
    useRecoilValueLoadable(workListState)
  );
  const contractDetail = useAPICall<ContractDetail>(
    useRecoilValueLoadable(contractDetailState)
  );
  const contractScheduleList = useAPICall<ContractSchedule[]>(
    useRecoilValueLoadable(contractScheduleListState)
  );
  const employeeList = useAPICall<Employee[]>(
    useRecoilValueLoadable(employeeListState)
  );
  const [contractSummary, setContractSummary] =
    useRecoilState(contractSummaryState);
  const setWorkListQuerySeqState = useSetRecoilState(workListQuerySeqState);

  const setInfoModal = useSetRecoilState(infoModalState);

  const [editedRows, setEditedRows] = useState<WorkDetailItem[]>([]);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const dayList = ["???", "???", "???", "???", "???", "???", "???"];

  const startWeekday = moment(
    `${targetYear}${targetMonth}`,
    "YYYYMM"
  ).weekday();

  useEffect(() => {
    if ((routeProps.match.params as any).contractId) {
      setContractSummary({
        contractId: (routeProps.match.params as any).contractId,
      });
    } else if (!!!contractSummary.contractId) {
      if (
        employeeList.state === "hasValue" &&
        employeeList.contents.length > 0
      ) {
        setContractSummary({
          contractId: employeeList.contents[0].contractId,
        });
      }
    }
  }, [routeProps, employeeList.state]);

  const columnDef = [
    {
      key: "workId",
      name: "workId",
      maxWidth: 0,
    },
    {
      key: "workDate",
      name: "??????",
      editable: false,
      formatter: (p: any) => {
        return (
          <div>
            <span
              className={`workDate weekday-${p.row.weekday}`}
            >{`${p.row.workDate}`}</span>
          </div>
        );
      },
    },
    {
      key: "weekNumber",
      name: "weekNumber",
      maxWidth: 0,
    },
    {
      key: "weekday",
      name: "??????",
      editable: false,
      formatter: (p: any) => {
        return (
          <div className={`weekday-${p.row.weekday}`}>{`${
            dayList[+p.row.weekday]
          }??????`}</div>
        );
      },
    },
    {
      key: "startTime",
      name: "?????? ??????",
      editor: TimeEditor("00:00"),
      formatter: (p: any) => {
        return (
          <div
            className={
              editedRows &&
              editedRows.length > 0 &&
              editedRows[p.rowIdx]?.startTime !==
                workList.contents.monthWork[p.rowIdx]?.startTime
                ? `editied-cell`
                : ``
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
      name: "?????? ??????",
      editor: TimeEditor("00:00"),
      formatter: (p: any) => {
        return (
          <div
            className={
              editedRows &&
              editedRows.length > 0 &&
              editedRows[p.rowIdx]?.endTime !==
                workList.contents.monthWork[p.rowIdx]?.endTime
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
      name: "?????? ??????(???)",
      formatter: (p: any) => (
        <div
          className={
            editedRows &&
            editedRows.length > 0 &&
            editedRows[p.rowIdx]?.pauseMinutes !==
              workList.contents.monthWork[p.rowIdx]?.pauseMinutes
              ? "editied-cell"
              : ""
          }
        >
          {p.row.pauseMinutes}
        </div>
      ),
      editor: NumberEditor(),
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
                    tempRows = [...workList.contents.monthWork];
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
                ??????
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
      const workHistory =
        editedRows.length > 0 ? editedRows : workList.contents.monthWork;

      let weekWages: {
        workMinutes: number;
        bonusWorkMinute: number;
      }[] = [];

      let workMinutes = 0;
      let fullWorked = true;
      let bonusWorkMinute = 0;

      workHistory.forEach((target, idx) => {
        const scheduleInfo = contractScheduleList.contents.filter((item) => {
          return item.weekday === target.weekday;
        });

        //????????? ?????? ?????? ??????
        if (target.startTime && target.endTime) {
          workMinutes +=
            +target.endTime.substring(0, 2) * 60 +
            +target.endTime.substring(3, 5) -
            +target.startTime.substring(0, 2) * 60 -
            +target.startTime.substring(3, 5) -
            (target.pauseMinutes || 0);

          if (scheduleInfo.length > 0) {
            fullWorked =
              target.startTime <= scheduleInfo[0].startTime &&
              target.endTime >= scheduleInfo[0].endTime &&
              fullWorked;
          }
        } else {
          if (scheduleInfo.length > 0) {
            fullWorked = false;
          }
        }

        //?????? && 15?????? ?????? ?????? ????????? ???????????? ?????? ??????
        //???, 40?????? ?????? ?????? ????????? 40?????? ????????? ???????????? ?????? ??????
        if (additionalFee && fullWorked && workMinutes >= 15 * 60) {
          bonusWorkMinute = Math.min(8 * 60, workMinutes / 5);
        }

        if (target.weekday === 0) {
          weekWages.push({
            workMinutes,
            bonusWorkMinute,
          });
          workMinutes = 0;
          bonusWorkMinute = 0;
          fullWorked = true;
        } else if (idx === workHistory.length - 1) {
          weekWages.push({
            workMinutes,
            bonusWorkMinute: 0,
          });
        }
      });

      return {
        totalWageForWeekList: weekWages,
      };
    } else {
      return null;
    }
  }, [
    contractDetail,
    contractScheduleList,
    workList,
    editedRows,
    additionalFee,
  ]);

  const calculatorView = (
    weekWorkHistory?: {
      workMinutes: number;
      bonusWorkMinute: number;
    }[]
  ) => {
    let monthWorkMinutes = 0;

    weekWorkHistory?.forEach((week) => {
      monthWorkMinutes += week.workMinutes + week.bonusWorkMinute;
    });

    const monthWage = (contractDetail.contents.wage / 60) * monthWorkMinutes;

    return (
      <div className="calculator">
        {weekWorkHistory && weekWorkHistory.length > 0 ? (
          <>
            <span className="total">{`?????? ??? ????????? : `}</span>
            <span className="bold">{`${monthWage.toLocaleString()}`}</span>
            <span>{` ???`}</span>
            <button
              className="more-info"
              onClick={() => setShowDetail(!showDetail)}
            >
              ?
            </button>
            <Collapse in={showDetail}>
              <FormControlLabel
                control={
                  <Switch
                    checked={additionalFee}
                    color="primary"
                    onChange={(e) => {
                      setAdditionalFee(e.target.checked);
                    }}
                  />
                }
                label="???????????? ON/OFF"
              />
              <div className="calculator-detail">
                {weekWorkHistory.map((week, idx) => {
                  return (
                    <div className="detail-item">
                      <div>{`${idx + 1}?????? : ??? ???????????? (${Math.floor(
                        week.workMinutes / 60
                      )}??????${
                        week.workMinutes % 60
                          ? " " + (week.workMinutes % 60) + "???"
                          : ""
                      }) * ??????(${contractDetail.contents.wage.toLocaleString()}???)${
                        week.bonusWorkMinute
                          ? ` + ???????????? (${(
                              (week.bonusWorkMinute *
                                contractDetail.contents.wage) /
                              60
                            ).toLocaleString()}???)`
                          : ""
                      } = ${(
                        ((week.workMinutes + week.bonusWorkMinute) *
                          contractDetail.contents.wage) /
                        60
                      ).toLocaleString()}???`}</div>
                      <div></div>
                      <div></div>
                    </div>
                  );
                })}
              </div>
            </Collapse>
          </>
        ) : (
          <span className="total">
            {weekWorkHistory && weekWorkHistory.length === 0
              ? "?????? ??? ?????? ????????? ?????????"
              : "?????????..."}
          </span>
        )}
      </div>
    );
  };

  return (
    <>
      <Sidebar {...routeProps} />
      <div id="CalculatorPage">
        {employeeList.state === "hasValue" &&
        employeeList.contents.length === 0 ? (
          <>
            <div className="no-employee">
              <div className="info-icon">
                ?????? ????????? ????????? ?????????. ????????? ????????? ??????????????????!
              </div>
              <Link className="add-btn" to="/employee">
                ?????? ?????? ????????????
              </Link>
            </div>
          </>
        ) : (
          <div className="data-grid">
            <div className="title">
              <h1 className="highlight">{`${
                contractDetail?.contents?.employee?.employeeName || ""
              }`}</h1>
              <h1>{` ?????? ????????? ?????????`}</h1>
              <select
                onChange={(e) => setTargetYear(+e.target.value)}
                value={targetYear}
              >
                {[2020, 2021].map((year: number) => {
                  return (
                    <option key={year} value={year}>
                      {`${year}???`}
                    </option>
                  );
                })}
              </select>
              <select
                onChange={(e) => setTargetMonth(+e.target.value)}
                value={targetMonth}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                  (month: number) => {
                    return (
                      <option key={month} value={month}>
                        {`${month}???`}
                      </option>
                    );
                  }
                )}
              </select>
            </div>
            <div className="calculator-wrapper">
              {calculatorView(calculator?.totalWageForWeekList)}
            </div>
            <button
              className="add-btn"
              disabled={editedRows.length === 0}
              onClick={() => {
                setInfoModal({
                  open: true,
                  label: `??????????????? ??????????????????????`,
                  onConfirm: async () => {
                    const request: WorkUpdateRequest[] = [];
                    const deleteTargets: number[] = [];
                    editedRows.forEach((row) => {
                      if (row.endTime || row.startTime) {
                        request.push({
                          contractId: contractDetail.contents?.contractId,
                          endTime: row.endTime
                            ? row.endTime.substring(0, 5)
                            : undefined,
                          pauseInfo: {
                            duration: row.pauseMinutes
                              ? `${Math.floor(row.pauseMinutes / 60)
                                  .toString()
                                  .padStart(2, "0")}:${(row.pauseMinutes % 60)
                                  .toString()
                                  .padStart(2, "0")}`
                              : "00:00",
                          },
                          startTime: row.startTime
                            ? row.startTime.substring(0, 5)
                            : undefined,
                          storeId: contractDetail.contents.store.storeId,
                          weekday: row.weekday,
                          workDate: row.workDate,
                          workId: row.workId,
                          weekNumber: row.weekNumber,
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
              ???????????? ??????
            </button>
            <button
              className="add-btn"
              disabled={editedRows.length === 0}
              onClick={() => {
                setEditedRows([]);
              }}
            >
              ???????????? ?????????
            </button>
            <button
              className="add-btn"
              onClick={() => {
                let changedRowCount = 0;
                const tempRows: WorkDetailItem[] = [
                  ...(editedRows.length === 0
                    ? workList.contents.monthWork
                    : editedRows),
                ];

                contractScheduleList.contents.forEach(
                  (schedule: ContractSchedule) => {
                    const targets: WorkDetailItem[] = tempRows.filter(
                      (row) =>
                        row.weekday === schedule.weekday &&
                        row.workDate >= contractDetail.contents.startDate &&
                        (!contractDetail.contents.endDate ||
                          row.workDate <= contractDetail.contents.endDate)
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
                          startTime:
                            tempRows[idx].startTime || schedule.startTime,
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
              ????????? ????????????
            </button>
            <div className="calculator-wrapper"></div>
            <DataGrid
              columns={columnDef}
              rows={
                editedRows.length === 0 && workList.state === "hasValue"
                  ? workList.contents.monthWork
                  : editedRows
              }
              defaultColumnOptions={{
                resizable: true,
              }}
              onRowsChange={(rows: any[], data: any) => {
                setEditedRows([...rows]);
              }}
              className={`common-data-grid start-weekday-${
                startWeekday === 0 ? 7 : startWeekday
              }`}
            />
          </div>
        )}{" "}
      </div>
    </>
  );
};
