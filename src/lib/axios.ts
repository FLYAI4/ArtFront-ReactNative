import axios from "axios";
import Config from "react-native-config";
import * as qs from 'qs'

export const $axios = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 15000,
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "repeat" });
  },
  withCredentials: true,
});