import axios from 'axios';
import { BASE_API_URL } from '@/config/apiConfig';

export const registerRaw = (data) => {
    return axios.post(`${BASE_API_URL}/register`, data, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: false
    });
};
