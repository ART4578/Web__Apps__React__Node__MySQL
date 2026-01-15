import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import db from "../db.js";

dotenv.config();

const generateToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const register = (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: "Խնդրում ենք լրացնել բոլոր դաշտերը" });
    };
        
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";

    db.query(checkUserQuery, [email], (err, results) => {
        if (err) return res.status(500).json({ message: "Սերվերի սխալ" });

        if (results.length > 0) {
            return res.status(409).json({ message: "Այս էլ․ հասցեն արդեն օգտագործվում է" });
        };

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return res.status(500).json({ message: "Գաղտնաբառի հեշավորման սխալ" });

            const insertUserQuery = "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";

            db.query(insertUserQuery, [first_name, last_name, email, hashedPassword], (err, result) => {
                if (err) return res.status(500).json({ message: "Օգտատիրոջ ստեղծման սխալ" });

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
                    .json({ message: "Գրանցումը հաջողվեց", user });
            });
        });
    });
};

export const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Խնդրում ենք լրացնել բոլոր դաշտերը" });
    };

    const getUserQuery = "SELECT * FROM users WHERE email = ?";

    db.query(getUserQuery, [email], async (err, users) => {
        if (err) return res.status(500).json({ message: "Սերվերի սխալ" });

        if (users.length === 0) {
            return res.status(401).json({ message: "Օգտատերը չի գտնվել" });
        };

        const validPass = await bcrypt.compare(password, users[0].password);

        if (!validPass) {
            return res.status(401).json({ message: "Սխալ էլ․ հասցե կամ գաղտնաբառ" });
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
            .json({ message: "Մուտքը հաջողվեց", user: tokenPayload });
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
        .json({ message: "Դուրս եկաք հաջողությամբ" });
};