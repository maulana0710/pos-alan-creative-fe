import axios from "axios";
// import { useStore } from "@/store/store";

const getBaseURL = () => {
  const URL = process.env.NEXT_PUBLIC_SUBDOMAIN;
  // return `http://${URL}/api/v1/`;
  return `https://${URL}/api/v1/`;
};

const getAltBaseURL = () => {
  const URL_ALT = process.env.NEXT_PUBLIC_SUBDOMAIN;
  // return `http://${URL_ALT}/api/v1/`;
  return `https://${URL_ALT}/api/v1/`;
};

const BASE_URL = getBaseURL();
export { BASE_URL };
const BASE_ALT_URL = getAltBaseURL();
export { BASE_ALT_URL };
export const axiosInstance = axios.create({ baseURL: BASE_URL });
export const authorizedAxiosInstance = axios.create({ baseURL: BASE_URL });
export const authorizedAltAxiosInstance = axios.create({ baseURL: BASE_ALT_URL });

// authorizedAxiosInstance.interceptors.request.use(
//   (config) => {
//     const { token } = useStore.getState();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
authorizedAltAxiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
