import mysql from "mysql2/promise";
import { env } from "../config/env.js";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = env;

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
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    charset: "utf8mb4",
    multipleStatements: false,
    timezone: "Z"
});

export default db;