import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/NotFound.css";

function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "404 | Page Not Found";

        return () => {
            document.title = "My App";
        };
    }, []);

    const handleGoHome = () => {
        navigate("/", { replace: true });
    };

    return (
        <main className="notfound-container" role="main" aria-labelledby="notfound-title">
            <h1 id="notfound-title" className="notfound-title">404</h1>
            <p className="notfound-text">The page you are looking for does not exist or has been moved.</p>
            <button type="button" className="notfound-btn" onClick={handleGoHome}>Back to Home</button>
        </main>
    );
};

export default NotFound;