import Conversation from "../models/ConversationModel.js";

export const startGuestTimer = async (conversationId) => {
    setTimeout(async () => {
      const convo = await Conversation.findById(conversationId);

    if (!convo || convo.status !== "active") return;

    convo.status = "closed";
    convo.endedAt = new Date();
    convo.endReason = "timer";

    await convo.save();
    } , 15 * 60 * 1000); // 15 min
    

};