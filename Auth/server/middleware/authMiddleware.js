import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "No access rights (token missing)." });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token." });
    };
};

export default verifyToken;