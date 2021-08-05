import { atom, selector } from "recoil";
import { getEmployeeListByStoreId } from "../service/EmployeeService";
import { Employee, Store } from "./Interfaces";

export const storeDetailState = atom({
  key: "storeDetailState",
  default: {} as Store,
});

export const employeeListQuerySeqState = atom({
  key: "employeeListQuerySeqState",
  default: 0,
});

export const employeeListState = selector({
  key: "employeeListState",
  get: async ({ get }) => {
    const store = get(storeDetailState);
    const res = await getEmployeeListByStoreId(store.storeId);
    return res.data as Employee[];
  },
});
