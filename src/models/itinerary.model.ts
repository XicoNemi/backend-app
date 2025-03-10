import { Itineraries, PrismaClient } from "@prisma/client";
import { z, ZodError } from "zod";

const prisma = new PrismaClient()

const itinerarySchema = z.object({
    userId: z.string().min(1, "El id del usuario debe ser un UUID válido."),
    name: z.string().min(1, "Campo requerido."),
    startDate: z.number().int().positive("Fecha en formato unix."),
    endDate: z.number().int().positive("Fecha en formato unix."),
    status: z.boolean()
})

export class ItineraryModel {
    async getAllItineraries() {
        const itineraries = await prisma.itineraries.findMany()
        if (itineraries.length == 0) {
            return {
                message: 'No se encontraron itinerarios.'
            }
        }
        return itineraries
    }

    async getItineraryById(id: string) {
        const itinerary = await prisma.itineraries.findUnique({ where: { id } })
        if (!itinerary) {
            return {
                message: 'Itinerario no encontrado.'
            }
        }
        return itinerary
    }

    async createItinerary(data: Itineraries) {
        try {
            itinerarySchema.parse(data)
        } catch (error) {
            if (error instanceof ZodError) {
                return {
                    message: error.errors.map((e) => e.message).join(', ')
                }
            }
        }

        const itinerary = await prisma.itineraries.create({ data })
        return {
            id: itinerary.id,
            message: 'Itinerario creado correctamente.'
        }
    }

    async updateItinerary(id: string, data: Itineraries) {
        try {
            itinerarySchema.parse(data)
        } catch (error) {
            if (error instanceof ZodError) {
                return {
                    message: error.errors.map((e) => e.message).join(', ')
                }
            }
        }
        const isExist = await prisma.itineraries.findUnique({ where: { id } })
        if (!isExist) {
            return {
                message: 'Itinerario no encontrado.'
            }
        }

        const itinerary = await prisma.itineraries.update({ where: { id }, data })
        return {
            id: itinerary.id,
            message: 'Itinerario actualizado correctamente.'
        }
    }

    async deleteItinerary(id: string) {
        try {
            const itinerary = await prisma.itineraries.findUnique({ where: { id } })
            if (!itinerary) {
                return {
                    message: 'Itinerario no encontrado.'
                }
            }
            await prisma.itineraries.delete({ where: { id } })
            return {
                message: 'Itinerario eliminado correctamente.'
            }
        } catch (error) {
            return {
                message: 'Error al eliminar itinerario.'
            }
        }
    }
}