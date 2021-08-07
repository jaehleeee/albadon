import moment from "moment";
import { atom, selector } from "recoil";
import { WorkListGetRequest } from "../service/Interfaces";
import { getWorkList } from "../service/WorkService";
import { contractDetailState } from "./ContractAtoms";
import { WorkDetail } from "./Interfaces";

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

    if (contract?.contractId) {
      const request: WorkListGetRequest = {
        contractId: contract.contractId,
        month,
        year,
      };

      const target = moment(`${year}${month}`, "YYYYMM");

      const workList: WorkDetail[] = [];

      for (let i = 0; i < target.daysInMonth(); i++) {
        const targetMoment = target.startOf("month").add(i, "day");
        workList.push({
          weekday: targetMoment.day(),
          workDate: targetMoment.format("YYYY-MM-DD"),
        });
      }

      const res = await getWorkList(request);

      (res.data as WorkDetail[]).forEach((work) => {
        const idx = workList.findIndex(
          (item) => item.workDate === work.workDate
        );
        if (idx >= 0) {
          let pauseMinutes = 0;
          if (work.pauseInfo?.duration) {
            pauseMinutes =
              +work.pauseInfo?.duration.substring(0, 2) * 60 +
              +work.pauseInfo?.duration.substring(2, 4);
          }

          workList[idx] = {
            ...work,
            pauseMinutes,
          };
        }
      });

      return workList;
    } else {
      return [] as WorkDetail[];
    }
  },
});
