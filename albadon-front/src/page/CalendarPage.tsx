import moment from "moment";
import React, { useEffect, useState } from "react";

import { range } from "../util";
import "./CalendarPage.scss";

export interface Settings {
  startDate: number;
  dayCount: number;
  weekCount: number;
}

export interface Employee {
  employeeId: number;
  employeeName: string;
}

export interface DaySchedule {
  employeeList: Employee[];
}

export const DATE_LIST = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
export const CalendarPage: React.FC = () => {
  const getSettings = (YYYYMM: string) => {
    const dayCount = moment(YYYYMM, "YYYYMM").daysInMonth();
    const startDate = moment(YYYYMM, "YYYYMM").date(1).day();

    return {
      startDate: startDate,
      dayCount: dayCount,
      weekCount: (startDate + dayCount) / 7,
    };
  };

  const getDayComponent = (week: number, day: number, settings: Settings) => {
    const val = week * 7 + day - settings.startDate + 1;
    if (val > 0 && val <= settings.dayCount) {
      return (
        <div className="day-number">
          {val}
          <div className="circle" />
        </div>
      );
    } else {
      return null;
    }
  };

  const getEmployeeComponent = (
    week: number,
    day: number,
    settings: Settings
  ) => {
    const val = week * 7 + day - settings.startDate;
    if (val > 0 && val <= settings.dayCount) {
      return (
        <div className="employee-wrapper">
          {dayScheduleList[val - 1]?.employeeList.map((employee) => {
            return (
              <div className="employee-badge">{employee.employeeName}</div>
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  };

  const handleNextMonthBtnClick = () => {
    setSelectedYYYYMM(
      moment(selectedYYYYMM, "YYYYMM").add(1, "months").format("YYYYMM")
    );
  };

  const handlePrevMonthBtnClick = () => {
    setSelectedYYYYMM(
      moment(selectedYYYYMM, "YYYYMM").add(-1, "months").format("YYYYMM")
    );
  };
  const [selectedYYYYMM, setSelectedYYYYMM] = useState<string>(
    moment().format("YYYYMM")
  );
  const [settings, setSettings] = useState<Settings>(
    getSettings(moment().format("YYYYMM"))
  );

  const [dayScheduleList, setDayScheduleList] = useState<DaySchedule[]>([]);

  useEffect(() => {
    //fetch schedule
    setSettings(getSettings(selectedYYYYMM));

    setDayScheduleList([
      { employeeList: [] },
      {
        employeeList: [
          {
            employeeId: 1,
            employeeName: "태식",
          },
        ],
      },
      {
        employeeList: [
          {
            employeeId: 1,
            employeeName: "태식",
          },
        ],
      },
      { employeeList: [] },

      { employeeList: [] },
      { employeeList: [] },
      { employeeList: [] },
      { employeeList: [] },
      { employeeList: [] },
      { employeeList: [] },
      { employeeList: [] },
      { employeeList: [] },
      { employeeList: [] },
      { employeeList: [] },
      { employeeList: [] },
      { employeeList: [] },
      {
        employeeList: [
          {
            employeeId: 1,
            employeeName: "태식이이이이이이이이이이이이이이이이이이이이",
          },
          {
            employeeId: 2,
            employeeName: "가영일이삼",
          },
        ],
      },
      { employeeList: [] },
      { employeeList: [] },
      { employeeList: [] },
      { employeeList: [] },
      { employeeList: [] },
      { employeeList: [] },
      { employeeList: [] },
      { employeeList: [] },
      { employeeList: [] },
      { employeeList: [] },
      { employeeList: [] },
      { employeeList: [] },
      { employeeList: [] },
    ]);
  }, [selectedYYYYMM]);

  return (
    <div id="CalendarPage">
      <div className="yyyymm">
        <label className="month-btn prev" onClick={handlePrevMonthBtnClick}>
          ◀︎
        </label>
        <label className="yyyymm-lbl"> {selectedYYYYMM}</label>
        <label className="month-btn next" onClick={handleNextMonthBtnClick}>
          ▶︎
        </label>
      </div>

      <div className="week-header">
        {DATE_LIST.map((date) => {
          return (
            <div key={`${date}`} className="date">
              {date}
            </div>
          );
        })}
      </div>
      <div className="week-wrapper">
        {range(settings.weekCount).map((week) => {
          return (
            <div key={`${week}th-week`} className="week">
              {range(7).map((day) => {
                return (
                  <div key={`${day}th-day`} className="day">
                    {getDayComponent(week, day, settings)}
                    {getEmployeeComponent(week, day, settings)}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
