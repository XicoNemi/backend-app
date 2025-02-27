import { Request, Response } from "express";
import { UserHasRouteModel } from "../models/userHasRoute.model";

const userHasRoutesModel = new UserHasRouteModel();

const getAllUserHasRoutes = async (req: Request, res: Response) => {
    const data = await userHasRoutesModel.getAll();
    res.status(200).json(data);
};

const getUserHasRoutesById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await userHasRoutesModel.getById(Number(id));
    res.status(200).json(data);
};

const createUserHasRoutes = async (req: Request, res: Response) => {
    const newData = await userHasRoutesModel.create(req.body);
    res.status(201).json(newData);
};

const updateUserHasRoutes = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = await userHasRoutesModel.update(Number(id), req.body);
    res.status(200).json(updatedData);
};

const deleteUserHasRoutes = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedData = await userHasRoutesModel.delete(Number(id));
    res.status(200).json(deletedData);
};

export {
    getAllUserHasRoutes,
    getUserHasRoutesById,
    createUserHasRoutes,
    updateUserHasRoutes,
    deleteUserHasRoutes
};
