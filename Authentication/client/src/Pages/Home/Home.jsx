import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/me", { withCredentials: true })
            .then((res) => setUser(res.data.user))
            .catch(() => navigate("/login"));
    }, []);

    const handleLogout = () => {
        axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true })
            .then(() => navigate("/login"));
    };

    return (
        <div className="home">
            <h2 className="header">Բարի գալուստ, {user?.first_name} {user?.last_name}</h2>
            <button className="logout-btn" onClick={handleLogout}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#f44336" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                </svg>
            </button>
        </div>
    );
};

export default Home;