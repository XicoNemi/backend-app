import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user.model';
import { ReviewModel } from '../models/review.model';
import { SubscriptionModel } from '../models/subscription.model';

const userModel = new UserModel();
const reviewModel = new ReviewModel();
const subscriptionModel = new SubscriptionModel();

export const getUserStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await userModel.getUserStats();
    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};

export const getAverageRating = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await reviewModel.getAverageRating();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export const getTotalClientsdByPlan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await subscriptionModel.getTotalClientsByPlan();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};