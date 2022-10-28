import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';
import { errorHandler, notFound } from './middlewares/error.middleware';
import { userRoutes } from './routes/user.routes';

dotenv.config();
connectDB();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;