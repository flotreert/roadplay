import { ClientApi } from './core/ClientApi';

export { ApiError } from './core/ApiError';
export { CancelablePromise, CancelError } from './core/CancelablePromise';
export type { Client } from './core/ClientApi';
export * from './services';
export * from './types';
export const client = new ClientApi();
client.setToken(window.localStorage.getItem('user') || '');
