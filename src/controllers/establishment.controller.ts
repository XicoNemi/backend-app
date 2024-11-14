import { Request, Response } from "express";
import { EstablishmentModel } from "../models/establishment.model";
const estabModel = new EstablishmentModel()

const getAllEstabs = async (req: Request, res: Response) => {
    const estabs = await estabModel.getAllEstabs()
    res.json(estabs).status(200)
}

const getEstabById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const estab = await estabModel.getEstabById(id)
    res.json(estab).status(200)
}

const createEstab = async (req: Request, res: Response) => {
    const data = req.body
    const estab = await estabModel.createEstab(data)
    res.json(estab).status(201)
}

const deleteEstab = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const estab = await estabModel.deleteEstab(id)
    res.json(estab).status(200)
}

const updateEstab = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const data = req.body
    const estab = await estabModel.updateEstab(id, data)
    res.json(estab).status(200)
}

export {
    getAllEstabs,
    getEstabById,
    createEstab,
    updateEstab,
    deleteEstab
}