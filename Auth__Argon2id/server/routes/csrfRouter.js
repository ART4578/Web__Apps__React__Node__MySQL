import express from "express";
import csrfProtection from "../middleware/csrfProtection.js";
import getCsrfToken from "../controllers/csrfController.js";

const router = express.Router();

router.get("/csrf-token", csrfProtection, getCsrfToken);

export default router;