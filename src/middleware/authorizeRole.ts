import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errorApp';

export const authorizeRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.type)) {
      return next(new AppError('You are not authorized to access this route', 403));
    }
    next();
  };
};
