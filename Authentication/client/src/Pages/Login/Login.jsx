import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    //login user
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post("http://localhost:8081/login", values)
            .then(resp => {
                if (resp.data.Status === "Success") {
                    navigate("/");
                } else {
                    alert(resp.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Sign-In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input 
                        type="email" 
                        placeholder="Enter Email" 
                        name="email" 
                        className="form-control rounded-0"
                        onChange={(e) => setValues({ ...values, email: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input 
                        type="password" 
                        placeholder="Enter Password" 
                        name="password" 
                        className="form-control rounded-0"
                        onChange={(e) => setValues({ ...values, password: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Login</button>
                    <p>You are agree to aour terms and policies</p>
                    <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Create Account</Link>
                </form>
            </div>
        </div>
    );
};

export default Login;