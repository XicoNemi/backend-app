import { Request, Response, NextFunction } from 'express';
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
  const token =
    authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    console.log(token);
    
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const payload = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as Payload;
    // req.userId = payload.userId; // para despues
    return next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};
