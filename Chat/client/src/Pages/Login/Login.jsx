import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:5000/api/auth/login", formData, { withCredentials: true })
            .then(() => navigate("/"))
            .catch(err => {
                alert(err.response?.data?.message || "Մուտքի սխալ");
        });
    };

    return (
        <div className="page-wrapper">
            <h2>Մուտք</h2>
            <form onSubmit={handleSubmit} className="page-form">
                <input name="email" type="email" placeholder="Էլ․ հասցե" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Գաղտնաբառ" onChange={handleChange} required />
                <button type="submit">Մուտք գործել</button>
            </form>
            <p>Չունե՞ք հաշիվ։ <a href="/register">Գրանցվել</a></p>
        </div>
    );
};

export default Login;