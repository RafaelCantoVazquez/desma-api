import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export const generateToken = (id: Types.ObjectId) => {
  const JWT_SECRET: string = process.env.JWT_SECRET!;
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d',
  });
};
