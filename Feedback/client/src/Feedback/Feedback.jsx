import { useState } from "react";
import api from "../Api/AxiosConfig";
import "./Feedback.css";
import "./Responsive.css";

function Feedback() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setSuccess("");
        setError("");

        try {
            const response = await api.post("/send-email", formData);

            setSuccess(response.data.message);
            setFormData({ firstName: "", lastName: "", email: "", message: "" });
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Could not connect to server.");
            };
        };

        setLoading(false);
    }; 

    return (
        <div className="container">
            <div className="glass-card">
                <div className="top-circle"></div>
                <div className="bottom-circle"></div>
                <h1>Luxury Feedback</h1>
                <p className="subtitle">Send your message.</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <textarea
                            name="message"
                            placeholder="Your Message..."
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit">
                        {
                            loading ? "Sending..." : "Send"
                        }
                    </button>
                </form>
                {
                    success && <div className="success">{success}</div>
                }
                {
                    error && <div className="error">{error}</div>
                }
            </div>
        </div>
    );
};

export default Feedback;