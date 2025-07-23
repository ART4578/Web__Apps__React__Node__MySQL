import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [formData, setFormData] = useState({
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

        axios.post("http://localhost:5000/api/login", formData, { withCredentials: true })
            .then(() => navigate("/"))
            .catch((err) => {
                console.error(err);
                setError(err.response?.data?.message || "Սերվերի սխալ");
            });
    };

    const handleRouter = () => navigate("/register");

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <h2>Մուտք</h2>
                <input type="email" name="email" placeholder="Էլ․ հասցե" required onChange={handleChange} />
                <input type="password" name="password" placeholder="Գաղտնաբառ" required onChange={handleChange} />
                <button type="submit">Մուտք</button>
                {error && <p className="error">{error}</p>}
                <p onClick={handleRouter} className="link">Գրանցվել</p>
            </form>
        </div>
    );
};

export default Login;