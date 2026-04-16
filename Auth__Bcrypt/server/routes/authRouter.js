import express from "express";
import { register, login, me, logout } from "../controllers/authController.js";
import verifyToken from "../middleware/authMiddleware.js";
import registerLimiter from "../middleware/registerLimiter.js";
import loginLimiter from "../middleware/loginLimiter.js";

const router = express.Router();

router.post("/register", registerLimiter, register);
router.post("/login", loginLimiter, login);
router.get("/me", verifyToken, me);
router.post("/logout", logout);

export default router;