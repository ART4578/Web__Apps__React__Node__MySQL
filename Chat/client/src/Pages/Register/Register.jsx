import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

        axios.post("http://localhost:5000/api/auth/register", formData, { withCredentials: true })
            .then(() => navigate("/"))
            .catch((err) => {
                alert(err.response?.data?.message || "Սերվերի սխալ");
        });
    };

    return (
        <div className="page-wrapper">
            <h2>Գրանցում</h2>
            <form onSubmit={handleSubmit} className="page-form">
                <input name="name" type="text" placeholder="Անուն" onChange={handleChange} required />
                <input name="surname" type="text" placeholder="Ազգանուն" onChange={handleChange} required />
                <input name="email" type="email" placeholder="Էլ․ հասցե" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Գաղտնաբառ" onChange={handleChange} required />
                <button type="submit">Գրանցվել</button>
            </form>
            <p>Արդեն ունե՞ք հաշիվ։ <a href="/login">Մուտք գործել</a></p>
        </div>
    );
};

export default Register;