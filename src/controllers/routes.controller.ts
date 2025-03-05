import { Request, Response, NextFunction } from "express";
import { RoutesModel } from "../models/route.model";
const routeModel = new RoutesModel();

const getAllRoutes = async (req: Request, res: Response) => {
    const routes = await routeModel.getAllRoutes();
    res.json(routes).status(200);
}

const createRoute = async (req: Request, res: Response) => {
    const data = req.body;
    const route = await routeModel.createRoute(data);
    res.json(route).status(201);
}


export {
    getAllRoutes,
    createRoute
}