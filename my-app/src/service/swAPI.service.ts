import { AxiosRequestConfig } from "axios";
import service from "./baseService";
const restPath = "people/";
export const getAllNames = (search?: string): Promise<any> => {
  let config: AxiosRequestConfig =
    (search && {
      params: {
        search,
      },
    }) ||
    {};
  return service.get(`${restPath}names`, config);
};
export const getById = (id: string): Promise<any> => {
  return service.get(`${restPath}/${id}`);
};
export const getAll = (search?: string): Promise<any> => {
  let config: AxiosRequestConfig =
    (search && {
      params: {
        search,
      },
    }) ||
    {};
  return service.get(`${restPath}`, config);
};
