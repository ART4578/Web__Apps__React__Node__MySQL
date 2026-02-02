import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Api/AxiosConfig/AxiosConfig";
import { loginValidator } from "../../Validators/authValidator";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setErrors((prev) => ({ ...prev, [name]: loginValidator(formData)[name] || "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = loginValidator(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length) return;

        setLoading(true);
        setError("");

        try {
            await api.post("/login", {
                email: formData.email,
                password: formData.password
            });

            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Server Error");
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
                    onBlur={handleBlur}
                    autoComplete="username" 
                    required 
                />
                {errors.email && <p className="error">{errors.email}</p>}
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={handleChange}
                    onBlur={handleBlur} 
                    autoComplete="current-password" 
                    required 
                />
                {errors.password && <p className="error">{errors.password}</p>}
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