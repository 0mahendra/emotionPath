import dotenv from "dotenv";
dotenv.config();
import app from './app.js';
import connectDB from './config/db.js';
import {Server} from "socket.io";
import Conversation from "./models/ConversationModel.js";

connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT , ()=> {
    console.log(`Server is running on port ${PORT}`)
})

const io = new Server(server , {
    cors : {
        origin : "https://emotionpath.netlify.app",
        methods : ["GET" , "POST" , "PATCH"]
    }
});


app.set("io", io);

io.on("connection" , (socket)=> {
    console.log("New client connected: " + socket.id);

    socket.on("joinConversation", (conversationId) => {
  socket.join(conversationId);
});
    
    socket.on("sendMessage" , (data)=> {
        io.to(data.conversationId).emit("receiveMessage" , data);
    });

    socket.on("heartbeat", async() => {
        console.log("Heartbeat received from conversation: " + socket.conversationId);
        await Conversation.findByIdAndUpdate(socket.conversationId, { lastActive: new Date() });
    });

    socket.on("timeleft", (data) => {
        console.log("Time left for conversation " + data.conversationId + ": " + data.timeLeft);
        io.to(data.conversationId).emit("timeLeft", data.timeLeft);
    });




    socket.on("endChat", (conversationId) => {
        io.to(conversationId).emit("chatEnded");
    });

    socket.on("disconnect",async ()=>{

      const conversationId = socket.conversationId

        if(!conversationId) return

            await Conversation.findByIdAndUpdate(conversationId,{
              status:"ended"
                })
        io.to(conversationId).emit("chatEnded")

          console.log("Client disconnected: " + socket.id);});
})