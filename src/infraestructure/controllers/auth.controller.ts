import { NextFunction, Request, Response } from 'express';
import {
  loginUserService,
  registerUserService,
} from '../services/auth.service';
import { authService } from '../../core/useCases/auth';
import { HttpError } from '../errors/httpError';

export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authData = req.body;
  const login = authService.makeLoginUser(loginUserService);

  try {
    const data = await login(authData);
    res.status(200).send(data);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const registerData = req.body;
  const register = authService.makeRegisterUser(registerUserService);

  try {
    const data = await register(registerData);
    res.status(201).send(data);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};
