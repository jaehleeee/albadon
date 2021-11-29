import { atom, selector } from "recoil";
import { selectBoss } from "../service/BossService";
import { getStoreListByMemberId } from "../service/StoreService";
import { Boss, Store, MinWage } from "./Interfaces";
import { getCommonValue } from "../service/CommonService";

export const bossIdState = atom({
  key: "bossIdState",
  default: "1",
});

export const bossState = selector({
  key: "bossState",
  get: async ({ get }) => {
    const bossId = get(bossIdState);
    if (bossId) {
      const res = await selectBoss(bossId);
      return res.data as Boss;
    } else {
      return {} as Boss;
    }
  },
});

export const storeListQuerySeqState = atom({
  key: "storeListQuerySeqState",
  default: 0,
});

export const storeListState = selector({
  key: "storeListState",
  get: async ({ get }) => {
    get(storeListQuerySeqState);
    const boss = get(bossState);
    if (boss && boss.bossId) {
      const res = await getStoreListByMemberId(`${boss.bossId}`);
      return res.data as Store[];
    } else {
      return [];
    }
  },
});

export const minWageState = selector({
  key: "minWageState",
  get: async ({ get }) => {
    const bossId = get(bossIdState);
    if (bossId) {
      const res = await getCommonValue("minimum_hourly_wage");
      return res.data as MinWage;
    } else {
      return {} as MinWage;
    }
  },
});
