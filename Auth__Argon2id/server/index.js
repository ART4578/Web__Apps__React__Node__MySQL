import express from "express";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import csrfRouter from "./routes/csrfRouter.js";
import authRouter from "./routes/authRouter.js";

dotenv.config();

const app = express();

app.use(cors({ 
    origin: process.env.CLIENT_ORIGIN, 
    credentials: true 
}));
app.use(helmet());
app.use(hpp());
app.use(cookieParser());
app.use(express.json());

app.use("/api", csrfRouter);
app.use("/api/auth", authRouter);

app.listen(process.env.PORT, () => console.log("Server Started"));