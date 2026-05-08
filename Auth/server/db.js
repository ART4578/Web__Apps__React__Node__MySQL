import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_DATABASE) {
    console.error("Database environment variables are missing");
    process.exit(1);
};

const db = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 1000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

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

testConnection();

export default db;