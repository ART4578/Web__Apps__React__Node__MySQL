import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../AxiosConfig/AxiosConfig";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post("/register", formData)
            .then(() => navigate("/"))
            .catch((err) => {
                alert(err.response?.data?.message || "Server error.");
        });
    };

    return (
        <div className="page-wrapper">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="page-form">
                <input name="name" type="text" placeholder="First Name" onChange={handleChange} required />
                <input name="surname" type="text" placeholder="Last Name" onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
            <p>Do you already have an account? <a href="/login">Login</a></p>
        </div>
    );
};

export default Register;