// auth.controller.ts
import { NextFunction, Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { UserModel } from '../models/user.model';
import { generateToken } from '../services/auth.service';
import { comparePassword } from '../utils/bcrypt';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/errorApp';
import axios from 'axios';

const userModel = new UserModel();
const prisma = new PrismaClient();

const client = new OAuth2Client(process.env.CLIENT_ID_ANDROID);

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
      user = await prisma.user.create({
        data: {
          // idFacebook: id,
          name,
          lastname: '',
          email,
          password: '',
          tel: '',
          birthday: 0,
          type: 'COMMON',
          active: true,
          token: null,
        },
      });
    } else {
      await prisma.user.update({
        where: { email },
        data: { active: true },
      });
    }

    const token = await generateToken(user.id as number);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error with Facebook authentication' });
  }
};

export const googleAuth = async (req: Request, res: Response): Promise<void> => {
  const { tokenId } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.CLIENT_ID_ANDROID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      res.status(400).json({ error: 'Google authentication failed' });
      return;
    }

    const token = await generateToken(11);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error with Google authentication' });
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

export const deleteUserByEmail = async (req: Request, res: Response) => {
  const email = req.params.email;
  const user = await userModel.deleteByEmail(email);
  res.json(user).status(200);
};
