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
