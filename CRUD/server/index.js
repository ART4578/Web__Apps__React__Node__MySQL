import express from "express";
import cors from "cors";
import env from "./config/env.js";

import testConnection from "./database/testConnection.js";
import booksRouter from "./routes/booksRouter.js";

const app = express();

const { PORT } = env;

app.use(express.json());
app.use(cors());

app.use("/books", booksRouter);

testConnection((err) => {
    if (err) {
        console.log("Database Error");
        process.exit(1);
    };

    console.log("Database Ready");

    app.listen(PORT, () => {
        console.log(`Server Started on port ${PORT}`);
    });
});