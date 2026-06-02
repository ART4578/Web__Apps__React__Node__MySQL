import { v4 as uuidv4 } from "uuid";
import { generateAccessToken } from "../utils/jwt.js";
import registerValidator from "../validators/registerValidator.js";
import loginValidator from "../validators/loginValidator.js";
import { findUserByEmail, createUsers } from "../models/userModel.js";
import { hashPassword, verifyPassword } from "../utils/hashPassword.js";
import setAuthCookies from "../utils/cookies.js";
import clearCookies from "../utils/clearCookies.js";

export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = registerValidator.parse(req.body);

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        };

        const hashedPassword = await hashPassword(password);
        const id = uuidv4();

        await createUsers({
            id,
            first_name,
            last_name,
            email,
            password: hashedPassword
        });

        const user = { id, first_name, last_name, email };

        const token = generateAccessToken(user);

        setAuthCookies(res, token);

        return res.status(201).json({
            message: "Registration successful",
            user
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server Error"
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = loginValidator.parse(req.body);

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        };

        const validPass = await verifyPassword(password, user.password);

        if (!validPass) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        };

        const tokenPayload = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        };

        const token = generateAccessToken(tokenPayload);

        setAuthCookies(res, token);

        return res.status(200).json({
            message: "Login successful",
            user: tokenPayload
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server Error"
        });
    };
};

export const me = (req, res) => {
    try {
        return res.status(200).json({
            user: req.user
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server Error"
        });
    };
};

export const logout = (req, res) => {
    try {
        clearCookies(res);

        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Logout failed"
        });
    };
};