import app from "./app.js";
import testConnection from "./database/testConnection.js";
import { env } from "./config/env.js";

const { PORT } = env;

const startServer = async () => {
    await testConnection();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();