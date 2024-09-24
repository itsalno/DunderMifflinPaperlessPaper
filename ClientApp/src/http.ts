import {Api} from './myApi.ts';

export const baseUrl = 'http://localhost:5169';

export const http = new Api({
    baseUrl: baseUrl
});