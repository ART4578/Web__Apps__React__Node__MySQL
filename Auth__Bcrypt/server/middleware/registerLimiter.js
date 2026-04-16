import rateLimit from "express-rate-limit";

const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3, 
    message: {
        success: false,
        message: "Too many registration attempts, please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export default registerLimiter;