import express from "express";
import { register, login, me, logout } from "../controllers/authController.js";
import registerLimiterMiddleware from "../middlewares/registerLimiterMiddleware.js";
import loginLimiterMiddleware from "../middlewares/loginLimiterMiddleware.js";
import csrfProtectionMiddleware from "../middlewares/csrfProtectionMiddleware.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerLimiterMiddleware, csrfProtectionMiddleware, register);
router.post("/login", loginLimiterMiddleware, csrfProtectionMiddleware, login);
router.get("/me", verifyToken, me);
router.post("/logout", verifyToken, csrfProtectionMiddleware, logout);

export default router;