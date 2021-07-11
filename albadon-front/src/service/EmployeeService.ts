import { ApiMethod, callAPI } from "./CommonService";

export const getEmployeeListByStoreId = async (storeId: string) => {
  return await callAPI(ApiMethod.GET, `store/${storeId}/employees`);
};

