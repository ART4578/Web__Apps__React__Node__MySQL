import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: "Չափազանց շատ մուտքի փորձեր։ Խնդրում ենք փորձել 5 րոպեից։",
    standardHeaders: true,
    legacyHeaders: false
});

export default loginLimiter;