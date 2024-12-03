import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/AuthRoutes.js';
import newsRoutes from './routes/NewsRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000; // Sử dụng cổng 5000 nếu không có giá trị trong .env

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
