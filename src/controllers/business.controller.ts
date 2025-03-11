import { Request, Response, NextFunction } from 'express';
import { BusinessModel } from '../models/business.model';
import { CategoryType } from '@prisma/client';
import { AppError } from '../utils/errorApp';
import { z } from 'zod';

const businessModel = new BusinessModel();

const categoryEnum = z.enum([
  'Hospedaje',
  'Gastronomia',
  'Eventos',
  'Turismo',
  'Itinerarios',
  'Cine',
  'Otro',
]);

export const getAllBusinesses = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // if (!req.user || !req.user.userId) {
    //   res.status(400).json({ message: 'User not found' });
    // }
    const ownerId = req.user?.userId;
    const typeUser = req.user?.type;
    // let filter = req.query.type as string | undefined;

    // if (filter) {
    //   filter = filter.toUpperCase(); // Convertir a MAYÚSCULAS
    //   categoryEnum.parse(filter); // Validar con Zod
    // }

    // const businesses = await businessModel.getAllBusinesses(filter as CategoryType);
    const business = await businessModel.getAllBusinesses(ownerId, typeUser);
    res.status(200).json(business);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: 'Categoría inválida', errors: error.errors });
      return;
    }
    next(error);
  }
};

export const getBusiness = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new AppError('ID inválido', 400);

    const business = await businessModel.getBusiness(id);
    res.status(200).json(business);
  } catch (error) {
    next(error);
  }
};

export const createBusiness = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = req.body;

    if (!data.category) {
      res.status(400).json({ message: "El campo 'category' es obligatorio" });
      return;
    }

    data.category =
      data.category.charAt(0).toUpperCase() + data.category.slice(1).toLowerCase();
    categoryEnum.parse(data.category);

    const business = await businessModel.createBusiness(data);
    res.status(201).json(business);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: 'Categoría inválida', errors: error.errors });
      return;
    }
    next(error);
  }
};

export const updateBusiness = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: 'ID inválido' });
      return;
    }

    const data = req.body;

    if (data.category) {
      data.category =
        data.category.charAt(0).toUpperCase() + data.category.slice(1).toLowerCase();
      categoryEnum.parse(data.category);
    }

    const business = await businessModel.updateBusiness(id, data);
    res.status(200).json(business);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: 'Categoría inválida', errors: error.errors });
      return;
    }
    next(error);
  }
};

export const deleteBusiness = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new AppError('ID inválido', 400);

    const business = await businessModel.deleteBusiness(id);
    res.status(200).json(business);
  } catch (error) {
    next(error);
  }
};

export const getPublicBusinesses = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const businesses = await businessModel.getPublicBusinesses();
    res.status(200).json(businesses);
  } catch (error) {
    next(error);
  }
};
