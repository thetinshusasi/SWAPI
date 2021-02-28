import config from '../config/config';
import axios, { AxiosResponse } from 'axios';
const { server: { thirdPartyBaseUrl = undefined } = {} } = config;

export function get<T>(url: string): Promise<AxiosResponse<any>> {
    if (!thirdPartyBaseUrl) throw new Error('invalid base url');
    return axios.get<T>(thirdPartyBaseUrl + url);
}

exports = {
    get
};
