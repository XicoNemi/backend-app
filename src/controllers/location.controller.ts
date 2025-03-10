import { Request, Response, NextFunction } from "express";
import { LocationModel } from "../models/location.model";
import { validate as isUUID } from "uuid";
import { AppError } from "../utils/errorApp";

const locationModerl = new LocationModel()

// ? SINTAXIS PROPUESTA, SUJETA A
const getAllLocations = async (req: Request, res: Response) => {
    const locations = await locationModerl.getLocations()
    res.json(locations).status(200)
}

const getLocationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        if (!isUUID(id)) throw new AppError('Invalid UUID format', 400);

        const location = await locationModerl.getLocationById(id)
        res.json(location).status(200)
    } catch (error) {
        next(error)
    }

}

const createLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        const location = await locationModerl.createLocation(data)
        res.json(location).status(201)
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error', error: 'Unknown error  ' });
        }
    }
}

const updateLocation = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const id = req.params.id
        if (!isUUID(id)) throw new AppError('Invalid UUID format', 400);
        const data = req.body
        const location = await locationModerl.updateLocation(id, data)
        res.json(location).status(200)
    } catch (error) {
        next(error)
    }
}

const deleteLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        if (!isUUID(id)) throw new AppError('Invalid UUID format', 400);
        const location = await locationModerl.deleteLocation(id)
        res.json(location).status(200)
    } catch (error) {
        next(error)
    }

}

export {
    getAllLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation
}