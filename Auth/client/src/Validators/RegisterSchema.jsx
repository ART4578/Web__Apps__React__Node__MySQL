import { z } from "zod";
import nameRegex from "../Regex/NameRegex";
import emailRegex from "../Regex/EmailRegex";
import passwordRegex from "../Regex/PasswordRegex";

const registerSchema = z.object({
    first_name: z
        .string()
        .trim()
        .min(2, "First name is too short")
        .max(30, "First name is too long")
        .regex(nameRegex, "Invalid first name format"),
    last_name: z
        .string()
        .trim()
        .min(2, "Last name is too short")
        .max(40, "Last name is too long")
        .regex(nameRegex, "Invalid last name format"),
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
        .min(8, "Password must be at least 8 characters")
        .max(64)
        .regex(passwordRegex, "Weak password format")
});

export default registerSchema;