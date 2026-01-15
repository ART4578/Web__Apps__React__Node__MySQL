import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "404 | Էջը չի գտնվել";
    }, []);

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <div className="notfound-container">
            <h1 className="notfound-title">404</h1>
            <p className="notfound-text">Ձեր կողմից մուտքագրված էջը գոյություն չունի։</p>
            <button className="notfound-btn" onClick={handleGoHome}>Վերադառնալ գլխավոր:</button>
        </div>
    );
};

export default NotFound;