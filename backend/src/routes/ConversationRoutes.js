import express from 'express';
import { AccpectChat, getConversationStatus, getWaitingGuests } from '../controllers/ConversationController.js';

const router = express.Router();
router.get("/waiting", getWaitingGuests);
router.get("/:id", getConversationStatus);
router.post("/accept/:conversationId", AccpectChat);


export default router;