import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

export const publicApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
});


// Interceptors
api.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        'x-access-token': localStorage.getItem('auth_token'),
    }

    return config;
});
