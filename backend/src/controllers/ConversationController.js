import Conversation from "../models/ConversationModel.js";
import { assignNextGuest } from "../services/ConversationServices.js";

export const getConversationStatus = async (req ,res) => {
    try {
        const {id} =req.params;
     const convo = await Conversation.findById(id);
        await assignNextGuest();
    if(!convo) {
          return res.status(404).json({
        success: false,
        message: "Conversation not found"
      });
    }
     return res.status(200).json({
      success: true,
      status: convo.status
    });
    }catch(err) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Server Error"
        });
    }

};

export const getWaitingGuests = async (req , res ) => {
    try {
        const waitingGuests = await Conversation.findOne({
            isGuest: true,
            status: "waiting"
          }).sort({ createdAt: 1 });
        
        if(!waitingGuests ) {
            return res.status(404).json({
                success: false,
                message: "No waiting guests found"
            });
        }
        res.json({
            success: true,
            guests: waitingGuests
        });
    }catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const AccpectChat = async (req ,res) => {
    try {
    const {conversationId} = req.params;

    const convo = await Conversation.findById(conversationId);

     convo.status = "active";
     convo.startedAt = new Date();
       await convo.save();

       const io = req.app.get("io");

       io.to(conversationId).emit("conversationActivated");
       res.json({
        success: true,
        message: "Chat accepted"
       });
    }catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}
