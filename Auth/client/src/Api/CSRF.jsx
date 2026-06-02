import axios from "axios";

let csrfToken = null;

export const initCsrf = async () => {
    const res = await axios.get(
        "http://localhost:5000/api/csrf-token",
        { withCredentials: true }
    );

    csrfToken = res.data.csrfToken;
};

export const getCsrfToken = () => csrfToken;