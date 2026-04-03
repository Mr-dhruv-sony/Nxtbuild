import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import { errorHandler } from './middleware/error.middleware.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://nxtbuild-mu.vercel.app',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

export default app;