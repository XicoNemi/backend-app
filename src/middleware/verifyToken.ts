import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errorApp';
import jwt from 'jsonwebtoken';

interface Payload {
  userId: number;
  email: string;
  type: string;
  iat: number;
  exp: number;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  
  const authHeader = req.header('Authorization');
  // console.log(authHeader);
  const token =
    authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return next(new AppError('No token provided', 401));
  }

  try {
    const payload = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as Payload;

    // req.userId = payload.userId; // para después si lo necesitas
    return next();
  } catch (error) {
    return next(new AppError('Invalid token', 401));
  }
};
