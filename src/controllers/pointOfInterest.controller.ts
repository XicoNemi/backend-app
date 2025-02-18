import { Request, Response } from "express";
import { PointModel } from "../models/pointOfInterest.model";

const pointModel = new PointModel()

const getAllPoints = async (req: Request, res: Response) => {
    const points = await pointModel.getAllPoints()
    res.json(points).status(200)
}

const getPointById = async (req: Request, res: Response) => {
    const { id } = req.params
    const point = await pointModel.getPointById(Number(id))
    res.json(point).status(200)
}

const createPoint = async (req: Request, res: Response) => {
    const data = req.body
    const point = await pointModel.createPoint(data)
    res.json(point).status(201)
}

const updatePoint = async (req: Request, res: Response) => {
    const { id } = req.params
    const data = req.body
    const point = await pointModel.updatePoint(Number(id), data)
    res.json(point).status(200)
}

const deletePoint = async (req: Request, res: Response) => {
    const { id } = req.params
    const point = await pointModel.deletePoint(Number(id))
    res.json(point).status(200)
}

export {
    getAllPoints,
    getPointById,
    createPoint,
    updatePoint,
    deletePoint
}