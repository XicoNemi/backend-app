import { Request, Response } from "express";
import { ContentModel } from "../models/content.model";

const contentModel = new ContentModel();

export class ContentController {
    async getAllContents(req: Request, res: Response) {
        try {
            const { type } = req.query;
            const contents = await contentModel.getAllContents(type as any);
            res.json(contents);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener los contenidos." });
        }
    }

    async getContent(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const content = await contentModel.getContent(Number(id));
            res.json(content);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el contenido." });
        }
    }

    async createContent(req: Request, res: Response) {
        try {
            const content = await contentModel.createContent(req.body);
            res.json(content);
        } catch (error) {
            res.status(500).json({ message: "Error al crear el contenido." });
        }
    }

    async updateContent(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const content = await contentModel.updateContent(Number(id), req.body);
            res.json(content);
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar el contenido." });
        }
    }

    async deleteContent(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const content = await contentModel.deleteContent(Number(id));
            res.json(content);
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar el contenido." });
        }
    }
}
