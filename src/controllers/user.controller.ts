import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
const userModel = new UserModel();

const getAllUsers = async (req: Request, res: Response) => {
    const users = await userModel.getAllUsers()
    res.json(users).status(200);
}

const getUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = await userModel.getUser(id);
    res.json(user).status(200);
}

const createUser = async (req: Request, res: Response) => {
    const user = await userModel.createUser(req.body);
    res.json(user).status(201);
}

const updateUser = async (req:Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = await userModel.updateUser(id, req.body);
    res.json(user).status(200);
}

const deleteUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = await userModel.deleteUser(id);
    res.json(user).status(200);
}

const newTypeUser = async (req: Request, res: Response) => {
    const typeUser = await userModel.newTypeUser(req.body);
    res.json(typeUser).status(201);
}

const activeAccount = async (req: Request, res: Response) => {
    const token = req.params.token;
    const user = await userModel.activeAccount(token);
    res.json(user).status(200);
}


export { 
    getAllUsers,
    createUser, 
    newTypeUser, 
    updateUser, 
    deleteUser, 
    getUser, 
    activeAccount
};