import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './infraestructure/config/db';
import { errorHandler, notFound } from './infraestructure/middlewares/error.middleware';
import { userRoutes } from './infraestructure/router/user.routes';

dotenv.config();
connectDB();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;