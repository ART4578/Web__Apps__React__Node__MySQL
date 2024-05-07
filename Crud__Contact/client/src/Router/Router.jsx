import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "../Pages/Home/Home";
import AddEdit from "../Pages/AddEdit/AddEdit";
import View from "../Pages/View/View";

function Router() {
    return (
        <div style={{ textAlign: "center" }}>
            <ToastContainer position="top-center"/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/addContact" element={<AddEdit/>}/>
                <Route path="/update/:id" element={<AddEdit/>}/>
                <Route path="/view/:id" element={<View/>}/>
            </Routes>
        </div>
    );
};

export default Router;