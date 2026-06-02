import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api/AxiosConfig";
import "../Styles/Home.css";

function Home() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await api.get("/me");

                setUser(data.user);
            } catch (err) {
                if (err.response?.status === 401) {
                    navigate("/login", { replace: true });
                    return;
                };

                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Failed to load user data"
                );
            } finally {
                setLoading(false);
            };
        };

        fetchUser();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await api.post("/logout");

            navigate("/login", { replace: true });
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                "Failed to logout"
            );
        };
    };

    if (loading) {
        return (
            <div className="home">
                <h2>Loading...</h2>
            </div>
        );
    };

    if (error) {
        return (
            <div className="home">
                <p className="error">{error}</p>
            </div>
        );
    };

    if (!user) {
        return null;
    };

    return (
        <div className="home">
            <h2 className="header">Welcome, {user.first_name} {user.last_name}</h2>
            <button type="button" className="logout-btn" onClick={handleLogout} aria-label="Logout">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"/>
                </svg>
            </button>
        </div>
    );
};

export default Home;