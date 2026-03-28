import express from "express";
import { addFeedback, getFeedback } from "../controllers/FeedbackController.js";

const router = express.Router();

router.post("/add", addFeedback);

router.get("/all", getFeedback);

export default router;