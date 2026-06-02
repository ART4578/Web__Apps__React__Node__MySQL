import db from "../config/db.js";

const testConnection = async () => {
    try {
        const connection = await db.getConnection();
        console.log("MySQL connected successfully");
        connection.release();
    } catch (err) {
        console.error("MySQL connection failed:", err.message);
        process.exit(1);
    };
};

export default testConnection;