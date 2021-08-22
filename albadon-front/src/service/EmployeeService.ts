import { ApiMethod, callAPI } from "./CommonService";
import { EmployeeUpsertRequest } from "./Interfaces";

export const getEmployeeListByStoreId = async (storeId: number) => {
  return await callAPI(ApiMethod.GET, `store/${storeId}/employees`);
};

export const createEmployee = async (request: EmployeeUpsertRequest) => {
  return await callAPI(ApiMethod.POST, `contract`, undefined, request);
};

export const getContract = async (contractId: number) => {
  return await callAPI(ApiMethod.GET, `contract/${contractId}`);
};
export const getEmployee = async (contractId: number) => {
  return await callAPI(ApiMethod.GET, `contract/${contractId}`);
};

export const modifyEmployee = async (
  contractId: number,
  request: EmployeeUpsertRequest
) => {
  return await callAPI(ApiMethod.PUT, `contract/${contractId}`, undefined, {
    request,
  });
};

export const deleteEmployee = async (contractId: number) => {
  return await callAPI(ApiMethod.DELETE, `contract/${contractId}`);
};
