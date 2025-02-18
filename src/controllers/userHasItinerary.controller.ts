import { Request, Response } from "express";
import { UserHasItineraryModel } from "../models/userHasItinerary.model";

const userHasItineraryModel = new UserHasItineraryModel();

const getAllUserHasItineraries = async (req: Request, res: Response) => {
    const data = await userHasItineraryModel.getAll();
    res.status(200).json(data);
};

const getUserHasItineraryById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await userHasItineraryModel.getById(Number(id));
    res.status(200).json(data);
};

const createUserHasItinerary = async (req: Request, res: Response) => {
    const newData = await userHasItineraryModel.create(req.body);
    res.status(201).json(newData);
};

const updateUserHasItinerary = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = await userHasItineraryModel.update(Number(id), req.body);
    res.status(200).json(updatedData);
};

const deleteUserHasItinerary = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedData = await userHasItineraryModel.delete(Number(id));
    res.status(200).json(deletedData);
};

export {
    getAllUserHasItineraries,
    getUserHasItineraryById,
    createUserHasItinerary,
    updateUserHasItinerary,
    deleteUserHasItinerary
};
