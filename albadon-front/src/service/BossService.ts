import { ApiMethod, callAPI } from "./CommonService";

export const selectBoss = async (bossId: string) => {
  return await callAPI(ApiMethod.GET, `boss/${bossId}`);
};
