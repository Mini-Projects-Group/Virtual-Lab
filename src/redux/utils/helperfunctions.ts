import Axios from "axios";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { ApiMethod } from "../index";

export const base_domain = "https://virtual-lab-backend.herokuapp.com";
//export const base_domain = 'http://localhost:5000';

export const axios_config = (
  api: string,
  paramsOrObject: Object | null,
  method: ApiMethod
): AxiosRequestConfig => ({
  method,
  url: base_domain + api,
  [method === "post" ? "data" : "params"]: paramsOrObject,
  headers: {
    "Content-Type": "application/json",
  },
});

export const async_func_data = async (
  api: string,
  paramsOrObject: Object | null,
  method: ApiMethod,
  isTokenRequired = true
): Promise<AxiosResponse<any>> => {
  try {
    if (isTokenRequired) {
      axios.defaults.headers.Authorization = localStorage.getItem("vl-token");
    }
    const axiosConfig = axios_config(api, paramsOrObject, method);

    const response = await Axios(axiosConfig);

    //console.log(response);
    return response;
  } catch (err) {
    //console.log(err.response);
    return err.response;
  }
};
