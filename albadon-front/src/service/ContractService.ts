import { ApiMethod, callAPI } from "./CommonService";
import { ContractDetailRequest } from "./Interfaces";

export const getContractDetailList = async (contractId: number) => {
  return await callAPI(ApiMethod.GET, `contract/${contractId}/contractDetails`);
};

export const getContractDetail = async (contractDetailId: number) => {
  return await callAPI(ApiMethod.GET, `contract/detail/${contractDetailId}`);
};

export const createContractDetail = async (request: ContractDetailRequest) => {
  return await callAPI(ApiMethod.POST, `contract/detail`, undefined, request);
};

export const updateContractDetail = async (
  contractDetailId: number,
  request: ContractDetailRequest
) => {
  return await callAPI(
    ApiMethod.PUT,
    `contract/detail/${contractDetailId}`,
    undefined,
    request
  );
};

export const deleteContractDetail = async (contractDetailId: number) => {
  return await callAPI(ApiMethod.DELETE, `contract/detail/${contractDetailId}`);
};
