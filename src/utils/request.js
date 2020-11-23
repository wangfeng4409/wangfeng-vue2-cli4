import axios from "axios";
import store from "@/store";
import { getToken } from "@/utils/auth";

// create an axios instance
const service = axios.create({
  baseURL: "",
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers["Content-Type"] = "application/json";
    // config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    if (store.getters.token) {
      config.headers["Authorization"] = "Bearer " + getToken();
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    return res;
  },
  error => {
    if (error.response.status === 401) {
      window.location.href = "http://10.128.220.113:8080";
    }
    return Promise.reject(error);
  }
);

export default service;
