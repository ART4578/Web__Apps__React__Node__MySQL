import express from "express";
import { sendFeedback } from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/send-email", sendFeedback);

export default router;