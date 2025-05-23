import { PrismaClient, Businesses, CategoryType } from '@prisma/client';
import { z, ZodError } from 'zod';

const prisma = new PrismaClient();

const businessSchema = z.object({
  ownerId: z.string().min(1, 'Campo requerido.'),
  name: z.string().min(1, 'Campo requerido.'),
  description: z.string().min(1, 'Campo requerido.'),
  category: z.string().min(1, 'Campo requerido.'),
  address: z.string().min(1, 'Campo requerido.'),
  tel: z.string().min(1, 'Campo requerido.'),
  social_networks: z.record(z.string().min(1), z.string().min(1)).nullable().optional(),
  status: z.boolean(),
});

export class BusinessModel {
  // async getAllBusinesses(filter?: CategoryType) {
  //     if (filter) {
  //         return await prisma.businesses.findMany({
  //             where: {
  //                 category: filter
  //             }
  //         })
  //     }
  //     return await prisma.businesses.findMany();
  // }
  async getAllBusinesses(ownerId?: string, typeUser?: string) {
    if (typeUser === 'SuperAdmin') {
      const businesses = await prisma.businesses.findMany();
      if (businesses.length == 0) {
        return { message: 'No hay negocios disponibles.' };
      }
      return businesses;
    } else if (ownerId) {
      const username = await prisma.users.findUnique({ where: { id: ownerId } });

      const businesses = await prisma.businesses.findMany({
        where: {
          ownerId: ownerId,
        },
      });

      if (businesses.length == 0) {
        return { message: 'No hay negocios asociados al usuario ' + username?.name };
      }
      return businesses;
    } else {
      return { message: 'No se proporcionó un ownerId válido.' };
    }
  }

  async getBusiness(id: string) {
    const business = await prisma.businesses.findUnique({ where: { id } });
    if (!business) {
      return { message: 'Negocio no encontrado.' };
    }
    return business;
  }

  async createBusiness(data: Businesses) {
    try {
      businessSchema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        return { message: error.errors.map((e) => e.message).join(', ') };
      }
      return { message: 'Error desconocido.' };
    }

    const isExist = await prisma.businesses.findFirst({ where: { name: data.name } });
    if (isExist) {
      return { message: 'El negocio ya existe.' };
    }

    const business = await prisma.businesses.create({
      data: { ...data, social_networks: data.social_networks ?? undefined },
    });
    return { id: business.id, message: 'Negocio creado correctamente.' };
  }

  async updateBusiness(id: string, data: Businesses) {
    try {
      businessSchema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        return { message: error.errors.map((e) => e.message).join(', ') };
      }
      return { message: 'Error desconocido.' };
    }

    const isExist = await prisma.businesses.findUnique({ where: { id } });
    if (!isExist) {
      return { message: 'Negocio no encontrado.' };
    }

    await prisma.businesses.update({
      where: { id },
      data: { ...data, social_networks: data.social_networks ?? undefined },
    });
    return { message: 'Negocio actualizado correctamente.' };
  }

  async deleteBusiness(id: string) {
    const isExist = await prisma.businesses.findUnique({ where: { id } });
    if (!isExist) {
      return { message: 'Negocio no encontrado.' };
    }

    await prisma.businesses.delete({ where: { id } });
    return { message: 'Negocio eliminado correctamente.' };
  }



  async getPublicBusinesses(type?: CategoryType) {
    if (type) {
      const businesses = await prisma.businesses.findMany({
        where: type ? { category: type } : undefined,
        include: {
          reviews: {
            select: {
              rating: true
            }
          }
        }
      });

      // Calcular el promedio de rating por negocio
      const businessesWithRatings = businesses.map(({ reviews, ...business }) => ({
        ...business,
        averageRating: reviews.length > 0
          ? reviews.reduce((sum, review) => sum + review.rating.toNumber(), 0) / reviews.length
          : 0
      }));

      if (businessesWithRatings.length === 0) {
        return { message: 'No hay negocios disponibles.' };
      }

      return businessesWithRatings;
    } else {
      const businesses = await prisma.businesses.findMany({
        include: {
          reviews: {
            select: {
              rating: true
            }
          }
        }
      });

      // Calcular el promedio de rating por negocio
      const businessesWithRatings = businesses.map(({ reviews, ...business }) => ({
        ...business,
        averageRating: reviews.length > 0
          ? reviews.reduce((sum, review) => sum + review.rating.toNumber(), 0) / reviews.length
          : 0
      }));

      if (businessesWithRatings.length === 0) {
        return { message: 'No hay negocios disponibles.' };
      }

      return businessesWithRatings;
    }
  }

}
