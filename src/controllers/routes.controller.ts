import { Request, Response, NextFunction } from "express";
import { RoutesModel } from "../models/route.model";
import { AppError } from "../utils/errorApp";
const routeModel = new RoutesModel();

const getAllRoutes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const routes = await routeModel.getAllRoutes();
        res.json(routes).status(200);
    } catch (error) {
        next(error)
    }

}

const createRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const route = await routeModel.createRoute(data);
        res.json(route).status(201);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error', error: 'Unknown error' });
        }
    }
}


export {
    getAllRoutes,
    createRoute
}