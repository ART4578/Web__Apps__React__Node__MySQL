import express from "express";
import csrfProtectionMiddleware from "../middleware/csrfProtectionMiddleware.js";
import getCsrfToken from "../controllers/csrfController.js";

const router = express.Router();

router.get("/csrf-token", csrfProtectionMiddleware, getCsrfToken);

export default router;