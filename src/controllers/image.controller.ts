import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../utils/errorApp";
import cloudinary from "../config/cloudinary";

const prisma = new PrismaClient();

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { tableName, id } = req.params;

        // Validar que los datos requeridos estén presentes
        if (!id) {
            res.status(400).json({ error: "User ID is required" });
            return;
        }
        if (!tableName) {
            res.status(400).json({ error: "Table name is required" });
            return;
        }
        if (!req.file) {
            res.status(400).json({ error: "No file uploaded" });
            return;
        }

        let table: any = null;
        let idField = "id";
        let imageField = "url_image";

        // Determinar la tabla y el campo de imagen a actualizar
        switch (tableName) {
            case "Users":
                table = prisma.users;
                break;
            case "Businesses":
                table = prisma.businesses;
                break;
            case "Events":
                table = prisma.events;
                break;
            case "pointsOfInterest":
                table = prisma.pointsOfInterest;
                break;
            case 'Routes':
                table = prisma.routes;
                break;
            default:
                res.status(400).json({ error: "Invalid table name" });
                return;
        }

        // Verificar si el registro existe antes de subir la imagen
        const existingRecord = await table.findUnique({
            where: { [idField]: id },
            select: { [idField]: true }
        });

        if (!existingRecord) {
            res.status(404).json({ error: "Record not found" });
            return;
        }

        // Subir la imagen a Cloudinary
        const result = await new Promise<any>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "profile" },
                (error, result) => (error ? reject(error) : resolve(result))
            );
            if (!req.file) {
                res.status(400).json({ error: "No file uploaded" });
                return;
            }
            uploadStream.end(req.file.buffer);
        });

        // Actualizar la imagen en la base de datos
        const updatedRecord = table.update({
            where: { [idField]: id },
            data: { [imageField]: result.secure_url }
        });
        console.log(updatedRecord)

        res.status(200).json({
            message: "Image uploaded successfully",
            data: updatedRecord,
        });

    } catch (error) {
        res.status(500).json({ error: "Error uploading image" });
    }
};


//* ENTREGABLE
export const getImagesInBD = async (req: Request, res: Response): Promise<void> => {
    const data = await prisma.users.findMany({
        select: {
            id: true,
            url_image: true
        }
    });
    res.status(200).json(data);
}

export const getBusinessImages = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const data = await prisma.businesses.findMany({
        select: {
            id: true,
            name: true,
            url_image: true
        }
    })

    res.status(200).json(data)
}