import { PrismaClient, UserHasItinerary } from "@prisma/client";
import { z, ZodError } from "zod";

const prisma = new PrismaClient();

const userHasItinerarySchema = z.object({
    userId: z.number(),
    itineraryId: z.number(),
});

export class UserHasItineraryModel {
    async getAll() {
        return await prisma.userHasItinerary.findMany();
    }

    async getById(id: number) {
        return await prisma.userHasItinerary.findUnique({ where: { id } });
    }

    async create(data: UserHasItinerary) {
        try {
            userHasItinerarySchema.parse(data);
            return await prisma.userHasItinerary.create({ data });
        } catch (error) {
            return this.handleZodError(error);
        }
    }
    async update(id: number, data: UserHasItinerary) {
        try {
            userHasItinerarySchema.parse(data);
            return await prisma.userHasItinerary.update({ where: { id }, data });
        } catch (error) {
            return this.handleZodError(error);
        }
    }

    async delete(id: number) {
        return await prisma.userHasItinerary.delete({ where: { id } });
    }

    private handleZodError(error: unknown) {
        if (error instanceof ZodError) {
            return { message: error.errors.map(e => e.message).join(", ") };
        }
        return { message: "Error desconocido." };
    }
}
