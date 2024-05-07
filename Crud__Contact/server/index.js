import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import usersRouter from "./routes/users.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", usersRouter);

app.listen(process.env.PORT, () => console.log("Server Started"));