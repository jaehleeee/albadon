import { selector } from "recoil";
import { currentStoreId } from "./Atom";
import { Store } from "./Interface";

export const currentStore = selector<Store>({
  key: "currentStore",
  get: ({ get }) => {
    const id = get(currentStoreId);
    // call API
    return { storeId: id, storeName: `${id} 스토어` };
  },
});
