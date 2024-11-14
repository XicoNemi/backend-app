import { Request, Response } from "express";
import { PromotionModel } from "../models/promotion.model";
const promotionModel = new PromotionModel()

const getAllPromotions = async (req: Request, res: Response) => {
    const promotions = await promotionModel.getAllPromotions()
    res.json(promotions).status(200)
}

const getPromotionById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const promotion = await promotionModel.getPromotionById(id)
    res.json(promotion).status(200)
}

const createPromotion = async (req: Request, res: Response) => {
    const data = req.body
    const promotion = await promotionModel.createPromotion(data)
    res.json(promotion).status(201)
}

const deletePromotion = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const promotion = await promotionModel.deletePromotion(id)
    res.json(promotion).status(200)
}

const updatePromotion = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const data = req.body
    const promotion = await promotionModel.updatePromotion(id, data)
    res.json(promotion).status(200)
}

export {
    getAllPromotions,
    getPromotionById,
    createPromotion,
    updatePromotion,
    deletePromotion
}