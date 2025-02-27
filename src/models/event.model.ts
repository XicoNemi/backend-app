import { Events, PrismaClient } from "@prisma/client";
import { userInfo } from "node:os";
import { z, ZodError } from "zod";

const prisma = new PrismaClient()

const eventSchema = z.object({
    userId: z.number().int().min(1, 'Campo requerido.'),
    name: z.string().min(1, 'Campo requerido.'),
    startDate: z.number().min(1, 'Campo requerido.'),
    endDate: z.number().min(1, 'Campo requerido.'),
    status: z.string().min(1, 'Campo requerido.')
})

export class EventModel {
    async getAllEvents() {
        const events = await prisma.events.findMany()
        if (events.length == 0) {
            return {
                message: 'No se encontraron eventos.'
            }
        }
        return events
    }

    async getEventById(id: number) {
        const event = await prisma.events.findUnique({ where: { id } })
        if (!event) {
            return {
                message: 'Evento no encontrado.'
            }
        }
        return event
    }

    async createEvent(data: Events) {
        try {
            eventSchema.parse(data)
        } catch (error) {
            if (error instanceof ZodError) {
                return {
                    message: error.errors.map((e) => e.message).join(', ')
                }
            }
        }

        const event = await prisma.events.create({ data })
        return {
            id: event.id,
            message: 'Evento creado correctamente.'
        }
    }

    async updateEvent(id: number, data: Events) {
        try {
            eventSchema.parse(data)
        } catch (error) {
            if (error instanceof ZodError) {
                return {
                    message: error.errors.map((e) => e.message).join(', ')
                }
            }
        }

        const event = await prisma.events.update({ where: { id }, data })
        return {
            id: event.id,
            message: 'Evento actualizado correctamente.'
        }
    }

    async deleteEvent(id: number) {
        try {
            const event = await prisma.events.findUnique({ where: { id } })
            if (!event) {
                return {
                    message: 'Evento no encontrado.'
                }
            }
            await prisma.events.delete({ where: { id } })
            return {
                message: 'Evento eliminado correctamente.'
            }
        } catch (error) {
            return {
                message: 'Evento no encontrado.'
            }
        }

    }
}