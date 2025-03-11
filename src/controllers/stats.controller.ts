import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user.model';

const userModel = new UserModel();

export const getUserStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await userModel.getUserStats();
    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};
