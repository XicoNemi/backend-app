// import { PrismaClient, Route } from "@prisma/client";
// import { z, ZodError } from "zod";

// const prisma = new PrismaClient();

// const routeSchema = z.object({
//     data: z.any(), 
// });

// export class RouteModel {
//     async getAll() {
//         return await prisma.route.findMany();
//     }

//     async getById(id: number) {
//         return await prisma.route.findUnique({ where: { id } });
//     }

//     async create(data: Route) {
//         try {
//             routeSchema.parse(data);
//             return await prisma.route.create({ data });
//         } catch (error) {
//             return this.handleZodError(error);
//         }
//     }

//     async update(id: number, data: Route) {
//         return await prisma.route.update({ where: { id }, data });
//     }

//     async delete(id: number) {
//         return await prisma.route.delete({ where: { id } });
//     }

//     private handleZodError(error: unknown) {
//         if (error instanceof ZodError) {
//             return { message: error.errors.map(e => e.message).join(", ") };
//         }
//         return { message: "Error desconocido." };
//     }
// }
