import dotenv from "dotenv";

dotenv.config();

const env = {
    PORT: process.env.PORT,
    CLIENT_URL: process.env.CLIENT_URL,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    RECEIVER_MAIL: process.env.RECEIVER_MAIL
};

export default env;