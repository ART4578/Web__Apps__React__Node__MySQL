import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const [error, setError] = useState("");
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setError("");

        axios.post("http://localhost:5000/api/register", formData, { withCredentials: true })
            .then(() => navigate("/login"))
            .catch((err) => {
                console.error(err);
                setError(err.response?.data?.message || "Սերվերի սխալ");
            });
    };

    const handleRouter = () => navigate("/login");

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <h2>Գրանցում</h2>
                <input type="text" name="first_name" placeholder="Անուն" required onChange={handleChange} />
                <input type="text" name="last_name" placeholder="Ազգանուն" required onChange={handleChange} />
                <input type="email" name="email" placeholder="Էլ․ հասցե" required onChange={handleChange} />
                <input type="password" name="password" placeholder="Գաղտնաբառ" required onChange={handleChange} />
                <button type="submit">Գրանցվել</button>
                {error && <p className="error">{error}</p>}
                <p onClick={handleRouter} className="link">Մուտք</p>
            </form>
        </div>
    );
};

export default Register;