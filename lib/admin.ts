import { api } from './fetcher';

// SETTINGS
export const getKey = () => api.get('/settings/api-key').then(r => r.data);
export const rotateKey = () => api.post('/settings/rotate').then(r => r.data);

// PAYOUTS
export const listPayouts = (q: string) => api.get(`/payouts?${q}`).then(r => r.data);
export const createPayout = (amount: number, currency = 'USD') => api.post('/payouts', { amount, currency }).then(r => r.data);
export const sendPayout = (id: string) => api.post(`/payouts/${id}/send`).then(r => r.data);

// WEBHOOKS
export const listEndpoints = () => api.get('/webhooks/endpoints').then(r => r.data);
export const listDeliveries = (limit = 50) => api.get(`/webhooks/deliveries?limit=${limit}`).then(r => r.data);
export const sendTestWebhook = () => api.post('/webhooks/test', {}).then(r => r.data);
