import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const { JWT_ACCESS_SECRET } = env;

const verifyToken = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            message: "Authentication required (token missing)."
        });
    };

    try {
        const decoded = jwt.verify(token, JWT_ACCESS_SECRET);

        req.user = decoded;

        return next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token."
        });
    };
};

export default verifyToken;