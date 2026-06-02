import mysql from "mysql2";
import env from "./env.js";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = env;

const db = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    database: DB_DATABASE,
    password: DB_PASSWORD
});

export default db;