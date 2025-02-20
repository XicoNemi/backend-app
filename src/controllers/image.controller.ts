import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cloudinary from "../config/cloudinary";

const prisma = new PrismaClient();

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ID, tableName } = req.body;

        // Validar que los datos requeridos estén presentes
        if (!ID) {
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
        let imageField = "image";

        // Determinar la tabla y el campo de imagen a actualizar
        switch (tableName) {
            case "User":
                table = prisma.user;
                imageField = "image";
                break;
            case "Business":
                table = prisma.business;
                imageField = "url_logo";
                break;
            case "Content":
                table = prisma.content;
                imageField = "url_logo";
                break;
            default:
                res.status(400).json({ error: "Invalid table name" });
                return;
        }

        // Verificar si el registro existe antes de subir la imagen
        const existingRecord = await table.findUnique({
            where: { [idField]: Number(ID) },
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
        const updatedRecord = await table.update({
            where: { [idField]: Number(ID) },
            data: { [imageField]: result.secure_url }
        });

        res.status(200).json({
            message: "Image uploaded successfully",
            data: updatedRecord,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error uploading image" });
    }
};
