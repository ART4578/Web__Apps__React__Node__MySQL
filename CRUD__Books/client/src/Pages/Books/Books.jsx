import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Books() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await axios.get("http://localhost:5000/books/view");
                setBooks(res.data);
            } catch (err) {
                console.log(err);
            }; 
        };

        fetchBooks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/books/delete/${id}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <div>
            <h1>Books Shop</h1>
            <div className="books">
                {
                    books.map((book) => (
                        <div key={book.id} className="book">
                            <img src={book.cover} alt="" />
                            <h2>{book.title}</h2>
                            <p>{book.descr}</p>
                            <span>${book.price}</span>
                            <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
                            <button className="update">
                                <Link
                                    to={`/update/${book.id}`}
                                    style={{ color: "inherit", textDecoration: "none" }}
                                >
                                    Update
                                </Link>
                            </button>
                        </div>
                    ))
                }
            </div>
            <button className="addHome">
                <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
                    Add new book
                </Link>
            </button>
        </div>
    );
};

export default Books;