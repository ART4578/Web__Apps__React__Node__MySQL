import express from "express";
import { register, login, me, logout } from "../controllers/authController.js";
import verifyToken from "../middleware/authMiddleware.js";
import { registerValidator, loginValidator } from "../validators/authValidator.js";
import csrfProtectionMiddleware from "../middleware/csrfProtectionMiddleware.js";
import { registerLimiterMiddleware, loginLimiterMiddleware } from "../middleware/rateLimiterMiddleware.js";

const router = express.Router();

router.post("/register", registerLimiterMiddleware, csrfProtectionMiddleware, registerValidator, register);
router.post("/login", loginLimiterMiddleware, csrfProtectionMiddleware, loginValidator, login);
router.get("/me", verifyToken, me);
router.post("/logout", verifyToken, csrfProtectionMiddleware, logout);

export default router;