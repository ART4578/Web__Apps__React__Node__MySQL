import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import hpp from "hpp";

import { env } from "./config/env.js";
import notFoundMiddleware from "./middlewares/notFoundMiddleware.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import globalLimiter from "./middlewares/globalLimiter.js";
import csrfRoutes from "./routes/csrfRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

const { CLIENT_URL } = env;

app.use(helmet({
  crossOriginResourcePolicy: {
    policy: "cross-origin"
  }
}));
app.disable("x-powered-by");
app.use(hpp());
app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(globalLimiter);

app.use("/api", csrfRoutes);
app.use("/api/auth", authRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;