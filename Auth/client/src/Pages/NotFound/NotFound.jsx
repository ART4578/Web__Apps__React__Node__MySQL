import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "404 | Page not found";
    }, []);

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <div className="notfound-container">
            <h1 className="notfound-title">404</h1>
            <p className="notfound-text">The page you entered does not exist.</p>
            <button className="notfound-btn" onClick={handleGoHome}>Back to main.</button>
        </div>
    );
};

export default NotFound;