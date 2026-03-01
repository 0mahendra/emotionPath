// import express from 'express';

// import  {assignCounsellorToGuest}  from '../services/QueueServices.js';

// const router = express.Router();

// router.post('/assign', async (req ,res ) => {
//     const convo = await assignCounsellorToGuest();

//     if(!convo ){
//         return res.status(404).json({ message: 'No waiting guest found' });
//     }

//      res.json({
//     message: "Counsellor assigned",
//     conversationId: convo._id,
//     status: convo.status,
//   });
// });

// export default router;
import { assignNextGuest } from "../services/conversationService.js";

export const assignNext = async (req, res) => {
  const conversation = await assignNextGuest();

  if (!conversation) {
    return res.json({
      success: false,
      message: "No guest or counsellor available"
    });
  }

  res.json({
    success: true,
    conversationId: conversation._id
  });
};
