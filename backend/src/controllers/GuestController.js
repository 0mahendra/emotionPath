import Conversation from "../models/ConversationModel.js";
import { assignNextGuest } from "../services/ConversationServices.js";
 export  const startGuestChat =  async (req , res) => {
    try {
       const {name  , sessionId} = req.body;
       
       const conversation = await Conversation.create({
        isGuest :true,
        status : 'waiting',
        guestMeta : {
            name:name || 'Guest',
            sessionId
        },
    });
     
    await assignNextGuest();

    const io = req.app.get("io");

    io.emit("newGuestWaiting");

    return res.status(201).json({
          success: true,
      conversationId: conversation._id,
      status: conversation.status,
    });

    }catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to start guest chat",
    });
  }



};

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

