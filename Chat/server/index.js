import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";

import authRoutes from "./routes/authRouter.js";
import chatSocket from "./sockets/chatSocket.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const { PORT, CLIENT_ORIGIN } = process.env;

const io = new Server(server, {
    cors: {
        origin: CLIENT_ORIGIN,
        credentials: true
    }
});

app.use(cors({
    origin: CLIENT_ORIGIN,
    credentials: true
}));
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

chatSocket(io);

server.listen(PORT, () => console.log("Server Started"));