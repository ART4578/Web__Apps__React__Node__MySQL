import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ 
    origin: process.env.CLIENT_ORIGIN, 
    credentials: true 
}));
app.use(helmet());
app.use(cookieParser());

app.use("/api", authRoutes);

app.listen(process.env.PORT, () => console.log("Server Started"));