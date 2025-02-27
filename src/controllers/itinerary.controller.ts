import { Request, Response } from "express";
import { ItineraryModel } from "../models/itinerary.model";

const itineraryModel = new ItineraryModel()

const getAllItineraries = async (req: Request, res: Response) => {
    const itineraries = await itineraryModel.getAllItineraries()
    res.json(itineraries).status(200)
}

const getItineraryById = async (req: Request, res: Response) => {
    const { id } = req.params
    const itinerary = await itineraryModel.getItineraryById(Number(id))
    res.json(itinerary).status(200)
}

const createItinerary = async (req: Request, res: Response) => {
    const data = req.body
    const itinerary = await itineraryModel.createItinerary(data)
    res.json(itinerary).status(201)
}

const updateItinerary = async (req: Request, res: Response) => {
    const { id } = req.params
    const data = req.body
    const itinerary = await itineraryModel.updateItinerary(Number(id), data)
    res.json(itinerary).status(200)
}

const deleteItinerary = async (req: Request, res: Response) => {
    const { id } = req.params
    const itinerary = await itineraryModel.deleteItinerary(Number(id))
    res.json(itinerary).status(200)
}

export {
    getAllItineraries,
    getItineraryById,
    createItinerary,
    updateItinerary,
    deleteItinerary
}