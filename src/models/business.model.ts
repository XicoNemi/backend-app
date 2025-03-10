import { PrismaClient, Businesses, CategoryType } from "@prisma/client";
import { z, ZodError } from "zod";

const prisma = new PrismaClient();

const businessSchema = z.object({
    ownerId: z.string().min(1, "Campo requerido."),
    name: z.string().min(1, "Campo requerido."),
    description: z.string().min(1, "Campo requerido."),
    category: z.string().min(1, "Campo requerido."),
    address: z.string().min(1, "Campo requerido."),
    tel: z.string().min(1, "Campo requerido."),
    social_networks: z.record(z.string().min(1), z.string().min(1)).nullable().optional(),
    status: z.boolean(),
});

export class BusinessModel {
    async getAllBusinesses(filter?: CategoryType) {
        if (filter) {
            return await prisma.businesses.findMany({
                where: {
                    category: filter
                }
            })
        }
        return await prisma.businesses.findMany();
    }

    async getBusiness(id: string) {
        const business = await prisma.businesses.findUnique({ where: { id } });
        if (!business) {
            return { message: "Negocio no encontrado." };
        }
        return business;
    }

    async createBusiness(data: Businesses) {
        try {
            businessSchema.parse(data);
        } catch (error) {
            if (error instanceof ZodError) {
                return { message: error.errors.map(e => e.message).join(", ") };
            }
            return { message: "Error desconocido." };
        }

        const isExist = await prisma.businesses.findFirst({ where: { name: data.name } });
        if (isExist) {
            return { message: "El negocio ya existe." };
        }

        const business = await prisma.businesses.create({ data: { ...data, social_networks: data.social_networks ?? undefined } });
        return { id: business.id, message: "Negocio creado correctamente." };
    }

    async updateBusiness(id: string, data: Businesses) {
        try {
            businessSchema.parse(data);
        } catch (error) {
            if (error instanceof ZodError) {
                return { message: error.errors.map(e => e.message).join(", ") };
            }
            return { message: "Error desconocido." };
        }

        const isExist = await prisma.businesses.findUnique({ where: { id } });
        if (!isExist) {
            return { message: "Negocio no encontrado." };
        }

        await prisma.businesses.update({ where: { id }, data: { ...data, social_networks: data.social_networks ?? undefined } });
        return { message: "Negocio actualizado correctamente." };
    }

    async deleteBusiness(id: string) {
        const isExist = await prisma.businesses.findUnique({ where: { id } });
        if (!isExist) {
            return { message: "Negocio no encontrado." };
        }

        await prisma.businesses.delete({ where: { id } });
        return { message: "Negocio eliminado correctamente." };
    }

    async getPublicBusinesses() {
        return await prisma.businesses.findMany({
            where: {
                status: true
            },
            take: 6
        });
    }
}
