import { atom } from "recoil";

export const currentMemberId = atom({
  key: "currentMemberId",
  default: "1",
});

export const currentStoreId = atom({
  key: "currentStoreId",
  default: -1,
});
