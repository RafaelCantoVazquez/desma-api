import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './infraestructure/config/db';
import {
  errorHandler,
  notFound,
} from './infraestructure/middlewares/error.middleware';
import { userRoutes } from './infraestructure/router/user.routes';
import { fontsRoutes } from './infraestructure/router/fonts.routes';
import { spacingsRoutes } from './infraestructure/router/spacings.routes';
import { paletteRoutes } from './infraestructure/router/palette.routes';
import { designSystemRoutes } from './infraestructure/router/designSystem.routes';

dotenv.config();
connectDB();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/fonts', fontsRoutes);
app.use('/api/spacings', spacingsRoutes);
app.use('/api/palette', paletteRoutes);
app.use('/api/design-system', designSystemRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
