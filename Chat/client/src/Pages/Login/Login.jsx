import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Config/AxiosConfig/AxiosConfig";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post("/login", formData)
            .then(() => navigate("/"))
            .catch((err) => alert(err.response?.data?.message || "Login error."));
    };

    return (
        <div className="page-wrapper">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="page-form">
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
    );
};

export default Login;