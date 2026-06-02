import axios from "axios";
import { getCsrfToken } from "./CSRF";

const api = axios.create({
    baseURL: "http://localhost:5000/api/auth",
    withCredentials: true
});

api.interceptors.request.use((config) => {
    const methods = ["post", "put", "delete", "patch"];

    if (methods.includes(config.method)) {
        const token = getCsrfToken();

        if (token) {
            config.headers["x-csrf-token"] = token;
        };
    };

    return config;
});

export default api;