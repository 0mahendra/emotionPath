import express from "express";
import { getMessages , sendMessage } from "../controllers/MessageController.js";
const router = express.Router();

router.post("/send", sendMessage);
router.get("/:conversationId", getMessages);

export default router;