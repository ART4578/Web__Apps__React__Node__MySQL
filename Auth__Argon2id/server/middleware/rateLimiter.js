import rateLimit from "express-rate-limit";

const createLimiter = ({ windowMs, max, message }) => rateLimit({
    windowMs,
    max,
    standardHeaders: true, 
    legacyHeaders: false, 
    handler: (req, res) => {
        return res.status(429).json({
            success: false,
            message
        });
    }
});

export const loginLimiter = createLimiter({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many login attempts. Please try again later."
});

export const registerLimiter = createLimiter({
    windowMs: 60 * 60 * 1000,
    max: 3,
    message: "Too many registration attempts. Please try again later."
});