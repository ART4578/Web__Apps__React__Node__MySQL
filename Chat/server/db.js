import mysql from "mysql2";

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
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