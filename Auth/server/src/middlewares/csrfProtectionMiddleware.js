import csrf from "csurf";
import { env } from "../config/env.js";

const { NODE_ENV } = env;

const csrfProtectionMiddleware = csrf({
    cookie: {
        httpOnly: true,
        sameSite: "strict",
        secure: NODE_ENV === "production"
    }
});

export default csrfProtectionMiddleware;