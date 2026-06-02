import express from "express";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";

import env from "./config/env.js";
import feedbackRouter from "./routes/feedbackRouter.js";

const app = express();

const { PORT, CLIENT_URL } = env;

app.use(express.json({ limit: "10kb" }));
app.use(cors({ origin: CLIENT_URL }));
app.use(helmet());
app.disable("x-powered-by");
app.use(hpp());

app.use("/api", feedbackRouter);

app.listen(PORT, () => console.log("Server Started"));