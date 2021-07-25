import { ApiMethod, callAPI } from "./CommonService";
import { EmployeeCreateRequest } from "./Interfaces";

export const getEmployeeListByStoreId = async (storeId: number) => {
  return await callAPI(ApiMethod.GET, `store/${storeId}/employees`);
};

export const createEmployee = async (request: EmployeeCreateRequest) => {
  return await callAPI(ApiMethod.POST, `contract`, undefined, request);
};
