import axios from 'axios';

export const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = axios.create({
    baseURL: API,
    withCredentials: true,
});

export const fetcher = (url: string) => api.get(url).then(r => r.data);