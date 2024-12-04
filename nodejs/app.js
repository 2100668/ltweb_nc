import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/AuthRoutes.js';
import newsRoutes from './routes/NewsRouter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', newsRoutes);

// Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
