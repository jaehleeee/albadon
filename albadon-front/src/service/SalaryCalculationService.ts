import { ApiMethod, callAPI } from "./CommonService";

export const getEmpMonthWorkInfo = async () => {
  return await callAPI(ApiMethod.GET, "work/temp");
};
