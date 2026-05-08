import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

function Update() {
    const [book, setBook] = useState({
        title: "",
        descr: "",
        price: null,
        cover: ""
    });
    const [error,setError] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:5000/books/update/${id}`, book);
            navigate("/");
        } catch (err) {
            console.log(err);
            setError(true);
        };
    };

    return (
        <div className="form">
            <h1>Update the Book</h1>
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
            <button onClick={handleClick}>Update</button>
            {error && "Something went wrong!"}
            <Link to="/">See all books</Link>
        </div>
    );
};

export default Update;