import express from 'express';
import { AccpectChat, getConversationStatus, getStatsOfUser, getWaitingGuests, GuestTimeLeft } from '../controllers/ConversationController.js';
import { get } from 'mongoose';

const router = express.Router();
router.get("/waiting", getWaitingGuests);
router.get("/userStatus" , getStatsOfUser);
router.get("/:id", getConversationStatus);
router.post("/accept/:conversationId", AccpectChat);
router.get("/time-left/:conversationId", GuestTimeLeft);



export default router;