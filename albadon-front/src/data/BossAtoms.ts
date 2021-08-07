import { atom, selector } from "recoil";
import { getStoreListByMemberId } from "../service/StoreService";
import { Store } from "./Interfaces";

export const bossIdState = atom({
  key: "bossIdState",
  default: "1",
});

export const storeListQuerySeqState = atom({
  key: "storeListQuerySeqState",
  default: 0,
});

export const storeListState = selector({
  key: "storeListState",
  get: async ({ get }) => {
    get(storeListQuerySeqState);
    const bossId = get(bossIdState);
    if (bossId) {
      const res = await getStoreListByMemberId(bossId);
      return res.data as Store[];
    } else {
      return [];
    }
  },
});
