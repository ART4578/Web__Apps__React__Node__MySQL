import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api/AxiosConfig";
import loginSchema from "../Validators/LoginSchema";
import "../Styles/Auth.css";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;

        const result = loginSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;

            setErrors((prev) => ({
                ...prev,
                [name]: fieldErrors[name]?.[0] || ""
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                [name]: ""
            }));
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = loginSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors = {};

            result.error.issues.forEach((issue) => {
                fieldErrors[issue.path[0]] = issue.message;
            });

            setErrors(fieldErrors);
            return;
        };

        setErrors({});
        setError("");
        setLoading(true);

        try {
            await api.post("/login", result.data);

            navigate("/");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                "Server Error"
            );
        } finally {
            setLoading(false);
        };
    };

    const handleRouter = () => {
        navigate("/register");
    };

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
                    autoComplete="email"
                />
                {errors.email && (<p className="error">{errors.email}</p>)}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="current-password"
                />
                {errors.password && (<p className="error">{errors.password}</p>)}
                <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
                {error && (<p className="error">{error}</p>)}
                <p onClick={handleRouter} className="link">Register</p>
            </form>
        </div>
    );
};

export default Login;