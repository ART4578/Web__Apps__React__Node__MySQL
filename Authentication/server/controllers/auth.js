import db from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";

//middelware verify user
export const verifyUser = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json({Error: "You are not authenticated"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({Error: "Token is not okey"});
            } else {
                req.name = decoded.name;
                next();
            }
        });
    }
};

//home
export const home = (req, res) => {
    return res.json({Status: "Success", name: req.name});
};

//register user
export const register = (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";

    const salt = 10;

    bcrypt.hash(req.body.password.toString(), salt, (error, hash) => {
        if (error) {
            return res.json({Error: "Error for hassing password"});
        } else {
            const values = [
                req.body.name,
                req.body.email,
                hash
            ];

            db.query(sql, [values], (err, result) => {
                if (err) {
                    return res.json({Error: "Inserting data Error in server"});
                } else {
                    return res.json({Status: "Success"});
                }
            });
        }
    });
};

//login user
export const login = (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ?";

    db.query(sql, [req.body.email], (err, data) => {
        if (err) {
            return res.json({Error: "Login error in server"});
        } 
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) {
                    return res.json({Error: "Password compare error"});
                }
                if (response) {
                    const name = data[0].name;
                    const token = jwt.sign({ name }, "jwt-secret-key", { expiresIn: '1d' });
                    res.cookie('token', token);
                    return res.json({Status: "Success"});
                } else {
                    return res.json({Error: "Password not matched"});
                }
            });
        } else {
            return res.json({Error: "No email existed"});
        }
    }); 
};

//logout user
export const logout = (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
}; 