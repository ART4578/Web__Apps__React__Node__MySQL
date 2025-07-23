import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../AxiosConfig/AxiosConfig";

function Home() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/me");
                setUser(res.data.user);
            } catch (err) {
                navigate("/login");
            } finally {
                setLoading(false);
            };
        };

        fetchUser();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await api.post("/logout");
            navigate("/login");
        } catch (err) {
            console.error("Չհաջողվեց դուրս գալ:", err);
        };
    };

    if (loading) {
        return <div className="home">Բեռնվում է...</div>;
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