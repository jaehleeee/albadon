import { atom, selector } from "recoil";
import { getContractDetailList } from "../service/ContractService";
import { getContract } from "../service/EmployeeService";
import {
  ContractDetail,
  ContractSchedule,
  ContractSummary,
} from "./Interfaces";

export const contractSummaryState = atom({
  key: "contractSummaryState",
  default: {} as Partial<ContractSummary>,
});

export const contractDetailState = selector({
  key: "contractDetailState",
  get: async ({ get }) => {
    const contract = get(contractSummaryState);
    if (contract?.contractId) {
      const res = await getContract(contract.contractId);
      return res.data as ContractDetail;
    } else {
      return {} as ContractDetail;
    }
  },
});

export const contractScheduleListQuerySeqState = atom({
  key: "contractScheduleListQuerySeqState",
  default: 0,
});

export const contractScheduleListState = selector({
  key: "contractScheduleListState",
  get: async ({ get }) => {
    get(contractScheduleListQuerySeqState);
    const contract = get(contractSummaryState);
    if (contract?.contractId) {
      const res = await getContractDetailList(contract.contractId);
      return res.data as ContractSchedule[];
    } else {
      return [] as ContractSchedule[];
    }
  },
});
