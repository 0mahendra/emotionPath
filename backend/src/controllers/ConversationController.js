import Conversation from "../models/ConversationModel.js";
import User from "../models/UserModel.js";
import { assignNextGuest } from "../services/ConversationServices.js";
import Feedback from "../models/FeedbackModel.js";

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
        const fiveMinutesAgo = new Date(Date.now() - 5*60*1000);
        const waitingGuests = await Conversation.find({
                            status:"waiting",
                            lastActive:{ $gte: fiveMinutesAgo }
                        }).sort({createdAt:1}).limit(1)

          
        if(!waitingGuests ) {
            return res.status(404).json({
                success: false,
                message: "No waiting guests found"
            });
        }
        console.log(waitingGuests);
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

export const GuestTimeLeft = async (req ,res) => {
    try {
        const {conversationId} = req.params;
        const convo = await Conversation.findById(conversationId)
        const start = new Date(convo.startedAt).getTime()
        const now = Date.now()

        const minutesUsed = (now-start)/60000

        const timeLeft = convo.chatLimit - minutesUsed
          if(timeLeft <= 0){
             return res.json({expired:true})
            }
         res.json({
            expired:false,
            timeLeft:Math.floor(timeLeft)
        })

    }catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message: "Server error"
        });
    }
};

export const getStatsOfUser = async (req , res) => {
    try {
        const totalVisitors = await Conversation.countDocuments();
        const leftWithoutChat = await Conversation.countDocuments({status:"waiting"});
        const signedUser  = await User.countDocuments();

        const likedChats = await Feedback.countDocuments({reaction:"like"});
        const dislikedChats = await Feedback.countDocuments({reaction:"dislike"});

        res.status(200).json({
            totalVisitors,
            leftWithoutChat,
            signedUser,
            likedChats,
            dislikedChats
        });


    }catch (err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
};
