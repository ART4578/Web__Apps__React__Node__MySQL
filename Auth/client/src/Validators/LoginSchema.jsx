import { z } from "zod";
import emailRegex from "../Regex/EmailRegex";
import passwordRegex from "../Regex/PasswordRegex";

const loginSchema = z.object({
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
        .regex(passwordRegex, "Weak password")   
});

export default loginSchema;