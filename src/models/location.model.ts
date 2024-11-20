import { PrismaClient, Location} from "@prisma/client";
import { z, ZodError} from "zod";

const prisma = new PrismaClient();
const locationSchema = z.object({
    street: z.string().min(1, "Campo requerido."),
    lat: z.string().min(1, "Campo requerido."),
    lng: z.string().min(1, "Campo requerido."),
})
export class LocationModel {
    async getLocations() {
        const locations = await prisma.location.findMany();
        if(locations.length == 0) {
            return {
                message: "No se encontraron ubicaciones."
            };
        }
        return locations;
    }

    async getLocationById(id: number) {
        const location = await prisma.location.findUnique({ where: { id } });
        if(!location) {
            return {
                message: "Ubicación no encontrada." 
            }
        }
        return location;
    }

    async createLocation(data: Location) {
        try {
            locationSchema.parse(data);
        } catch (error) {
            if (error instanceof ZodError) {
                return {
                    message: error.errors.map(e => e.message).join(", ")
                };
            }
        }

        const location = await prisma.location.create({ data });
        return {
            id: location.id,
            message: "Ubicación creada correctamente."
        };
    }

    async updateLocation(id: number, data: Location) {
        try {
            locationSchema.parse(data);
        } catch (error) {
            if (error instanceof ZodError) {
                return {
                    message: error.errors.map(e => e.message).join(", "),
                };
            }
            return { message: "Error desconocido." };
        }
    
        const existingLocation = await prisma.location.findUnique({ where: { id } });
        if (!existingLocation) {
            return {
                message: "No se encontró la ubicación.",
            };
        }
    
        const location = await prisma.location.update({ where: { id }, data });
        return {
            id: location.id,
            message: "Ubicación actualizada correctamente.",
        };
    }
    

    async deleteLocation(id: number) {
        try {
            const location = await prisma.location.delete({ where: { id } })
            return {
                message: "Ubicación eliminada correctamente."
            }
        } catch (error) {

            return {
                message: "No se encontró la ubicación."
            }
            
        }
    }
}