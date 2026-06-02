import db from "../config/db.js";

export const findUserByEmail = async (email) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    return rows[0] || null;
};

export const createUsers = async ({ id, first_name, last_name, email, password }) => {
    try {
        await db.query(
            `INSERT INTO users (id, first_name, last_name, email, password)
             VALUES (?, ?, ?, ?, ?)`,
            [id, first_name, last_name, email, password]
        );

        return {
            id,
            first_name,
            last_name,
            email
        };

    } catch (error) {
        console.error("createUsers error:", error);
        throw error;
    };
};