import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET, JWT_EXPIRES } = process.env;

const generateToken = (user) => {
    return jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES });
};

export default generateToken;