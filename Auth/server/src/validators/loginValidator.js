import { z } from "zod";
import emailRegex from "../regex/emailRegex.js";
import passwordRegex from "../regex/passwordRegex.js";

const loginValidator = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .min(6)
        .max(254)
        .regex(emailRegex, "Invalid email format"),
    password: z
        .string()
        .trim()
        .min(8)
        .max(64)
        .regex(passwordRegex, "Password is too weak"),
});

export default loginValidator;