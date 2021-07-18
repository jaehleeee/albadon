import { selector } from "recoil";
import { getEmployeeListByStoreId } from "../service/EmployeeService";
import { getStoreListByMemberId } from "../service/StoreService";
import { currentMemberId, currentStoreId } from "./Atoms";
import { Employee, Store } from "./Interfaces";

export const storeListState = selector({
  key: "storeListState",
  get: async ({ get }) => {
    const memberId = get(currentMemberId);
    const response = await getStoreListByMemberId(memberId);
    if (response.status !== 200) {
      throw new Error("storeListState fetch failed");
    }
    return response.data as Store[];
  },
});

export const employeeListState = selector({
  key: "employeeListState",
  get: async ({ get }) => {
    const storeId = get(currentStoreId);
    if (storeId) {
      const response = await getEmployeeListByStoreId(storeId);
      if (response.status !== 200) {
        throw new Error("storeListState fetch failed");
      }
      return response.data as Employee[];
    } else {
      return [] as Employee[];
    }
  },
});
