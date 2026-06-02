import rateLimit from "express-rate-limit";

const registerLimiterMiddleware = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many registration attempts. Please try again later."
    }
});

export default registerLimiterMiddleware;