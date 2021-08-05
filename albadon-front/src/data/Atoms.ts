import { atom } from "recoil";
import { Employee, Store } from "./Interfaces";

// export const currentMemberId = atom({
//   key: "currentMemberId",
//   default: "1",
// });

// export const currentStore = atom({
//   key: "currentStore",
//   default: {} as Store,
// });

// export const employeeListState = atom({
//   key: "employeeListState",
//   default: [] as Employee[],
// });

// export const storeListState = atom({
//   key: "storeListState",
//   default: [] as Store[],
// });

export const infoModalState = atom({
  key: "infoModalState",
  default: {
    open: false,
    label: "",
    onConfirm: () => {},
    onCancel: () => {},
  },
});

export const infoBarState = atom({
  key: "infoBarState",
  default: {
    open: true,
    label: "ddd",
    type: "info",
  },
});
