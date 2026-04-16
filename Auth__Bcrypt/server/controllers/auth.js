import bcrypt from "bcrypt";
import dotenv from "dotenv";
import db from "../db.js";
import { generateToken } from "../utils/generateToken.js";

dotenv.config();

export const register = (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: "Please fill in all fields." });
    };
        
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";

    db.query(checkUserQuery, [email], (err, results) => {
        if (err) return res.status(500).json({ message: "Server error." });

        if (results.length > 0) {
            return res.status(409).json({ message: "This email address is already in use." });
        };

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return res.status(500).json({ message: "Password hash error." });

            const insertUserQuery = "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";

            db.query(insertUserQuery, [first_name, last_name, email, hashedPassword], (err, result) => {
                if (err) return res.status(500).json({ message: "User creation error." });

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
            });
        });
    });
};

export const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please fill in all fields." });
    };

    const getUserQuery = "SELECT * FROM users WHERE email = ?";

    db.query(getUserQuery, [email], async (err, users) => {
        if (err) return res.status(500).json({ message: "Server error." });

        if (users.length === 0) {
            return res.status(401).json({ message: "User not found." });
        };

        const validPass = await bcrypt.compare(password, users[0].password);

        if (!validPass) {
            return res.status(401).json({ message: "Invalid email address or password." });
        };

        const tokenPayload = {
            id: users[0].id,
            first_name: users[0].first_name,
            last_name: users[0].last_name,
            email: users[0].email
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
    });
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
        .json({ message: "Signed out successfully." });
};