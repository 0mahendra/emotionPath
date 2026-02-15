import Conversation from "../models/ConversationModel.js";
import { getAvailableCounsellor } from "./CounsellorServices.js";

import User from "../models/UserModel.js";

export const assignNextGuest = async () => {
  const counsellor = await getAvailableCounsellor();
  if (!counsellor) return null;

  const conversation = await Conversation.findOne({
    isGuest: true,
    status: "waiting"
  }).sort({ createdAt: 1 });

  if (!conversation) return null;

  conversation.status = "active";
  conversation.counsellorId = counsellor._id;
  conversation.startedAt = new Date();

  await conversation.save();
  return conversation;
};

export const endConversation = async (conversationId, endedBy) => {
   const convo = await Conversation.findById(conversationId);

   if(!convo || convo.status !== "active") return null;

   convo.status = "ended";
   convo.endedAt = new Date();
   convo.endReason = endedBy;

   if(convo.counsellorId) {

    const counsellor = await User.findById(convo.counsellorId);
     if (counsellor) {
      counsellor.isAvailable = true;
      await counsellor.save();
    }
   }

   await convo.save();

   return convo;
}

