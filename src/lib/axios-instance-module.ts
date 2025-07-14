import axios, { AxiosInstance } from 'axios';

const apiInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8011/api',
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

export default apiInstance;
