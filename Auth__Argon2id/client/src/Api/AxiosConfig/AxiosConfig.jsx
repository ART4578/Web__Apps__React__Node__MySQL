import axios from "axios";
import getCsrfToken from "../CSRF/CSRF";

const api = axios.create({
    baseURL: "http://localhost:5000/api/auth",
    withCredentials: true
});

api.interceptors.request.use(
    async (config) => {
        const methods = ["post", "put", "delete", "patch"];

        if (methods.includes(config.method)) {
            const csrfToken = await getCsrfToken();
            config.headers["x-csrf-token"] = csrfToken;
        };

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;