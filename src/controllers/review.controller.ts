import { Request, Response, NextFunction } from "express";
import { ReviewModel } from "../models/review.model";
import { AppError } from "../utils/errorApp";
import { validate as isUUID } from "uuid";

const reviewModel = new ReviewModel();

const getAllReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviews = await reviewModel.getAllReviews();
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
};

const getReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        if (!isUUID(id)) throw new AppError("Invalid UUID format", 400);
        const review = await reviewModel.getReview(id);
        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
};

const createReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const review = await reviewModel.createReview(req.body);
        res.status(201).json(review);
    } catch (error: unknown) {

        next(error)
    }
};

const updateReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        if (!isUUID(id)) throw new AppError("Invalid UUID format", 400);

        const review = await reviewModel.updateReview(id, req.body);
        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
};

const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        if (!isUUID(id)) throw new AppError("Invalid UUID format", 400);

        const review = await reviewModel.deleteReview(id);
        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
};

const getReviewsByBusinessId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const businessId = req.params.businessId;
        console.log(businessId);
        if (!isUUID(businessId)) throw new AppError("Invalid UUID format", 400);

        const reviews = await reviewModel.getReviewByBusinessId(businessId);
        res.status(200).json(reviews);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export {
    getAllReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview,
    getReviewsByBusinessId
};