import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/auth.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

const users = new Map();

io.on("connection", (socket) => {
    console.log("Socket միացված է:", socket.id);

    socket.on("userConnected", (user) => {
        users.set(socket.id, user);
        console.log("Օգտվող միացավ:", user.name);

        io.emit("activeUsers", Array.from(users.values()));
    });

    socket.on("sendMessage", (message) => {
        io.emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
        const user = users.get(socket.id);
        console.log("Դուրս եկավ:", user?.name || "Անհայտ");

        users.delete(socket.id);
        io.emit("activeUsers", Array.from(users.values()));
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log("Server Started"));