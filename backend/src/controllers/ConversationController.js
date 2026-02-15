import Conversation from "../models/ConversationModel.js";

export const getConversationStatus = async (req ,res) => {
    try {
        const {id} =req.params;
    const convo = await Conversation.findById(id);

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

}