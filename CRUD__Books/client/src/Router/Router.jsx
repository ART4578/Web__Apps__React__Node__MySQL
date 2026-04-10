import { Routes, Route } from "react-router-dom";
import Books from "../Pages/Books/Books";
import Add from "../Pages/Add/Add";
import Update from "../Pages/Update/Update";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Books/>}/>
            <Route path="/add" element={<Add/>}/>
            <Route path="/update/:id" element={<Update/>}/>
        </Routes>
    );
};

export default Router;