import { NextFunction, Request, Response } from "express";
import { EventModel } from "../models/event.model";
import { validate as isUUID } from "uuid";
import { AppError } from "../utils/errorApp";
import sendPushNotifications from "../services/expoService";

const eventModel = new EventModel()

const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const events = await eventModel.getAllEvents()
        res.status(200).json(events)
    } catch (error) {
        next(error)
    }

}

const getEventById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        if (!isUUID(id)) throw new AppError('Invalid UUID format', 400);
        const event = await eventModel.getEventById(id)
        res.json(event).status(200)
    } catch (error) {
        next(error)
    }

}

const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        const event = await eventModel.createEvent(data)
        res.json(event).status(201)
        //enviar la notificacion a los clientes que tengan la app
        const message = `Nuevo evento creado: ${data.name}. ¡No te lo pierdas!`;  // Personaliza el mensaje según el evento
        await sendPushNotifications(message);
        console.log('Notificaciones enviadas a los clientes.');
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Internal server error', error: error.message })
        }
        else {
            res.status(500).json({ message: 'Internal server error', error: 'Unknown error' })
        }
    }
}

const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        if (!isUUID(id)) throw new AppError('Invalid UUID format', 400);
        const data = req.body
        const event = await eventModel.updateEvent(id, data)
        res.status(200).json(event)
    } catch (error) {
        next(error)
    }

}

const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        if (!isUUID(id)) throw new AppError('Invalid UUID format', 400);
        const event = await eventModel.deleteEvent(id)
        res.json(event).status(200)
    } catch (error) {
        next(error)
    }
}

const getEventByBusinessId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params
        if (!isUUID(id)) throw new AppError('Invalid UUID format', 400);
        const event = await eventModel.getEventsByBusinessId(id)
        if (!event) {
            res.status(404).json({ message: 'No se encontraron eventos.' })
        } else {
            res.json(event).status(200)
        }
    } catch (error) {
        next(error)
    }
}

export {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventByBusinessId
}