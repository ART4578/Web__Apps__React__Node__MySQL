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

const userSockets = {};
const users = new Map();

io.on("connection", (socket) => {
    console.log("Socket միացված է:", socket.id);

    socket.on("userConnected", (user) => {
        users.set(socket.id, user);
        userSockets[user.id] = socket.id;
        console.log("Օգտվող միացավ:", user.name);

        io.emit("activeUsers", Array.from(users.values()));
    });

    socket.on("sendMessage", (message) => {
        const toSocketId = userSockets[message.to];

        if (toSocketId) {
            io.to(toSocketId).emit("receiveMessage", message);
        };

        socket.emit("receiveMessage", message);
    });

    socket.on("editMessage", (updatedMsg) => {
        const toSocketId = getSocketIdByUserId(updatedMsg.to);
        const fromSocketId = getSocketIdByUserId(updatedMsg.userId);

        if (toSocketId) {
            io.to(toSocketId).emit("editMessage", updatedMsg);
        };

        if (fromSocketId) {
            io.to(fromSocketId).emit("editMessage", updatedMsg);
        };
    });

    socket.on("deleteMessageForBoth", (messageId, fromId, toId) => {
        const fromSocket = userSockets[fromId];
        const toSocket = userSockets[toId];

        if (fromSocket) {
            io.to(fromSocket).emit("deleteMessageForBoth", messageId);
        };

        if (toSocket) { 
            io.to(toSocket).emit("deleteMessageForBoth", messageId);
        };
    });

    socket.on("disconnect", () => {
        const user = users.get(socket.id);
        console.log("Դուրս եկավ:", user?.name || "Անհայտ");

        users.delete(socket.id);
        io.emit("activeUsers", Array.from(users.values()));

        for (const id in userSockets) {
            if (userSockets[id] === socket.id) {
                delete userSockets[id];
                break;
            };
        };
    });

    socket.onAny((event, ...args) => {
        console.log(`[${event}] ստացվեց՝`, args);
    });

    function getSocketIdByUserId(userId) {
        return userSockets[userId] || null;
    };
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log("Server Started"));