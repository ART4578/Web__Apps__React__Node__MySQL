import db from "../db.js";

export const findUserByEmail = async (email) => {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", email);
    
    return users;
};

export const createUsers = async ({ id, first_name, last_name, email, password }) => {
    const [result] = await db.query(
        `INSERT INTO users (id, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)`,
        [id, first_name, last_name, email, password]
    );

    return result;
};