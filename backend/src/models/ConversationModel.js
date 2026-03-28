import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    counsellorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    isGuest: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ["waiting", "active", "ended", "expired"],
      default: "waiting",
    },

    guestMeta: {
      name: String,
      sessionId: String,
    },

    createdAt:{
    type:Date,
    default:Date.now
  },

  lastActive:{
    type:Date,
    default:Date.now
  },
   startedAt:Date,

   chatLimit:{
    type:Number,
     default:10
   },

    endReason: {
      type: String,
      enum: ["timer", "counsellor", "guest"],
    }
  },

  { timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);
