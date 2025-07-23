import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../AxiosConfig/AxiosConfig";

function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        api.get("/me")
            .then(() => setIsAuthenticated(true))
            .catch(() => setIsAuthenticated(false));
    }, []);

    if (isAuthenticated === null) return <div>Ստուգվում է...</div>;

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;