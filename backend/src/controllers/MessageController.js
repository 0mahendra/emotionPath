import MessageModel from "../models/MessageModel.js";

export const sendMessage = async(req, res)=> {
    try {
    const { conversationId , senderId , senderRole , text} = req.body;
    console.log("called");
    if(!conversationId || !senderId || !senderRole || !text) {
        console.log("error");
        return res.status(400).json({message : "All fields are required"});
    }

     const message = await MessageModel.create({
         conversationId,
         senderId,
         senderRole,
         text,
       });

       res.status(201).json(message);
   }catch (err){
      console.log(err);
      res.status(500).json({ message: "Server Error" });
   }

} 

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await MessageModel.find({ conversationId })
      .sort({ createdAt: 1 });

    res.json(messages);

  } catch (error) {
    console.error("Get Messages Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};