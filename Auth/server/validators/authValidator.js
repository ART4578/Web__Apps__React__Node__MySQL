import { body } from "express-validator";

export const registerValidator = [
    body("first_name")
        .trim()
        .matches(/^[A-Z][a-z]{2,}$/)
        .withMessage("The name must start with a capital letter and have at least 3 characters."),

    body("last_name")
        .trim()
        .matches(/^[A-Z][a-z]{4,}$/)
        .withMessage("The last name must start with a capital letter and have at least 5 characters."),

    body("email")
        .trim()
        .toLowerCase()
        .isEmail()
        .withMessage("Invalid email address."),

    body("password")
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
        .withMessage("Password must contain an uppercase letter, lowercase letter, number, symbol, and ≥8 characters.")
];

export const loginValidator = [
    body("email")
        .trim()
        .toLowerCase()
        .notEmpty()
        .withMessage("Email is required."),

    body("password")
        .notEmpty()
        .withMessage("Password is required.")
];