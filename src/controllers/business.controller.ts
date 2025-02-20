import { Request, Response } from "express";
import { BusinessModel } from "../models/business.model";
import { CategoryType } from "@prisma/client";
import { z } from "zod";

const businessModel = new BusinessModel();

const categoryEnum = z.enum([
    "HOSPEDAJE",
    "GASTRONOMIA",
    "EVENTOS",
    "TURISMO",
    "ITINERARIOS",
    "CINE",
    "OTRO"
]);

export const getAllBusinesses = async (req: Request, res: Response): Promise<void> => {
    try {
        let filter = req.query.type as string | undefined;

        if (filter) {
            filter = filter.toUpperCase(); // Convertir a MAYÚSCULAS
            categoryEnum.parse(filter); // Validar con Zod
        }

        const businesses = await businessModel.getAllBusinesses(filter as CategoryType);
        res.status(200).json(businesses);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: "Categoría inválida", errors: error.errors });
        }
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getBusiness = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) throw new Error("ID inválido");

        const business = await businessModel.getBusiness(id);
        res.status(200).json(business);
    } catch (error) {
        res.status(400).json({ message: error || "Error al obtener negocio" });
    }
};

export const createBusiness = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body;

        if (data.category) {
            data.category = data.category.toUpperCase();
            categoryEnum.parse(data.category);
        } else {
            res.status(400).json({ message: "El campo 'category' es obligatorio" });
        }

        const business = await businessModel.createBusiness(data);
        res.status(201).json(business);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: "Categoría inválida", errors: error.errors });
        }
        res.status(500).json({
            error: error || error,
            message: "Error al crear negocio"
        });
    }
};

export const updateBusiness = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) res.status(400).json({ message: "ID inválido" });

        const data = req.body;

        if (data.category) {
            data.category = data.category.toUpperCase();
            categoryEnum.parse(data.category);
        }

        const business = await businessModel.updateBusiness(id, data);
        res.status(200).json(business);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: "Categoría inválida", errors: error.errors });
        }
        res.status(500).json({ message: error || "Error al actualizar negocio" });
    }
};


export const deleteBusiness = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) throw new Error("ID inválido");

        const business = await businessModel.deleteBusiness(id);
        res.status(200).json(business);
    } catch (error) {
        res.status(400).json({ message: error || "Error al eliminar negocio" });
    }
};
