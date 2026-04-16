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
            setError(err.response?.data?.message || "Server error.");
        } finally {
            setLoading(false);
        };
    };

    const handleRouter = () => navigate("/register");

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input 
                    type="email"
                    name="email" 
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    autoComplete="username" 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    autoComplete="current-password" 
                    required 
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Downloading..." : "Login"}
                </button>
                {error && <p className="error">{error}</p>}
                <p onClick={handleRouter} className="link">Register</p>
            </form>
        </div>
    );
};

export default Login;