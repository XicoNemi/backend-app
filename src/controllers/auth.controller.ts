// auth.controller.ts
import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { generateToken } from '../services/auth.service';
import { comparePassword } from '../utils/bcrypt';

const userModel = new UserModel();


export const singUp = async (req: Request, res: Response) => {
    // ? save a new user
    const user = await userModel.createUser(req.body);  
    // ? generate token
    const token: string = generateToken(user.id as number);

    res.header("token", token).json(user).status(201);
};

export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    // ? verify user
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      res.status(404).json({ message: "User not found" });  // ! user not found
      return
    }
  
    // ? verify password
    const isPasswordValid: boolean = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Wrong password or email" });  // ! wrong password
    }
  
    const token = await generateToken(user.id);  
    user.password = "";
    res.header("auth-token", token).json(user).status(200);
  };