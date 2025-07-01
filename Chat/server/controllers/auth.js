import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "../models/user.js";

export const register = (req, res) => {
    const { name, surname, email, password } = req.body;

    if (!name || !surname || !email || !password) {
        return res.status(400).json({ message: "Խնդրում ենք լրացնել բոլոր դաշտերը" });
    };

    findUserByEmail(email, async (err, results) => {
        if (err) return res.status(500).json({ message: "Սերվերի սխալ" });

        if (results.length > 0) {
            return res.status(409).json({ message: "Այս էլ․ հասցեն արդեն օգտագործվում է" });
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        createUser(name, surname, email, hashedPassword, (err, result) => {
            if (err) return res.status(500).json({ message: "Օգտագործողին ավելացնելիս խնդիր եղավ" });

            const user = { id: result.insertId, name, surname, email };
            const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "7d" });

            res
                .cookie("token", token, {
                    httpOnly: true,
                    secure: false, 
                    sameSite: "Strict",
                })
                .status(201)
                .json({ message: "Գրանցումը հաջողված է", user });
        });
    });
};

export const login = (req, res) => {
    const {email, password} = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: "Խնդրում ենք լրացնել բոլոր դաշտերը" });
    };

    findUserByEmail(email, async (err, results) => {
        if (err) return res.status(500).json({ message: "Սերվերի սխալ" });

        if (results.length === 0) {
            return res.status(401).json({ message: "Սխալ էլ․ հասցե կամ գաղտնաբառ" });
        };

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Սխալ էլ․ հասցե կամ գաղտնաբառ" });
        };

        const tokenPayload = {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "7d" });

        res
            .cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "Strict",
            })
            .status(200)
            .json({ message: "Մուտքը հաջողված է", user: tokenPayload });
    });    
};

export const getCurrent = (req, res) => {
    const user = req.user;
    res.status(200).json({ user });
};

export const logout = (req, res) => {
    res
        .clearCookie("token", {
            httpOnly: true,
            sameSite: "Strict",
            secure: false, 
        })
        .status(200)
        .json({ message: "Դուրս եկաք հաջողությամբ" });
};