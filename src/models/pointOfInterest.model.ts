import { pointsOfInterest, PrismaClient } from "@prisma/client";
import {z, ZodError} from 'zod';

const prisma = new PrismaClient();
const pointOfInterestSchema = z.object({
    name: z.string(),
    description: z.string(),
    url_image: z.string().min(1, "Campo requerido"),
    locationId: z.number().int().min(1, "Campo requerido"),
    status: z.boolean()
})
export class PointModel{
    async getAllPoints(){
        const points = await prisma.pointsOfInterest.findMany();
        if(points.length == 0){
            return {
                message: 'No se encontraron puntos de interés.'
            }
        }
        return points;
    }

    async getPointById(id: string){
        const point = await prisma.pointsOfInterest.findUnique({where: {id}});
        if(!point){
            return {
                message: 'Punto de interés no encontrado.'
            }
        }
        return point;
    }

    async createPoint(data: pointsOfInterest){
        try{
            pointOfInterestSchema.parse(data);
        }catch(error){
            if(error instanceof ZodError){
                return {
                    message: error.errors.map((e) => e.message).join(', ')
                }
            }
        }
        const point = await prisma.pointsOfInterest.create({data});
        return {
            id: point.id,
            message: 'Punto de interés creado correctamente.'
        }
    }

    async updatePoint(id: string, data: pointsOfInterest){
        try{
            pointOfInterestSchema.parse(data);
        }catch(error){
            if(error instanceof ZodError){
                return {
                    message: error.errors.map((e) => e.message).join(', ')
                }
            }
        }
        const point = await prisma.pointsOfInterest.update({where: {id}, data});
        return {
            id: point.id,
            message: 'Punto de interés actualizado correctamente.'
        }
    }

    async deletePoint(id: string){
        try {
            const point = await prisma.pointsOfInterest.findUnique({where: {id}});
            if(!point){
                return {
                    message: 'Punto de interés no encontrado.'
                }
            }
            await prisma.pointsOfInterest.delete({where: {id}});
            return {
                message: 'Punto de interés eliminado correctamente.'
            }
        } catch (error) {
            return{
                message: 'Punto de interés no encontrado.'
            }
        }
      
    }
}