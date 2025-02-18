import { PrismaClient, ItineraryHasRoute } from "@prisma/client";
import { z, ZodError } from "zod";

const prisma = new PrismaClient();

const itineraryHasRouteSchema = z.object({
    itineraryId: z.number(),
    routeId: z.number(),
});

export class ItineraryHasRouteModel {
    async getAll() {
        return await prisma.itineraryHasRoute.findMany();
    }

    async getById(id: number) {
        return await prisma.itineraryHasRoute.findUnique({ where: { id } });
    }

    async create(data: ItineraryHasRoute) {
        try {
            itineraryHasRouteSchema.parse(data);
            return await prisma.itineraryHasRoute.create({ data });
        } catch (error) {
            return this.handleZodError(error);
        }
    }
    async update (id: number, data: ItineraryHasRoute) {
        try {
            itineraryHasRouteSchema.parse(data);
            return await prisma.itineraryHasRoute.update({ where: { id }, data });
        } catch (error) {
            return this.handleZodError(error);
        }
    }

    async delete(id: number) {
        return await prisma.itineraryHasRoute.delete({ where: { id } });
    }

    private handleZodError(error: unknown) {
        if (error instanceof ZodError) {
            return { message: error.errors.map(e => e.message).join(", ") };
        }
        return { message: "Error desconocido." };
    }
}
