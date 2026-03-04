import dotenv from "dotenv";
dotenv.config();
import app from './app.js';
import connectDB from './config/db.js';
import {Server} from "socket.io";

connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT , ()=> {
    console.log(`Server is running on port ${PORT}`)
})

const io = new Server(server , {
    cors : {
        origin : "*",
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


    socket.on("endChat", (conversationId) => {
        io.to(conversationId).emit("chatEnded");
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
})