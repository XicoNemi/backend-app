import { Request, Response } from "express";
import { EventModel } from "../models/event.model";

const eventModel = new EventModel()

const getAllEvents = async (req: Request, res: Response) => {
    const events = await eventModel.getAllEvents()
    res.json(events).status(200)
}

const getEventById = async (req: Request, res: Response) => {
    const { id } = req.params
    const event = await eventModel.getEventById(Number(id))
    res.json(event).status(200)
}

const createEvent = async (req: Request, res: Response) => {
    const data = req.body
    const event = await eventModel.createEvent(data)
    res.json(event).status(201)
}

const updateEvent = async (req: Request, res: Response) => {
    const { id } = req.params
    const data = req.body
    const event = await eventModel.updateEvent(Number(id), data)
    res.json(event).status(200)
}

const deleteEvent = async (req: Request, res: Response) => {
    const { id } = req.params
    const event = await eventModel.deleteEvent(Number(id))
    res.json(event).status(200)
}

export {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
}