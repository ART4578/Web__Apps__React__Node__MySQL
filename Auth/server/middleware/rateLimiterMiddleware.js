import rateLimit from "express-rate-limit";
import createLimiter from "../utils/rateLimiter.js";

export const loginLimiterMiddleware = createLimiter({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many login attempts. Please try again later."
});

export const registerLimiterMiddleware = createLimiter({
    windowMs: 60 * 60 * 1000,
    max: 3,
    message: "Too many registration attempts. Please try again later."
});