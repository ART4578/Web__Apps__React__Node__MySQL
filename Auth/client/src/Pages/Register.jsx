import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api/AxiosConfig";
import registerSchema from "../Validators/RegisterSchema";
import "../Styles/Auth.css";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
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

        const result = registerSchema.safeParse(formData);

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

        const result = registerSchema.safeParse(formData);

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
            await api.post("/register", result.data);

            navigate("/login");
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
        navigate("/login");
    };

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
                    autoComplete="given-name"
                />
                {errors.first_name && (<p className="error">{errors.first_name}</p>)}
                <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="family-name"
                />
                {errors.last_name && (<p className="error">{errors.last_name}</p>)}
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
                    autoComplete="new-password"
                />
                {errors.password && (<p className="error">{errors.password}</p>)}
                <button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
                {error && (<p className="error">{error}</p>)}
                <p onClick={handleRouter} className="link">Login</p>
            </form>
        </div>
    );
};

export default Register;