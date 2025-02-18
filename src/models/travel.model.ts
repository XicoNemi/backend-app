import { PrismaClient } from '@prisma/client';
import {z, ZodError} from 'zod';

const prisma = new PrismaClient();

const travelSchema  = z.object({
    name: z.string().min(1, "Campo requerido."),
    distance: z.number().min(1, "Campo requerido."),
    time: z.number().min(1, "Campo requerido."),

})

export class traveModel {
     async getTravels() {
        const travels = await prisma.travel.findMany();
        if(travels.length == 0) {
            return {
                message: "No se encontraron viajes."
            };
        }
        return travels;
     }
}