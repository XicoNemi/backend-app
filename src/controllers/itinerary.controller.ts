import { NextFunction, Request, Response } from "express";
import { ItineraryModel } from "../models/itinerary.model";
import { validate as isUUID } from "uuid";
import { AppError } from "../utils/errorApp";

const itineraryModel = new ItineraryModel()

const getAllItineraries = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const itineraries = await itineraryModel.getAllItineraries()
        res.json(itineraries).status(200)

    } catch (error) {
        next(error)
    }
}

const getItineraryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        if (!isUUID(id)) throw new AppError('Invalid UUID format', 400);
        const itinerary = await itineraryModel.getItineraryById(id)
        res.json(itinerary).status(200)

    } catch (error) {
        next(error)
    }
}

const createItinerary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        const itinerary = await itineraryModel.createItinerary(data)
        res.json(itinerary).status(201)

    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error', error: 'Unknown error' });
        }
    }
}

const updateItinerary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        if (!isUUID(id)) throw new AppError('Invalid UUID format', 400);
        const data = req.body
        const itinerary = await itineraryModel.updateItinerary(id, data)
        res.json(itinerary).status(200)

    } catch (error) {
        next(error)
    }
}

const deleteItinerary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        if (!isUUID(id)) throw new AppError('Invalid UUID format', 400);
        const itinerary = await itineraryModel.deleteItinerary(id)
        res.json(itinerary).status(200)
        
    } catch (error) {
        next(error)
    }
}

export {
    getAllItineraries,
    getItineraryById,
    createItinerary,
    updateItinerary,
    deleteItinerary
}