import axios from "axios";

const getCsrfToken = async () => {
    const res = await axios.get(
        "http://localhost:5000/api/csrf-token",
        { withCredentials: true }
    );

    return res.data.csrfToken;
};

export default getCsrfToken;