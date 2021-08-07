import { ApiMethod, callAPI } from "./CommonService";
import { WorkListGetRequest, WorkUpdateRequest } from "./Interfaces";

export const getWorkList = async (request: WorkListGetRequest) => {
  return await callAPI(
    ApiMethod.GET,
    `contract/${request.contractId}/work`,
    request
  );
};

export const updateWorkList = async (request: WorkUpdateRequest[]) => {
  return await callAPI(ApiMethod.POST, `work/list`, undefined, request);
};

export const deleteWork = async (workId: number) => {
  return await callAPI(ApiMethod.DELETE, `work/${workId}`);
};
