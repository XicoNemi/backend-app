import { PrismaClient, UserHasRoute } from "@prisma/client";
import { z, ZodError } from "zod";

const prisma = new PrismaClient();

const userHasRouteSchema = z.object({
    userId: z.number(),
    routeId: z.number().optional(),
    itineraryId: z.number().optional(),
});

export class UserHasRouteModel {
    async getAll() {
        return await prisma.userHasRoute.findMany();
    }

    async getById(id: number) {
        return await prisma.userHasRoute.findUnique({ where: { id } });
    }

    async create(data: UserHasRoute) {
        try {
            userHasRouteSchema.parse(data);
            return await prisma.userHasRoute.create({ data });
        } catch (error) {
            return this.handleZodError(error);
        }
    }
    async update(id: number, data: UserHasRoute) {
        try {
            userHasRouteSchema.parse(data);
            return await prisma.userHasRoute.update({ where: { id }, data });
        } catch (error) {
            return this.handleZodError(error);
        }
    }

    async delete(id: number) {
        return await prisma.userHasRoute.delete({ where: { id } });
    }

    private handleZodError(error: unknown) {
        if (error instanceof ZodError) {
            return { message: error.errors.map(e => e.message).join(", ") };
        }
        return { message: "Error desconocido." };
    }
}
