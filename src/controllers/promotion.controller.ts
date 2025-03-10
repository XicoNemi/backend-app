import { NextFunction, Request, Response } from "express";
import { PromotionModel } from "../models/promotion.model";
import { validate as isUUID } from "uuid";
import { AppError } from "../utils/errorApp";
const promotionModel = new PromotionModel()

const getAllPromotions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const promotions = await promotionModel.getAllPromotions()
        res.json(promotions).status(200)
    } catch (error) {
        next(error)
    }

}

const getPromotionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        if (!isUUID(id)) throw new AppError('Invalid UUID format', 400);
        const promotion = await promotionModel.getPromotionById(id)
        res.json(promotion).status(200)
    } catch (error) {
        next(error)
    }

}

const createPromotion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        const promotion = await promotionModel.createPromotion(data)
        res.json(promotion).status(201)
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error', error: 'Unknown error' });
        }
    }

}

const deletePromotion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        if (!isUUID(id)) throw new AppError('Invalid UUID format', 400);

        const promotion = await promotionModel.deletePromotion(id)
        res.json(promotion).status(200)
    } catch (error) {
        next(error)
    }

}

const updatePromotion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        if (!isUUID(id)) throw new AppError('Invalid UUID format', 400);
        const data = req.body
        const promotion = await promotionModel.updatePromotion(id, data)
        res.json(promotion).status(200)
    } catch (error) {
        next(error)
    }

}

export {
    getAllPromotions,
    getPromotionById,
    createPromotion,
    updatePromotion,
    deletePromotion
}