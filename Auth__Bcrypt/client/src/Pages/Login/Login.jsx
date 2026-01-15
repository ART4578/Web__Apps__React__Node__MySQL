import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../AxiosConfig/AxiosConfig";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await api.post("/login", formData);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Սերվերի սխալ");
        } finally {
            setLoading(false);
        };
    };

    const handleRouter = () => navigate("/register");

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <h2>Մուտք</h2>
                <input type="email" name="email" placeholder="Էլ․ հասցե" value={formData.email} onChange={handleChange} autoComplete="username" required />
                <input type="password" name="password" placeholder="Գաղտնաբառ" value={formData.password} onChange={handleChange} autoComplete="current-password" required />
                <button type="submit" disabled={loading}>
                    {loading ? "Ներբեռնում..." : "Մուտք"}
                </button>
                {error && <p className="error">{error}</p>}
                <p onClick={handleRouter} className="link">Գրանցվել</p>
            </form>
        </div>
    );
};

export default Login;