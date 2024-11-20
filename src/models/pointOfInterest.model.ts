import { pointOfInterest, PrismaClient } from "@prisma/client";
import {z, ZodError} from 'zod';

const prisma = new PrismaClient();
const pointOfInterestSchema = z.object({
    name: z.string(),
    description: z.string(),
    image: z.string().min(1, "Campo requerido"),
    
})
export class PointModel{
    async getAllPoints(){
        const points = await prisma.pointOfInterest.findMany();
        if(points.length == 0){
            return {
                message: 'No se encontraron puntos de interés.'
            }
        }
        return points;
    }

    async getPointById(id: number){
        const point = await prisma.pointOfInterest.findUnique({where: {id}});
        if(!point){
            return {
                message: 'Punto de interés no encontrado.'
            }
        }
        return point;
    }

    async createPoint(data: pointOfInterest){
        try{
            pointOfInterestSchema.parse(data);
        }catch(error){
            if(error instanceof ZodError){
                return {
                    message: error.errors.map((e) => e.message).join(', ')
                }
            }
        }
        const point = await prisma.pointOfInterest.create({data});
        return {
            id: point.id,
            message: 'Punto de interés creado correctamente.'
        }
    }

    async updatePoint(id: number, data: pointOfInterest){
        try{
            pointOfInterestSchema.parse(data);
        }catch(error){
            if(error instanceof ZodError){
                return {
                    message: error.errors.map((e) => e.message).join(', ')
                }
            }
        }
        const point = await prisma.pointOfInterest.update({where: {id}, data});
        return {
            id: point.id,
            message: 'Punto de interés actualizado correctamente.'
        }
    }

    async deletePoint(id: number){
        try {
            const point = await prisma.pointOfInterest.findUnique({where: {id}});
            if(!point){
                return {
                    message: 'Punto de interés no encontrado.'
                }
            }
            await prisma.pointOfInterest.delete({where: {id}});
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