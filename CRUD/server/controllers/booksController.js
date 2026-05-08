import db from "../db.js";

export const viewBooks = (req, res) => {
    const query = "SELECT * FROM books";

    db.query(query, (err, data) => {
        if (err) res.json(err);
        return res.json(data);
    });
};

export const addBooks = (req, res) => {
    const query = "INSERT INTO books(`title`, `descr`, `price`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.descr,
        req.body.price,
        req.body.cover
    ];

    db.query(query, [values], (err, data) => {
        if (err) res.json(err);
        return res.json(data);
    });
};

export const updateBooks = (req, res) => {
    const bookId = req.params.id;
    const query = "UPDATE books SET `title` = ?, `descr` = ?, `price` = ?, `cover` = ? WHERE id = ?";
    const values = [
        req.body.title,
        req.body.descr,
        req.body.price,
        req.body.cover
    ];

    db.query(query, [...values, bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
};

export const deleteBooks = (req, res) => {
    const bookId = req.params.id;
    const query = "DELETE FROM books WHERE id = ?";

    db.query(query, [bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
};