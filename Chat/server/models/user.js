import db from "../db.js";

export const findUserByEmail = (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], callback);
};

export const createUser = (name, surname, email, hashedPassword, callback) => {
    const sql = "INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, surname, email, hashedPassword], callback);
};