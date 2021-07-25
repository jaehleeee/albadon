import axios from "axios";

export enum ApiMethod {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
}
export const callAPI = async (
  method: ApiMethod,
  url: string,
  params?: object,
  data?: object
) => {
  return await axios.request({
    method: method,
    url: `${process.env.REACT_APP_API_URL}/${url}`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    params: params,
    data: data,
  });
};
