import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes.js';
const app = express();

app.use(cors());
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api/chat', chatRoutes);

export default app;