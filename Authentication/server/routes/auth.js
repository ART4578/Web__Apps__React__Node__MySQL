import express from "express";
import {
    home,
    verifyUser,
    register,
    login,
    logout
} from "../controllers/auth.js";

const router = express.Router();

router.get("/", verifyUser, home);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

export default router;