import { atom } from "recoil";

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
    open: false,
    label: "",
    type: "",
  },
});
