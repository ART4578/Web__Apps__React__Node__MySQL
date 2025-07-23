import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import db from "../db.js";

dotenv.config();

export const register = (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: "Խնդրում ենք լրացնել բոլոր դաշտերը" });
    };
        
    const sqlEmail = "SELECT * FROM users WHERE email = ?";

    db.query(sqlEmail, [email], (err, results) => {
        if (err) return res.status(500).json({ message: "Սերվերի սխալ" });

        if (results.length > 0) {
            return res.status(409).json({ message: "Այս էլ․ հասցեն արդեն օգտագործվում է" });
        };

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return res.status(500).json({ message: "Գաղտնաբառը գաղտնագրելիս խնդիր եղավ" });

            const sqlInsert = "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";

            db.query(sqlInsert, [first_name, last_name, email, hashedPassword], (err, result) => {
                if (err) return res.status(500).json({ message: "Օգտագործողին ավելացնելիս խնդիր եղավ" });

                const user = { id: result.insertId, email };
                const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

                res
                    .cookie("token", token, {
                        httpOnly: true,
                        secure: false,
                        sameSite: "Lax",
                        maxAge: 1 * 60 * 60 * 1000
                    })
                    .status(201)
                    .json({ message: "Գրանցումը հաջողված է", user });
            });
        });
    });
};

export const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Խնդրում ենք լրացնել բոլոր դաշտերը" });
    };

    const sqlEmail = "SELECT * FROM users WHERE email = ?";

    db.query(sqlEmail, [email], async (err, users) => {
        if (err) return res.status(500).json({ msg: "Սերվերի սխալ" });

        if (users.length === 0) {
            return res.status(401).json({ msg: "Օգտատերը չի գտնվել" });
        };

        const validPass = await bcrypt.compare(password, users[0].password);

        if (!validPass) {
            return res.status(401).json({ msg: "Սխալ մուտքային տվյալներ" });
        };

        const token = jwt.sign(
            { id: users[0].id, first_name: users[0].first_name, last_name: users[0].last_name },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res
            .cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "Lax",
                maxAge: 1 * 60 * 60 * 1000
            })
            .status(200)
            .json({ msg: "Մուտքը հաջողվեց" });
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