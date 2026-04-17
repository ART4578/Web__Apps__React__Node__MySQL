const userSockets = {};
const users = new Map();

const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("Socket is connected.", socket.id);

        socket.on("userConnected", (user) => {
            users.set(socket.id, user);
            userSockets[user.id] = socket.id;
            console.log("User joined.", user.name);
            io.emit("activeUsers", Array.from(users.values()));
        });

        socket.on("sendMessage", (message) => {
            const toSocketId = userSockets[message.to];

            if (toSocketId) io.to(toSocketId).emit("receiveMessage", message);

            socket.emit("receiveMessage", message);
        });

        socket.on("editMessage", (updatedMsg) => {
            const toSocketId = getSocketIdByUserId(updatedMsg.to);
            const fromSocketId = getSocketIdByUserId(updatedMsg.userId);

            if (toSocketId) io.to(toSocketId).emit("editMessage", updatedMsg);
            if (fromSocketId) io.to(fromSocketId).emit("editMessage", updatedMsg);
        });

        socket.on("deleteMessageForBoth", (messageId, fromId, toId) => {
            const fromSocket = userSockets[fromId];
            const toSocket = userSockets[toId];

            if (fromSocket) io.to(fromSocket).emit("deleteMessageForBoth", messageId);
            if (toSocket) io.to(toSocket).emit("deleteMessageForBoth", messageId);
        });

        socket.on("disconnect", () => {
            const user = users.get(socket.id);
            console.log("It came out.", user?.name || "Unknown.");

            users.delete(socket.id);
            io.emit("activeUsers", Array.from(users.values()));

            for (const id in userSockets) {
                if (userSockets[id] === socket.id) {
                    delete userSockets[id];
                    break;
                };
            };
        });

        socket.onAny((event, ...args) => console.log(`[${event}] it worked՝`, args));

        function getSocketIdByUserId(userId) {
            return userSockets[userId] || null;
        };
    });
};

export default socketHandler;