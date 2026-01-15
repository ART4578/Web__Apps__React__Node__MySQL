import { Routes, Route } from "react-router-dom";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import NotFound from "../Pages/NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function Router() {
    return (
        <Routes>
            <Route path="/" element={
                <ProtectedRoute>
                    <Home/>
                </ProtectedRoute>
                }
            />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
    );
};

export default Router;