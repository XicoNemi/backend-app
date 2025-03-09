import e, { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user.model';
import { AppError } from '../utils/errorApp';
import { validate as isUUID } from 'uuid';
const userModel = new UserModel();

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (!isUUID(id)) throw new AppError('Invalid UUID format', 400);
    const user = await userModel.getUser(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.createUser(req.body);
    res.status(201).json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error', error: 'Unknown error' });
    }
  }
};

const createUserBySuperAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.createUserBySuperAdmin(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (!isUUID(id)) throw new AppError('Invalid UUID format', 400);

    const user = await userModel.updateUser(id, req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const partialUpdateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new AppError('ID is not a number', 400);

    const user = await userModel.partialUpdateUser(id, req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const user = await userModel.deleteUser(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const activeAccount = async (req: Request, res: Response) => {
  const token = req.params.token;
  const user = await userModel.activeAccount(token);
  res.json(user).status(200);
};

export {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  activeAccount,
  partialUpdateUser,
  createUserBySuperAdmin,
};
