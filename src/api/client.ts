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
        const token = getTokenFromLocalStorage(); // Get the token dynamically from localStorage

        if (token) {
            // If a token exists, set the Authorization header
            config.headers.Authorization = `Bearer ${token}`;
        }
        // Return the modified config
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Optional: Add a response interceptor for error handling (e.g., token expiration)
hotelBackend.interceptors.response.use(
    (response) => {
        // Any status code that lies in the range of 2xx causes this function to trigger
        return response;
    },
    (error) => {
        // Any status codes that fall outside the range of 2xx cause this function to trigger
        if (error.response?.status === 401) {
            // Handle unauthorized requests (e.g., redirect to login, clear token)
            console.error("Unauthorized request. Token might be expired or invalid.");
            // Example: clear token and redirect (pseudo-code)
            // localStorage.removeItem('userAuth');
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);