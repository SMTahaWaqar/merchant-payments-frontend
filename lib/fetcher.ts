import axios from 'axios';

export const API = "/_api";

export const api = axios.create({
    baseURL: API,
    withCredentials: true,
});

export const fetcher = (url: string) => api.get(url).then(r => r.data);