import moment from "moment";
import { atom, selector } from "recoil";
import { WorkListGetRequest } from "../service/Interfaces";
import { getWorkList } from "../service/WorkService";
import { contractDetailState } from "./ContractAtoms";
import { WorkDetail, WorkDetailItem } from "./Interfaces";

export const targetYearState = atom({
  key: "targetYearState",
  default: +moment().format("YYYY"),
});

export const targetMonthState = atom({
  key: "targetMonthState",
  default: +moment().format("MM"),
});

export const workListQuerySeqState = atom({
  key: "workListQuerySeqState",
  default: 0,
});

export const workListState = selector({
  key: "workListState",
  get: async ({ get }) => {
    get(workListQuerySeqState);
    const contract = get(contractDetailState);
    const year = get(targetYearState);
    const month = get(targetMonthState);
    const workList: WorkDetail = { monthWork: [], prevMonthLastWeekWork: [] };

    if (contract?.contractId) {
      const request: WorkListGetRequest = {
        contractId: contract.contractId,
        month,
        year,
      };

      const target = moment(`${year}${month}`, "YYYYMM");

      for (let i = 0; i < target.daysInMonth(); i++) {
        const targetMoment = target.startOf("month").clone();
        targetMoment.add(i, "day");
        console.log(target.week(), targetMoment.week());

        workList.monthWork.push({
          weekday: targetMoment.day(),
          workDate: targetMoment.format("YYYY-MM-DD"),
          weekNumber: targetMoment.week() - target.week() + 1,
        });
      }

      const res = await getWorkList(request);
      workList.prevMonthLastWeekWork = res.data
        .prevMonthLastWeekWork as WorkDetailItem[];
      (res.data.monthWork as WorkDetailItem[]).forEach((work) => {
        const idx = workList.monthWork.findIndex(
          (item) => item.workDate === work.workDate
        );
        if (idx >= 0) {
          let pauseMinutes = 0;
          if (work.pauseInfo?.duration) {
            pauseMinutes =
              +work.pauseInfo?.duration.substring(0, 2) * 60 +
              +work.pauseInfo?.duration.substring(3, 5);
          }

          workList.monthWork[idx] = {
            ...work,
            weekNumber: workList.monthWork[idx].weekNumber,
            pauseMinutes,
          };
        }
      });
    }

    return workList;
  },
});
