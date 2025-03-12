import { Request, Response, NextFunction } from "express";
import { SubscriptionModel } from "../models/subscription.model";
import { AppError } from "../utils/errorApp";
import { validate as isUUID } from "uuid";

const subscriptionModel = new SubscriptionModel();

const getAllSubscriptions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subscriptions = await subscriptionModel.getAllSubscriptions();
        res.status(200).json(subscriptions);
    } catch (error) {
        next(error);
    }
};

const createSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subscription = await subscriptionModel.createSubscription(req.body);
        res.status(201).json(subscription);
    } catch (error) {
        next(error);
    }
};

const getSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        if(!isUUID(id)) throw new AppError('Invalid UUID format', 400);
        const subscription = await subscriptionModel.getSubscription(id);
        res.status(200).json(subscription);
    } catch (error) {
        next(error);
    }
};

const updateSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        if(!isUUID(id)) throw new AppError('Invalid UUID format', 400);
        const subscription = await subscriptionModel.updateSubscription(id, req.body);
        res.status(200).json(subscription);
    } catch (error) {
        next(error);
    }
};

const deleteSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        if(!isUUID(id)) throw new AppError('Invalid UUID format', 400);
        const subscription = await subscriptionModel.deleteSubscription(id);
        res.status(200).json(subscription);
    } catch (error) {
        next(error);
    }
};

export {
    getAllSubscriptions,
    createSubscription,
    getSubscription,
    updateSubscription,
    deleteSubscription
}