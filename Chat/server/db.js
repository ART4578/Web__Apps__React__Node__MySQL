import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

if (!DB_HOST || !DB_USER || !DB_DATABASE) {
    console.error("Database environment variables are missing");
    process.exit(1);
};

const db = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 100
});

const testConnection = () => {
    db.getConnection((err, connection) => {
        if (err) {
            console.error("MySQL connection failed:", err.message);
            process.exit(1);
            return;
        };

        console.log("MySQL connected successfully");
        connection.release();
    });
};

testConnection();

export default db;