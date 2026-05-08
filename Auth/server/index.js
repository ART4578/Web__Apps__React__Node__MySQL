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
const { PORT, CLIENT_ORIGIN } = process.env;

app.use(cors({ 
    origin: CLIENT_ORIGIN, 
    credentials: true 
}));
app.use(helmet());
app.disable("x-powered-by");
app.use(hpp());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", csrfRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

app.listen(PORT, () => console.log("Server Started"));