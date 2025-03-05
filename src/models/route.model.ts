import { PrismaClient, Routes } from "@prisma/client";
import { z, ZodError } from "zod";

const prisma = new PrismaClient();

const routeSchema = z.object({
    ownerId: z.number().int().min(1, "Campo requerido."),
    name: z.string().min(1, "Campo requerido."),
    description: z.string().min(1, "Campo requerido."),
    stravaData: z.any().optional(),
    distance: z.number().positive().optional(),
    time: z.number().int().positive().optional(),
    status: z.boolean().default(false),
});

export class RoutesModel {
    async getAllRoutes() {
        try {
            const routes = await prisma.routes.findMany();
            if(routes.length === 0) {
                return { message: "No hay rutas." };
            }
            return routes;
        }
        catch (error) {
            return { message: "Error desconocido." };
        }
    }

    async  createRoute(data: Routes) {
        try {
            routeSchema.parse(data);
        } catch (error) {
            if (error instanceof ZodError) {
                return { message: error.errors.map(e => e.message).join(", ") };
            }
            return { message: "Error desconocido." };
        }

        const route = await prisma.routes.create({ data: { ...data, stravaData: data.stravaData ?? undefined } });
        return { id: route.id, message: "Ruta creada correctamente." };
    }
}
