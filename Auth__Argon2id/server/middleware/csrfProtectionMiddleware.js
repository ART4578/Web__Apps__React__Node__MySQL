import csrf from "csurf";
import dotenv from "dotenv";

dotenv.config();

const { NODE_ENV } = process.env;

const csrfProtectionMiddleware = csrf({
    cookie: {
        httpOnly: true,
        sameSite: "strict",
        secure: NODE_ENV === "production"
    },
});

export default csrfProtectionMiddleware;