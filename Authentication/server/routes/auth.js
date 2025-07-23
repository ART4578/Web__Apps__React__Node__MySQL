import express from "express";
import { register, login, me, logout } from "../controllers/auth.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, me);
router.post("/logout", logout);

export default router;