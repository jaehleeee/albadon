import { atom } from "recoil";

export const currentStoreId = atom({
  key: "currentStoreId",
  default: 0,
});
