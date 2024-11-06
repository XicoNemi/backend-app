import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface Payload {
  userId: number;
  iat: number;
  exp: number;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('auth-token');

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
  }

  try {
    const payload = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as Payload;
    req.userId = payload.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
