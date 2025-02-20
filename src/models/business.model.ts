import { PrismaClient, Business, EstablishmentType } from "@prisma/client";
import { z, ZodError } from "zod";

const prisma = new PrismaClient();

const businessSchema = z.object({
    name: z.string().min(1, "Campo requerido."),
    category: z.string().min(1, "Campo requerido."),
    address: z.string().min(1, "Campo requerido."),
    tel: z.string().min(1, "Campo requerido."),
    social_networks: z.record(z.string().min(1), z.string().min(1)).nullable().optional(),
    outstanding: z.boolean(),
});

export class BusinessModel {
    async getAllBusinesses(filter?: EstablishmentType) {
        if (filter) {
            return await prisma.business.findMany({
                where: {
                    category: filter
                }
            })
        }
        return await prisma.business.findMany();
    }

    async getBusiness(id: number) {
        const business = await prisma.business.findUnique({ where: { id } });
        if (!business) {
            return { message: "Negocio no encontrado." };
        }
        return business;
    }

    async createBusiness(data: Business) {
        try {
            businessSchema.parse(data);
        } catch (error) {
            if (error instanceof ZodError) {
                return { message: error.errors.map(e => e.message).join(", ") };
            }
            return { message: "Error desconocido." };
        }

        const isExist = await prisma.business.findFirst({ where: { name: data.name } });
        if (isExist) {
            return { message: "El negocio ya existe." };
        }

        const business = await prisma.business.create({ data: { ...data, social_networks: data.social_networks ?? undefined } });
        return { id: business.id, message: "Negocio creado correctamente." };
    }

    async updateBusiness(id: number, data: Business) {
        try {
            businessSchema.parse(data);
        } catch (error) {
            if (error instanceof ZodError) {
                return { message: error.errors.map(e => e.message).join(", ") };
            }
            return { message: "Error desconocido." };
        }

        const isExist = await prisma.business.findUnique({ where: { id } });
        if (!isExist) {
            return { message: "Negocio no encontrado." };
        }

        await prisma.business.update({ where: { id }, data: { ...data, social_networks: data.social_networks ?? undefined } });
        return { message: "Negocio actualizado correctamente." };
    }

    async deleteBusiness(id: number) {
        const isExist = await prisma.business.findUnique({ where: { id } });
        if (!isExist) {
            return { message: "Negocio no encontrado." };
        }

        await prisma.business.delete({ where: { id } });
        return { message: "Negocio eliminado correctamente." };
    }
}
