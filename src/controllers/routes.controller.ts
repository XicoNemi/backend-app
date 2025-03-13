import { Request, Response, NextFunction } from "express";
import { RoutesModel } from "../models/route.model";
import { AppError } from "../utils/errorApp";
import { validate as isUUID } from "uuid";
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


const getRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        if (!isUUID(id)) throw new AppError('Invalid UUID format', 400);
        const route = await routeModel.getRoute(id);
        res.json(route).status(200);
    } catch (error) {
        next(error);
    }
}


export {
    getAllRoutes,
    getRoute,
    createRoute
}