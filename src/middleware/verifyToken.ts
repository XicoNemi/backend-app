import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errorApp';

// Verificar si el token esta en la lista
import { isTokenBlacklisted } from './tokenBlacklist';
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

interface Payload {
  userId: string;
  email: string;
  type: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: Payload;
    }
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.header('Authorization');
  const token =
    authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return next(new AppError('No token provided', 401));
  }

  // ! Verificar si el token esta en la lista
  if (await isTokenBlacklisted(token)) {
    return next(new AppError('Token has been revoked', 401));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET as string) as Payload;

    req.user = payload;
    next();
  } catch (error) {
    return next(new AppError('Invalid token', 401));
  }
};
