import { Itinerary, PrismaClient } from "@prisma/client";
import { z, ZodError } from "zod";

const prisma = new PrismaClient()

const itinerarySchema = z.object({
    name: z.string().min(1, "Campo requerido."),
    description: z.string().min(1, "Campo requerido."),
    type: z.string().min(1, "Campo requerido."),

})

export class ItineraryModel {
    async getAllItineraries() {
        const itineraries = await prisma.itinerary.findMany()
        if (itineraries.length == 0) {
            return {
                message: 'No se encontraron itinerarios.'
            }
        }
        return itineraries
    }

    async getItineraryById(id: number) {
        const itinerary = await prisma.itinerary.findUnique({ where: { id } })
        if (!itinerary) {
            return {
                message: 'Itinerario no encontrado.'
            }
        }
        return itinerary
    }

    async createItinerary(data: Itinerary) {
        try {
            itinerarySchema.parse(data)
        } catch (error) {
            if (error instanceof ZodError) {
                return {
                    message: error.errors.map((e) => e.message).join(', ')
                }
            }
        }

        const itinerary = await prisma.itinerary.create({ data })
        return {
            id: itinerary.id,
            message: 'Itinerario creado correctamente.'
        }
    }

    async updateItinerary(id: number, data: Itinerary) {
        try {
            itinerarySchema.parse(data)
        } catch (error) {
            if (error instanceof ZodError) {
                return {
                    message: error.errors.map((e) => e.message).join(', ')
                }
            }
        }
        const isExist = await prisma.itinerary.findUnique({ where: { id } })
        if (!isExist) {
            return {
                message: 'Itinerario no encontrado.'
            }
        }
        
        const itinerary = await prisma.itinerary.update({ where: { id }, data })
        return {
            id: itinerary.id,
            message: 'Itinerario actualizado correctamente.'
        }
    }

    async deleteItinerary(id: number) {
        try {
            const itinerary = await prisma.itinerary.findUnique({ where: { id } })
            if (!itinerary) {
                return {
                    message: 'Itinerario no encontrado.'
                }
            }
            await prisma.itinerary.delete({ where: { id } })
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