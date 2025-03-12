// common/auth.controller.ts
import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../../models/user.model';
import { generateToken } from '../../services/auth.service';
import { comparePassword, hashPassword } from '../../utils/bcrypt';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../../utils/errorApp';

const userModel = new UserModel();
// const prisma = new PrismaClient();

export const signInCommon = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.body.email || !req.body.password) {
      return next(new AppError('Email and password are required', 400));
    }
    const { email, password } = req.body;

    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    // if (user.type !== 'Common') {
    //   return next(new AppError('Access denied. You are not authorized.', 403));
    // }

    const isPasswordValid: boolean = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return next(new AppError('Wrong password or email', 400));
    }

    const token = generateToken(user);
    user.password = '';

    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};