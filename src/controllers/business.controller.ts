import { Request, Response, NextFunction } from 'express';
import { BusinessModel } from '../models/business.model';
import { CategoryType } from '@prisma/client';
import { AppError } from '../utils/errorApp';
import { z } from 'zod';
import { validate as isUUID } from 'uuid';

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
    const ownerId = req.user?.userId;
    const typeUser = req.user?.type;

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
    const id = req.params.id;
    if (!isUUID(id)) throw new AppError('Invalid UUID format', 400);
    // if (isNaN(id)) throw new AppError('ID inválido', 400);

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
    const id = req.params.id;
    if (!isUUID(id)) throw new AppError('Invalid UUID format', 400);

    // if (isNaN(id)) {
    //   res.status(400).json({ message: 'ID inválido' });
    //   return;
    // }

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
    const id = req.params.id;
    // if (isNaN(id)) throw new AppError('ID inválido', 400);
    if (!isUUID(id)) throw new AppError('Invalid UUID format', 400);


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
    const category = req.query.category as CategoryType;
    if (!category) {
      const businesses = await businessModel.getPublicBusinesses();
      res.status(200).json(businesses);
    }
    const businesses = await businessModel.getPublicBusinesses(categoryEnum.parse(category));
    res.status(200).json(businesses);
  } catch (error) {
    next(error);
  }
};
