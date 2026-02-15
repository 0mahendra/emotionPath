import express from 'express';

import  {startGuestChat}  from '../controllers/GuestController.js';

const router = express.Router();

router.post('/start', startGuestChat);

export default router;
