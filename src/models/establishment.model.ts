// import { Establishment, PrismaClient } from "@prisma/client";
// import { z, ZodError } from "zod";

// const prisma = new PrismaClient();
// const establishmentSchema = z.object({
//     name: z.string().min(1, "Campo requerido."),
//     description: z.string().min(1, "Campo requerido."),
//     schedule: z.number().min(1, "Campo requerido"),
//     image: z.string().min(1, "Campo requerido"),
//     type: z.string().min(1, "Campo requerido"),
//     locationId: z.number().min(1, "Campo requerido")
// })

// export class EstablishmentModel {
//     async getAllEstabs() {
//         const estabs = await prisma.establishment.findMany();
//         if (estabs.length == 0) {
//             return { message: "No hay establecimientos." };
//         }
//         return estabs;
//     }

//     async getEstabById(id: number) {
//         const estab = await prisma.establishment.findUnique({ where: { id } });
//         if (!estab) {
//             return { message: "Establecimiento no encontrado." };
//         }
//         return estab;
//     }

//     async createEstab(data: Establishment) {
//         try {
//             establishmentSchema.parse(data);
//         } catch (error) {
//             if (error instanceof ZodError) {
//                 return {
//                     message: error.errors.map(e => e.message).join(", ")
//                 };
//             }
//             return { message: "Error desconocido" };
//         }
//         const isExist = await prisma.location.findUnique({ where: { id:data.locationId } });
//         if (!isExist) {
//             return { message: "La ubicación no existe." };
//         }

//         const estab = await prisma.establishment.create({ data });
//         return {
//             id: estab.id,
//             message: "Establecimiento creado correctamente."
//         };
//     }

//     async updateEstab(id: number, data: Establishment) {
//         try {
//             establishmentSchema.parse(data)
//         } catch (error) {
//             if (error instanceof ZodError) {
//                 return {
//                     message: error.errors.map(e => e.message).join(", ")
//                 };
//             }
//             return { message: "Error desconocido" }
//         }

//         const isExist = await prisma.establishment.findUnique({ where: { id } })
//         if (isExist) {
//             await prisma.establishment.updateMany({ where: { id }, data })
//         }

//         return {
//             message: "Usuario actualizado correctamente."
//         };

//     }

//     async deleteEstab(id: number) {
//         const estabDeleted = await prisma.establishment.delete({
//             where: { id }
//         })

//         if (estabDeleted) {
//             return {
//                 id: estabDeleted.id,
//                 message: "Establecimiento eliminado correctamente."
//             }
//         }
//     }
// }