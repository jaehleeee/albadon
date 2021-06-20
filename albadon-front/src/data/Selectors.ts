import { selector } from "recoil";
import { currentStoreId } from "./Atoms";

export const currentStoreState = selector({
    key : 'currentStoreIdState',
    get: ({get} )=>{
        const storeId = get(currentStoreId);
        return {storeName: "storeId"}
    }

})