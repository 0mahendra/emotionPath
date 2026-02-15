import { endConversation } from "../services/ConversationServices.js";

export const endChat  = async (req ,res )=> {
    const {conversationId , endedBy} = req.body;

    const result = await endConversation(conversationId , endedBy);

    if(!result){
        return res.status(400).json({
      success: false,
      message: "Conversation not active or not found"
    });
     }
     
      res.json({
    success: true,
    message: "Chat ended successfully"
  });
};
