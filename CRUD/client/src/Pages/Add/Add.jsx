import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Add() {
    const [book, setBook] = useState({
        title: "",
        descr: "",
        price: null,
        cover: ""
    });
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:5000/books/add", book);
            navigate("/");
        } catch (err) {
            console.log(err);
            setError(true)
        };
    };

    return (
        <div className="form">
            <h1>Add New Book</h1>
            <input 
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Book title"    
            />
            <textarea
                rows={5} 
                type="text"
                name="descr"
                onChange={handleChange}
                placeholder="Book descr"    
            />
            <input 
                type="number"
                name="price"
                onChange={handleChange}
                placeholder="Book price"    
            />
            <input 
                type="text"
                name="cover"
                onChange={handleChange}
                placeholder="Book cover"    
            />
            <button onClick={handleClick}>Add</button>
            {error && "Something went wrong!"}
            <Link to="/">See All Books</Link>
        </div>
    );
};

export default Add;