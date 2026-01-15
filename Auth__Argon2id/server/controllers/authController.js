import { validationResult } from "express-validator";
import { generateToken } from "../middleware/authMiddleware.js";
import { hashPassword, verifyPassword } from "../utils/hashPassword.js";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import db from "../db.js";

dotenv.config();

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        const { first_name, last_name, email, password } = req.body;

        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({ message: "Please fill in all fields." });
        };

        const [existingUsers] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if (existingUsers.length > 0) {
            return res.status(409).json({ message: "This email address is already in use." });
        };

        const hashedPassword = await hashPassword(password);

        const [result] = await db.query(
            "INSERT INTO users (id, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)",
            [uuidv4(), first_name.trim(), last_name.trim(), email.trim().toLowerCase(), hashedPassword]
        );

        const user = {
            id: result.insertId,
            first_name,
            last_name,
            email
        };

        const token = generateToken(user);

        res
            .cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "Lax",
                maxAge: 1 * 60 * 60 * 1000
            })
            .status(201)
            .json({ message: "Registration successful.", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error." });
    };
};

export const login = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields." });
        };

        const normalizedEmail = email.trim().toLowerCase();

        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [normalizedEmail]);

        if (users.length === 0) {
            return res.status(401).json({ message: "User not found." });
        };

        const user = users[0];
        const validPass = await verifyPassword(password, user.password);

        if (!validPass) {
            return res.status(401).json({ message: "Incorrect email address or password." });
        };

        const tokenPayload = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        };

        const token = generateToken(tokenPayload);

        res
            .cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "Lax",
                maxAge: 1 * 60 * 60 * 1000
            })
            .status(200)
            .json({ message: "Login successful.", user: tokenPayload });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error." });
    };
};

export const me = (req, res) => {
    res.status(200).json({ user: req.user });
};

export const logout = (req, res) => {
    res
        .clearCookie("token", {
            httpOnly: true,
            secure: false, 
            sameSite: "Lax"
        })
        .status(200)
        .json({ message: "You came out successfully." });
};