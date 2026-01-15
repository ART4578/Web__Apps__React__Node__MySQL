import express from "express";
import { register, login, me, logout } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { registerValidator, loginValidator } from "../validators/authValidator.js";
import csrfProtection from "../middleware/csrfProtection.js";
import { loginLimiter, registerLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/register", csrfProtection, registerValidator, registerLimiter, register);
router.post("/login", csrfProtection, loginValidator, loginLimiter, login);
router.get("/me", verifyToken, me);
router.post("/logout", csrfProtection, logout);

export default router;