import transporter from "../config/mailer.js";
import dotenv from "dotenv";

dotenv.config();

const { MAIL_USER, RECEIVER_MAIL } = process.env;

export const sendFeedback = async (req, res) => {
    try {
        const { firstName, lastName, email, message } = req.body;

        if (!firstName || !lastName || !email || !message) {
            return res.status(400).json({ message: "All fields are required." });
        };

        const mailOptions = {
            from: MAIL_USER,
            to: RECEIVER_MAIL,
            subject: "New message",
            html: `
                <h2>New Message</h2>
                <p><strong>First Name:</strong> ${firstName}</p>
                <p><strong>Last Name:</strong> ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Message sent." });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error." });
    };
};