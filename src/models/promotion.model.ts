import { z } from 'zod';
import { PrismaClient, Promotions } from '@prisma/client';

const prisma = new PrismaClient();
const promotionSchema = z.object({
  businessId: z.string().min(1, 'El id del negocio debe tener un UUID .'),
  name: z.string().min(1, 'Campo requerido.'),
  description: z.string().min(1, 'Campo requerido.'),
  status: z.boolean(),
});

export class PromotionModel {
  async getAllPromotions() {
    const promotions = await prisma.promotions.findMany();
    if (promotions.length == 0) {
      return {
        message: 'No se encontraron promociones.',
      };
    }
    return promotions;
  }

  async getPromotionById(id: string) {
    const promotion = await prisma.promotions.findUnique({
      where: { id: id },
    });
    if (!promotion) {
      return {
        message: 'Promoción no encontrada.',
      };
    }
    return promotion;
  }

  async createPromotion(data: Promotions) {
    try {
      promotionSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          message: error.errors.map((e) => e.message).join(', '),
        };
      }
      return { message: 'Error desconocido' };
    }
    const promotion = await prisma.promotions.create({ data });
    return {
      id: promotion.id,
      message: 'Promoción creada correctamente.',
    };
  }

  async updatePromotion(id: string, data: Promotions) {
    try {
      promotionSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          message: error.errors.map((e) => e.message).join(', '),
        };
      }
      return { message: 'Error desconocido' };
    }
    const promotion = await prisma.promotions.update({
      where: { id: id },
      data: data,
    });
    if (!promotion) {
      return {
        message: 'Promoción no encontrada.',
      };
    }
    return {
      id: promotion.id,
      message: 'Promoción actualizada correctamente.',
    };
  }

  async deletePromotion(id: string) {
    const isExist = await prisma.promotions.findUnique({ where: { id: id } });
    if (!isExist) {
      return {
        message: 'Promoción no encontrada.',
      };
    }
    const promotion = await prisma.promotions.delete({
      where: { id: id },
    });

    return {
      id: promotion.id,
      message: 'Promoción eliminada correctamente.',
    };
  }
}
