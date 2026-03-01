import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes.js';
import GuestRoutes from './routes/GuestRoutes.js';
import ConversationRoutes from './routes/ConversationRoutes.js';
// import adminRoutes from './routes/AdminRoutes.js';
import MessageRoutes from "./routes/MessageRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());



// Sample route
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api/chat', chatRoutes);
app.use('/api/guest', GuestRoutes);
// app.use("/api/admin", adminRoutes);
app.use("/api/admin", chatRoutes);
app.use("/api/conversation", ConversationRoutes);
app.use("/api/message" , MessageRoutes);

export default app;  