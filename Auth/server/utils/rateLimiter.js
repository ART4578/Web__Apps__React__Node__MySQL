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
    },
});

export default createLimiter;