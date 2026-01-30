import {Router} from 'express';
import { sendMessage } from '../controllers/chatController';

const router = Router();


router.post('/send' , sendMessage);

export default router;