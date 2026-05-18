import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const { MAIL_USER, MAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD
    },
});

export default transporter;