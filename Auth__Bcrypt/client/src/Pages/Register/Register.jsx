import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../AxiosConfig/AxiosConfig";

function Register() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
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
            await api.post("/register", formData);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Սերվերի սխալ")
        } finally {
            setLoading(false);
        };
    };

    const handleRouter = () => navigate("/login");

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <h2>Գրանցում</h2>
                <input type="text" name="first_name" placeholder="Անուն" value={formData.first_name} onChange={handleChange} required />
                <input type="text" name="last_name" placeholder="Ազգանուն" value={formData.last_name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Էլ․ հասցե" value={formData.email} onChange={handleChange} autoComplete="username" required />
                <input type="password" name="password" placeholder="Գաղտնաբառ" value={formData.password} onChange={handleChange} autoComplete="new-password" required />
                <button type="submit" disabled={loading}>
                    {loading ? "Գրանցում..." : "Գրանցվել"}
                </button>
                {error && <p className="error">{error}</p>}
                <p onClick={handleRouter} className="link">Մուտք</p>
            </form>
        </div>
    );
};

export default Register;