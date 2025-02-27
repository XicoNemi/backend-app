import { Request, Response } from "express";
import { LocationModel } from "../models/location.model";

const locationModerl = new LocationModel()

// ? SINTAXIS PROPUESTA, SUJETA A
const getAllLocations = async (req: Request, res: Response) => {
    const locations = await locationModerl.getLocations()
    res.json(locations).status(200)
}

const getLocationById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const location = await locationModerl.getLocationById(id)
    res.json(location).status(200)
}

const createLocation = async (req: Request, res: Response) => {
    const data = req.body
    const location = await locationModerl.createLocation(data)
    res.json(location).status(201)
}

const updateLocation = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const data = req.body
    const location = await locationModerl.updateLocation(id, data)
    res.json(location).status(200)
}

const deleteLocation = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const location = await locationModerl.deleteLocation(id)
    res.json(location).status(200)
}

export {
    getAllLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation
}