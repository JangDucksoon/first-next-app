import axios, { AxiosInstance } from 'axios';

const apiInstance: AxiosInstance = axios.create({
    baseURL: 'http://192.168.30.100:32563',
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
    baseURL: 'http://192.168.30.100:32563',
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
