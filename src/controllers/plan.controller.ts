import { Request, Response, NextFunction } from "express";
import { PlanModel } from "../models/plan.model";
import { AppError } from "../utils/errorApp";
import { validate as isUUID } from "uuid";
const planModel = new PlanModel();

const getAllPlans = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const plans = await planModel.getAllPlans();
        console.log(plans);
        res.status(200).json(plans);
    } catch (error) {
        next(error);
    }
};

const createPlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const plan = await planModel.createPlan(req.body);
        res.status(201).json(plan);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error', error: 'Unknown error' });
        }
    };
}

const getPlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        if (!isUUID(id)) throw new AppError("Invalid UUID format", 400);

        const plan = await planModel.getPlan(id);
        res.status(200).json(plan);
    }
    catch (error) {
        next(error);
    }
}

const updatePlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        if (!isUUID(id)) throw new AppError("Invalid UUID format", 400);

        const plan = await planModel.updatePlan(id, req.body);
        res.status(200).json(plan);
    } catch (error) {
        next(error);
    }
};

const deletePlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        if (!isUUID(id)) throw new AppError("Invalid UUID format", 400);

        await planModel.deletePlan(id);
        res.status(204).end();
    }
    catch (error) {
        next(error);
    }
}

export { getAllPlans, createPlan, updatePlan, deletePlan, getPlan };