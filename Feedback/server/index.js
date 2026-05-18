import express from "express";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import dotenv from "dotenv";

import feedbackRouter from "./routes/feedbackRouter.js";

dotenv.config();

const app = express();
const { PORT, CLIENT_ORIGIN } = process.env;

app.use(express.json({ limit: "10kb" }));
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(helmet());
app.disable("x-powered-by");
app.use(hpp());

app.use("/api", feedbackRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

app.listen(PORT, () => console.log("Server Started"));