import express from 'express';
import { getConversationStatus } from '../controllers/ConversationController.js';

const router = express.Router();

router.get("/:id", getConversationStatus);

export default router;