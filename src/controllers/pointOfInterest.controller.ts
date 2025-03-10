import { NextFunction, Request, Response } from "express";
import { PointModel } from "../models/pointOfInterest.model";
import { validate as isUUID } from "uuid";
import { AppError } from "../utils/errorApp";

const pointModel = new PointModel()

const getAllPoints = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const points = await pointModel.getAllPoints()
        res.json(points).status(200)
    } catch (error) {
        next(error)

    }

}

const getPointById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        if (!isUUID(id)) throw new AppError('Invalid UUID format', 400);
        const point = await pointModel.getPointById(id)
        res.json(point).status(200)
    } catch (error) {
        next(error)
    }

}

const createPoint = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        const point = await pointModel.createPoint(data)
        res.json(point).status(201)
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error', error: 'Unknown error' });
        }
    }

}

const updatePoint = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        if (!isUUID(id)) throw new AppError('Invalid UUID format', 400);
        const data = req.body
        const point = await pointModel.updatePoint(id, data)
        res.json(point).status(200)
    } catch (error) {
        next(error)
    }
}

const deletePoint = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        if (!isUUID(id)) throw new AppError('Invalid UUID format', 400);
        const point = await pointModel.deletePoint(id)
        res.json(point).status(200)
    } catch (error) {
        next(error)
    }
}

export {
    getAllPoints,
    getPointById,
    createPoint,
    updatePoint,
    deletePoint
}