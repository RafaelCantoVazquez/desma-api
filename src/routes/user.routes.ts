import express, { Router } from 'express';
import { authUser, registerUser } from '../controllers/user.controller';

const router: Router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authUser);

export { router as userRoutes };
