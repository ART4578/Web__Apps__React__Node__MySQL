import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import booksRouter from "./routes/booksRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/books", booksRouter);

app.listen(process.env.PORT, () => console.log("Server Started"));