import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({

    stars : {
        type : Number ,
        required :true,
        min :1,
        max :5
    },

    reaction : {
        type : String,
        enum : ["like" , "dislike"]
    },

    text : {
        type : String,
        default : ""
    }
},
 {timestamps : true}
);

export default mongoose.model("Feedback", feedbackSchema);
