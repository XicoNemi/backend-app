import { Request, Response } from "express";
import { ItineraryHasEstab } from "../models/itineraryHasEstab.model";

const itineraryHasEstabModel = new ItineraryHasEstab();

const getAllItineraryHasEstab = async (req: Request, res: Response) => {
    const data = await itineraryHasEstabModel.getAll();
    res.status(200).json(data);
};

const getItineraryHasEstabById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await itineraryHasEstabModel.getById(Number(id));
    res.status(200).json(data);
};

const createItineraryHasEstab = async (req: Request, res: Response) => {
    const newData = await itineraryHasEstabModel.create(req.body);
    res.status(201).json(newData);
};

const updateItineraryHasEstab = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = await itineraryHasEstabModel.update(Number(id), req.body);
    res.status(200).json(updatedData);
};

const deleteItineraryHasEstab = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedData = await itineraryHasEstabModel.delete(Number(id));
    res.status(200).json(deletedData);
};

export {
    getAllItineraryHasEstab,
    getItineraryHasEstabById,
    createItineraryHasEstab,
    updateItineraryHasEstab,
    deleteItineraryHasEstab
};
