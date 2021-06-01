import { ApiMethod, callAPI } from "./CommonService";

export const getHealthCheck = async () => {
  return await callAPI(ApiMethod.GET, "health/project");
};
