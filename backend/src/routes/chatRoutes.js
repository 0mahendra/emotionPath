import {Router} from 'express';
// import { sendMessage } from '../controllers/chatController';
// import AdminInsert from '../controllers/AdminInsert.js';
import  {assignNext}  from '../controllers/GuestController.js';
import { endChat } from '../controllers/chatController.js';
const router = Router();


// router.post('/admin' , AdminInsert);
router.post("/assign-next", assignNext);
router.patch("/end" , endChat);


export default router;