import { PrismaClient, Subscriptions } from "@prisma/client";
import { z, ZodError } from "zod";
import { AppError } from "../utils/errorApp";

const prisma = new PrismaClient();

const subscriptionSchema = z.object({
    userId: z.string().min(1, 'Campo requerido.'),
    planId: z.string().min(1, 'Campo requerido.'),
    startDate: z.number().min(1, 'Campo requerido.'),
    endDate: z.number().min(1, 'Campo requerido.'),
    status: z.boolean().default(true)
});

export class SubscriptionModel {
    async getAllSubscriptions() {
        const subscriptions = await prisma.subscriptions.findMany();
        return subscriptions;
    }

    async createSubscription(data: Subscriptions) {
        try {
            subscriptionSchema.parse(data);
        } catch (error) {
            if (error instanceof ZodError) {
                const errorDetails = error.errors.map((e) => ({
                    field: e.path.join('.'),
                    message: e.message
                }));
                throw new AppError('Validation failed', 400, errorDetails);
            }
            throw new AppError('Unknown validation error', 400);
        }

        try {
            const subscription = await prisma.subscriptions.create({ data });
            return {
                message: 'Subscripción creada correctamente.',
                subscription
            };
        } catch (error) {
            throw new AppError('Error al crear la subscripción.', 500);
        }
    }

    async getSubscription(id: string) {
        try {
            const subscription = await prisma.subscriptions.findUnique({ where: { id } });
            if (!subscription) throw new AppError('La subscripción no existe.', 404);
            return subscription;
        } catch (error) {
            throw new AppError('Error al obtener la subscripción.', 500);
        }
    }

    async updateSubscription(id: string, data: Subscriptions) {
        try {
            subscriptionSchema.parse(data);
        } catch (error) {
            if (error instanceof ZodError) {
                const errorDetails = error.errors.map((e) => ({
                    field: e.path.join('.'),
                    message: e.message
                }));
                throw new AppError('Validation failed', 400, errorDetails);
            }
            throw new AppError('Unknown validation error', 400);
        }

        try {
            const subscription = await prisma.subscriptions.update({ where: { id }, data });
            return {
                message: 'Subscripción actualizada correctamente.',
                subscription
            };
        } catch (error) {
            throw new AppError('Error al actualizar la subscripción.', 500);
        }
    }

    async deleteSubscription(id: string) {
        try {
            const subscription = await prisma.subscriptions.findUnique({ where: { id } });
            if (!subscription) throw new AppError('La subscripción no existe.', 404);

            await prisma.subscriptions.delete({ where: { id } });
            return {
                message: 'Subscripción eliminada correctamente.'
            };
        } catch (error) {
            throw new AppError('Error al eliminar la subscripción.', 500);
        }
    }

    //? DATA CHART
    async getTotalClientsByPlan() {
        try {
            const result = await prisma.subscriptions.groupBy({
                by: ['planId'],
                _count: {
                    planId: true
                }
            });
    
            // Obtener los nombres de los planes
            const planIds = result.map(({ planId }) => planId);
            const plans = await prisma.plans.findMany({
                where: { id: { in: planIds } },
                select: { id: true, name: true }
            });
    
            // Mapear resultados con nombres de planes
            return result.map(({ planId, _count }) => {
                const plan = plans.find(p => p.id === planId);
                return {
                    planId,
                    planName: plan ? plan.name : 'Desconocido',
                    totalClients: _count.planId
                };
            });
    
        } catch (error) {
            throw new AppError('Error al obtener el total de clientes por plan.', 500);
        }
    }
    
}