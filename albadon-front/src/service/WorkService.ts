import { ApiMethod, callAPI } from "./CommonService";
import { WorkListGetRequest } from "./Interfaces";

export const getWorkList = async (request: WorkListGetRequest) => {
  return await callAPI(
    ApiMethod.GET,
    `contract/${request.contractId}/work`,
    request
  );
};
