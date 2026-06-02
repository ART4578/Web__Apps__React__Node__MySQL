import db from "../config/db.js";

const testConnection = (callback) => {
    db.getConnection((err, connection) => {
        if (err) {
            console.error("MySQL connection failed:", err.message);
            return callback(err);
        };

        console.log("MySQL connected successfully");

        connection.release();

        callback(null);
    });
};

export default testConnection;