import { Events, PrismaClient } from '@prisma/client';
import { z, ZodError } from 'zod';

const prisma = new PrismaClient();

const eventSchema = z.object({
  userId: z.string().min(1, 'Campo requerido.'),
  name: z.string().min(1, 'Campo requerido.'),
  description: z.string().min(1, 'Campo requerido.'),
  startDate: z.number().min(1, 'Campo requerido.'),
  endDate: z.number().min(1, 'Campo requerido.'),
});

export class EventModel {
  async getAllEvents() {
    const events = await prisma.events.findMany();
    if (events.length == 0) {
      return {
        message: 'No se encontraron eventos.',
      };
    }
    return events;
  }

  async getEventById(id: string) {
    const event = await prisma.events.findUnique({ where: { id } });
    if (!event) {
      return {
        message: 'Evento no encontrado.',
      };
    }
    return event;
  }

  async createEvent(data: Omit<Events, 'id'> & { businessId: string }) {
    try {
      eventSchema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          message: error.errors.map((e) => e.message).join(', '),
        };
      }
    }

    const business = await prisma.businesses.findFirst({
      where: {
        id: data.businessId,
      },
    });
    if (!business) {
      return {
        message: 'Negocio no encontrado.',
      };
    } else {
      const { businessId, ...eventData } = data;
      const event = await prisma.events.create({ data: eventData });
      await prisma.businessHasEvent.create({
        data: {
          businessId: business.id,
          eventId: event.id,
        },
      });
      return {
        id: event.id,
        message: 'Evento creado correctamente.',
      };
    }
  }

  async updateEvent(id: string, data: Events) {
    try {
      eventSchema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          message: error.errors.map((e) => e.message).join(', '),
        };
      }
    }

    const event = await prisma.events.update({ where: { id }, data });
    return {
      id: event.id,
      message: 'Evento actualizado correctamente.',
    };
  }

  async deleteEvent(id: string) {
    try {
      const event = await prisma.events.findUnique({ where: { id } });
      if (!event) {
        return {
          message: 'Evento no encontrado.',
        };
      }
      await prisma.events.delete({ where: { id } });
      return {
        message: 'Evento eliminado correctamente.',
      };
    } catch (error) {
      return {
        message: 'Evento no encontrado.',
      };
    }
  }

  async getEventsByBusinessId(id: string) {
    const events = await prisma.businessHasEvent.findMany({
      where: { businessId: id },
      include: { event: true },
    });
    if (events.length == 0) {
      return false;
    }
    return events;
  }
}
