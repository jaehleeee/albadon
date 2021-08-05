import moment from "moment";
import { atom, selector } from "recoil";
import { WorkListGetRequest } from "../service/Interfaces";
import { getWorkList } from "../service/WorkService";
import { contractDetailState } from "./ContractAtoms";

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
    const request: WorkListGetRequest = {
      contractId: contract.contractId,
      month,
      year,
    };

    const target = moment(`${year}${month}`, "YYYYMM");

    const emptyWorkList: any[] = [];

    const DAY_LIST = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];

    for (let i = 0; i < target.daysInMonth(); i++) {
      const targetMoment = target.startOf("month").add(i, "day");
      emptyWorkList.push({
        workDate: targetMoment.format("YYYY년 MM월 DD일"),
        weekday: DAY_LIST[targetMoment.day()],
        startTime: "",
        endTime: "",
        pauseInfo: "",
      });
    }

    const res = await getWorkList(request);
    return res.data;
  },
});
