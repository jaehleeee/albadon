import { ApiMethod, callAPI } from "./CommonService";

export const getStoreListByMemberId = async (memberId: string) => {
  return await callAPI(ApiMethod.GET, `boss/${memberId}/stores`);
};
