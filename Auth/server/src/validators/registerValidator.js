import { z } from "zod";
import nameRegex from "../regex/nameRegex.js";
import emailRegex from "../regex/emailRegex.js";
import passwordRegex from "../regex/passwordRegex.js";

const registerValidator = z.object({
    first_name: z
        .string()
        .trim()
        .min(2, "First name too short")
        .max(30, "First name too long")
        .regex(nameRegex, "Invalid first name format"),
    last_name: z
        .string()
        .trim()
        .min(2, "Last name too short")
        .max(40, "Last name too long")
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
        .min(8)
        .max(64)
        .regex(passwordRegex, "Password is too weak")
});

export default registerValidator;