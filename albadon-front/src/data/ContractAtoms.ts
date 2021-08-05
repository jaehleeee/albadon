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
  default: {} as ContractSummary,
});

export const contractDetailState = selector({
  key: "contractDetailState",
  get: async ({ get }) => {
    const contract = get(contractSummaryState);
    const res = await getContract(contract.contractId);
    return res.data as ContractDetail;
  },
});

export const contractScheduleListQuerySeqState = atom({
  key: "contractScheduleListQuerySeqState",
  default: 0,
});

export const contractScheduleListState = selector({
  key: "contractScheduleListState",
  get: async ({ get }) => {
    const contract = get(contractSummaryState);
    const res = await getContractDetailList(contract.contractId);
    return res.data as ContractSchedule[];
  },
});
