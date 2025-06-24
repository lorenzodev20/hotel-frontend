import axios from "axios";
import { getTokenFromLocalStorage } from "../utils/auth";

export const hotelBackend = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 60000,
    headers: {
        "Accept": "application/json"
    }
});

// Add a request interceptor
hotelBackend.interceptors.request.use(
    (config) => {
        const token = getTokenFromLocalStorage();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

hotelBackend.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            console.error("Unauthorized request. Token might be expired or invalid.");
            window.dispatchEvent(new Event('auth-expired'));
        }
        return Promise.reject(error);
    }
);