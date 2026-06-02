import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const { JWT_ACCESS_SECRET, JWT_ACCESS_EXPIRES } = env;

export const generateAccessToken = (user) => {
    return jwt.sign(
        user, 
        JWT_ACCESS_SECRET, 
        { expiresIn: JWT_ACCESS_EXPIRES }
    );
};