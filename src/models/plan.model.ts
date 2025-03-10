import { PrismaClient, plans } from "@prisma/client";
import { z, ZodError } from "zod";
import { AppError } from "../utils/errorApp";

const prisma = new PrismaClient();

const planSchema = z.object({
    name: z.string().min(1, "Campo requerido."),
    price: z.number().min(1, "Campo requerido."),
    features: z.string().min(1, "Campo requerido."),
    status: z.boolean().default(false),
});

export class PlanModel {
    // ? GET ALL PLANS
    async getAllPlans() {
        const plans = await prisma.plans.findMany();
        return plans;
    }

    // ? CREATE PLAN
    async createPlan(data: plans) {
        try {
            planSchema.parse(data);
        } catch (error) {
            if (error instanceof ZodError) {
                const errorDetails = error.errors.map((e) => ({
                    field: e.path.join("."),
                    message: e.message,
                }));
                throw new AppError("Validation failed", 400, errorDetails);
            }
            throw new AppError("Unknown validation error", 400);
        }

        try {
            const isExist = await prisma.plans.findFirst({ where: { name: data.name } });
            if (isExist) {
                throw new AppError("El plan ya existe.", 409);
            }

            const plan = await prisma.plans.create({ data });
            return plan;
        } catch (error) {
            throw new AppError("Error al crear el plan.", 500);
        }
    }

    async getPlan(id: string) {
        try {
            const plan = await prisma.plans.findUnique({ where: { id } });
            if (!plan) throw new AppError("El plan no existe.", 404);
            return plan;
        } catch (error) {
            throw new AppError("Error al obtener el plan.", 500);
        }
    }

    // ? UPDATE PLAN
    async updatePlan(id: string, data: plans) {
        try {
            planSchema.parse(data);
        } catch (error) {
            if (error instanceof ZodError) {
                const errorDetails = error.errors.map((e) => ({
                    field: e.path.join("."),
                    message: e.message,
                }));
                throw new AppError("Validation failed", 400, errorDetails);
            }
            throw new AppError("Unknown validation error", 400);
        }

        try {
            const plan = await prisma.plans.update({ where: { id }, data });
            return plan;
        } catch (error) {
            throw new AppError("Error al actualizar el plan.", 500);
        }
    }

    // ? DELETE PLAN
    async deletePlan(id: string) {
        try {
            const isExist = await prisma.plans.findUnique({ where: { id } });
            if (!isExist) throw new AppError("El plan no existe.", 404);
            const plan = await prisma.plans.delete({ where: { id } });
            return {
                message: "Plan eliminado correctamente.",
                planId: plan.id,
            };
        } catch (error) {
            throw new AppError("Error al eliminar el plan.", 500);
        }
    }
}
