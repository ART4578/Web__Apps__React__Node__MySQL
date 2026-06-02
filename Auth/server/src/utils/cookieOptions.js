import { env } from "../config/env.js";

const { NODE_ENV } = env;

const cookieOptions = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
    path: "/"
};

export default cookieOptions;