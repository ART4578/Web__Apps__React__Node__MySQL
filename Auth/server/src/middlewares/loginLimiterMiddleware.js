import rateLimit from "express-rate-limit";

const loginLimiterMiddleware = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many login attempts. Please try again later."
    }
});

export default loginLimiterMiddleware;