import { PrismaClient, Content, TypeContent } from "@prisma/client";
import { z, ZodError } from "zod";

const prisma = new PrismaClient();

const contentSchema = z.object({
    type: z.nativeEnum(TypeContent, { errorMap: () => ({ message: "Tipo de contenido inválido." }) }),
    title: z.string().min(1, "El título es requerido."),
    description: z.string().min(1, "La descripción es requerida."),
    url_logo: z.string().url("URL inválida.").nullable().optional()
});

export class ContentModel {
    async getAllContents(filter?: TypeContent) {
        if (filter) {
            return await prisma.content.findMany({ where: { type: filter } });
        }
        return await prisma.content.findMany();
    }

    async getContent(id: number) {
        const content = await prisma.content.findUnique({ where: { id } });
        if (!content) {
            return { message: "Contenido no encontrado." };
        }
        return content;
    }

    async createContent(data: Content) {
        try {
            contentSchema.parse(data);
        } catch (error) {
            if (error instanceof ZodError) {
                return { message: error.errors.map(e => e.message).join(", ") };
            }
            return { message: "Error desconocido." };
        }

        const content = await prisma.content.create({ data });
        return { id: content.id, message: "Contenido creado correctamente." };
    }

    async updateContent(id: number, data: Content) {
        try {
            contentSchema.parse(data);
        } catch (error) {
            if (error instanceof ZodError) {
                return { message: error.errors.map(e => e.message).join(", ") };
            }
            return { message: "Error desconocido." };
        }

        const isExist = await prisma.content.findUnique({ where: { id } });
        if (!isExist) {
            return { message: "Contenido no encontrado." };
        }

        await prisma.content.update({ where: { id }, data });
        return { message: "Contenido actualizado correctamente." };
    }

    async deleteContent(id: number) {
        const isExist = await prisma.content.findUnique({ where: { id } });
        if (!isExist) {
            return { message: "Contenido no encontrado." };
        }

        await prisma.content.delete({ where: { id } });
        return { message: "Contenido eliminado correctamente." };
    }
}
