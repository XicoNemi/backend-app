import { Request, Response } from "express";
import { ItineraryHasRouteModel } from "../models/itineraryHasRoute.model";

const itineraryHasRouteModel = new ItineraryHasRouteModel();

const getAllItineraryHasRoutes = async (req: Request, res: Response) => {
    const data = await itineraryHasRouteModel.getAll();
    res.status(200).json(data);
};

const getItineraryHasRouteById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await itineraryHasRouteModel.getById(Number(id));
    res.status(200).json(data);
};

const createItineraryHasRoute = async (req: Request, res: Response) => {
    const newData = await itineraryHasRouteModel.create(req.body);
    res.status(201).json(newData);
};

const updateItineraryHasRoute = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = await itineraryHasRouteModel.update(Number(id), req.body);
    res.status(200).json(updatedData);
};

const deleteItineraryHasRoute = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedData = await itineraryHasRouteModel.delete(Number(id));
    res.status(200).json(deletedData);
};

export {
    getAllItineraryHasRoutes,
    getItineraryHasRouteById,
    createItineraryHasRoute,
    updateItineraryHasRoute,
    deleteItineraryHasRoute
};
