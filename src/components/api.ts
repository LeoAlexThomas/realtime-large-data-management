import { getApiUrl } from "@/env";
import axios from "axios";
import { parseCookies } from "nookies";

export const authTokenCookiesName = "authToken";

export const getAccessToken = (option: any) => {
  const cookies = parseCookies(option && option.context);
  const token = cookies[authTokenCookiesName];
  return token;
};

const api = (url: string, config?: any, baseurl?: string) => {
  const apiRequestOptions = Object.assign({}, config);
  const apiBaseurl = baseurl ?? getApiUrl();

  axios.interceptors.request.use((request: any) => {
    const token = getAccessToken(config);
    if (token && !request.headers["Authorization"]) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
    return request;
  });

  return axios({
    url: apiBaseurl + url,
    ...apiRequestOptions,
    transformRequest: (res: any, requestHeader: Record<string, any>) => {
      if (!Boolean(res)) {
        return null;
      }
      if (requestHeader["content-type"].startWith("application/json")) {
        return JSON.parse(res);
      }
      return res;
    },
  }).then((res: any) => {
    return res.data;
  });
};

export default api;
