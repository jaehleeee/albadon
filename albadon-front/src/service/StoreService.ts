import { ApiMethod, callAPI } from "./CommonService";
import { StoreInsertRequest } from "./Interfaces";

export const getStoreListByMemberId = async (memberId: string) => {
  return await callAPI(ApiMethod.GET, `boss/${memberId}/stores`);
};

export const createStore = async (request: StoreInsertRequest) => {
  return await callAPI(ApiMethod.POST, `store`, undefined, request);
};

export const updateStore = async (
  storeId: number,
  request: StoreInsertRequest
) => {
  return await callAPI(ApiMethod.PUT, `store/${storeId}`, undefined, request);
};

export const deleteStore = async (storeId: number) => {
  return await callAPI(ApiMethod.DELETE, `store/${storeId}`);
};
