import { ApiMethod, callAPI } from "./CommonService";

export const getEmployeeListByStoreId = async (storeId: number) => {
  return await callAPI(ApiMethod.GET, `store/${storeId}/employees`);
};
