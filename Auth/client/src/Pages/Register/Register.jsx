import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Api/AxiosConfig/AxiosConfig";
import { registerValidator } from "../../Validators/authValidator";

function Register() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
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
        setErrors((prev) => ({ ...prev, [name]: registerValidator(formData)[name] || "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = registerValidator(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length) return;

        setLoading(true);
        setError("");

        try {
            await api.post("/register", {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                password: formData.password
            });

            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Server Error")
        } finally {
            setLoading(false);
        };
    };

    const handleRouter = () => navigate("/login");

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input 
                    type="text" 
                    name="first_name" 
                    placeholder="First Name" 
                    value={formData.first_name} 
                    onChange={handleChange}
                    onBlur={handleBlur} 
                    required 
                />
                {errors.first_name && <p className="error">{errors.first_name}</p>}
                <input 
                    type="text" 
                    name="last_name" 
                    placeholder="Last Name" 
                    value={formData.last_name} 
                    onChange={handleChange}
                    onBlur={handleBlur} 
                    required 
                />
                {errors.last_name && <p className="error">{errors.last_name}</p>}
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
                    autoComplete="new-password" 
                    required 
                />
                {errors.password && <p className="error">{errors.password}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? "Register..." : "Register"}
                </button>
                {error && <p className="error">{error}</p>}
                <p onClick={handleRouter} className="link">Login</p>
            </form>
        </div>
    );
};

export default Register;