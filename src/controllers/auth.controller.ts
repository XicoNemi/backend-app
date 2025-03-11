// auth.controller.ts
import e, { NextFunction, Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { UserModel } from '../models/user.model';
import { generateToken } from '../services/auth.service';
import { comparePassword, hashPassword } from '../utils/bcrypt';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/errorApp';
import { validate as IsUUID } from 'uuid';
import axios from 'axios';

const userModel = new UserModel();
const prisma = new PrismaClient();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT);

export const facebookAuth = async (req: Request, res: Response): Promise<void> => {
  const { accessToken } = req.body;

  try {
    const response = await axios.get(
      `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email`
    );

    const { email, name, id } = response.data;

    if (!email) {
      res.status(400).json({ error: 'Facebook authentication failed' });
      return;
    }
    let user = await userModel.getUserByEmail(email);
    if (!user) {
      user = await prisma.users.create({
        data: {
          // idFacebook: id,
          name,
          lastname: '',
          email,
          password: '',
          tel: '',
          birthday: 0,
          type: 'Common',
          status: true,
          token: null,
        },
      });
    } else {
      await prisma.users.update({
        where: { email },
        data: { status: true },
      });
    }

    const token = generateToken(user.id);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error with Facebook authentication' });
  }
};

export const googleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { tokenId } = req.body;
  console.log(req.body);
  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return next(new AppError('Google authentication failed', 400));
    }

    const superAdmin = await prisma.users.findFirst({
      where: { type: 'SuperAdmin' },
    });

    if (!superAdmin) {
      return next(new AppError('SuperAdmin not found', 404));
    }

    if (payload.email !== superAdmin.email) {
      return next(new AppError('Access denied. You are not an admin.', 403));
    }

    const user = await userModel.getUserByEmail(superAdmin.email);
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    const token = generateToken(user);
    user.password = '';

    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    next(new AppError('Error with Google authentication', 500));
  }
};

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: Function
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

export const deleteUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.params.email;
    const user = await userModel.deleteByEmail(email);
    res.json(user).status(200);
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword, repeatPassword } = req.body;

    if (!IsUUID(id)) throw new AppError('Invalid UUID format', 400);

    if (!oldPassword || !newPassword || !repeatPassword) {
      throw new AppError(
        'All fields (oldPassword, newPassword, repeatPassword) are required',
        400
      );
    }

    if (newPassword !== repeatPassword) {
      throw new AppError('New passwords do not match', 400);
    }

    if (newPassword.length < 9) {
      throw new AppError('New password must be at least 8 characters long', 400);
    }

    const user = await userModel.getUser(id);
    if (!user) throw new AppError('User not found', 404);

    const isPasswordValid: boolean = await comparePassword(oldPassword, user.password);
    if (!isPasswordValid) throw new AppError('Wrong password', 400);

    const hashedPassword = await hashPassword(newPassword);
    console.log(newPassword, oldPassword);
    
    await userModel.updatePassword(id, hashedPassword);

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    next(error);
  }
};
