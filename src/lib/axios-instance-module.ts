import axios, { AxiosInstance } from 'axios';

import { API_URL } from './env';

const apiInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

apiInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const loginIntance: AxiosInstance = axios.create({
    baseURL: process.env.KUBE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

loginIntance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiInstance;
