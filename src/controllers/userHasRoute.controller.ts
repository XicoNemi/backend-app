import { Request, Response, NextFunction } from 'express';
import { UserHasRouteModel } from '../models/userHasRoute.model';
import { AppError } from '../utils/errorApp';
import { validate as isUUID } from 'uuid';

const userHasRoutesModel = new UserHasRouteModel();

const getAllUserHasRoutes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await userHasRoutesModel.getAll();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getUserHasRoutesById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) throw new AppError('Invalid UUID format', 400);
    const data = await userHasRoutesModel.getById(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const createUserHasRoutes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newData = await userHasRoutesModel.create(req.body);
    res.status(201).json(newData);
  } catch (error) {
    next(error);
  }
};

const updateUserHasRoutes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) throw new AppError('Invalid UUID format', 400);
    const updatedData = await userHasRoutesModel.update(id, req.body);
    res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};

const deleteUserHasRoutes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) throw new AppError('Invalid UUID format', 400);
    const deletedData = await userHasRoutesModel.delete(id);
    res.status(200).json(deletedData);
  } catch (error) {
    next(error);
  }
};

export {
  getAllUserHasRoutes,
  getUserHasRoutesById,
  createUserHasRoutes,
  updateUserHasRoutes,
  deleteUserHasRoutes,
};
