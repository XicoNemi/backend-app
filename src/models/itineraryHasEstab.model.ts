import { PrismaClient, ItineraryHasEstablishment } from "@prisma/client";
import { z, ZodError } from "zod";

const prisma = new PrismaClient();

const itineraryHasEstablishmentSchema = z.object({
    itineraryId: z.number(),
    establishmentId: z.number(),
});

export class ItineraryHasEstab {
    async getAll() {
        return await prisma.itineraryHasEstablishment.findMany();
    }

    async getById(id: number) {
        return await prisma.itineraryHasEstablishment.findUnique({ where: { id } });
    }

    async create(data: ItineraryHasEstablishment) {
        try {
            itineraryHasEstablishmentSchema.parse(data);
            return await prisma.itineraryHasEstablishment.create({ data });
        } catch (error) {
            return this.handleZodError(error);
        }
    }
    async update(id: number, data: ItineraryHasEstablishment) {
        try {
            itineraryHasEstablishmentSchema.parse(data);
            return await prisma.itineraryHasEstablishment.update({ where: { id }, data });
        } catch (error) {
            return this.handleZodError(error);
        }
    }

    async delete(id: number) {
        return await prisma.itineraryHasEstablishment.delete({ where: { id } });
    }

    private handleZodError(error: unknown) {
        if (error instanceof ZodError) {
            return { message: error.errors.map(e => e.message).join(", ") };
        }
        return { message: "Error desconocido." };
    }
}
