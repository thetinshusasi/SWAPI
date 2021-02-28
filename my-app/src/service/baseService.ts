import axios, { AxiosRequestConfig } from "axios";
const baseUrl = "http://localhost:1337/api/";
const get = (url: string, config?: AxiosRequestConfig) => {
  return axios.get(baseUrl + url, config).then((res) => res.data);
};

const post = (url: string, data: any) => {
  return axios.post(baseUrl + url, data).then((res) => res.data);
};
const del = (url: string) => {
  return axios.delete(baseUrl + url).then((res) => res.data);
};
const put = (url: string, data: any) => {
  return axios.put(baseUrl + url, data).then((res) => res.data);
};
const service = {
  get,
  post,
  put,
  del,
};

export default service;
