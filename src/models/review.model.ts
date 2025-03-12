import { PrismaClient, Reviews } from "@prisma/client";
import { z, ZodError } from "zod";
import { AppError } from "../utils/errorApp";


const prisma = new PrismaClient();

const reviewSchema = z.object({
    userId: z.string().min(1, "Campo requerido."),
    businessId: z.string().min(1, "Campo requerido.").optional(),
    eventId: z.string().min(1, "Campo requerido.").optional(),
    rating: z.number().min(1, "Campo requerido."),
    comment: z.string().min(1, "Campo requerido."),
});

export class ReviewModel {
    // ? GET ALL REVIEWS
    async getAllReviews() {
        const reviews = await prisma.reviews.findMany();
        return reviews;
    }

    // ? CREATE REVIEW
    async createReview(data: Reviews) {
        try {
            reviewSchema.parse(data);
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
            const review = await prisma.reviews.create({ data });
            return {
                message: "Reseña creada correctamente.",
                review,
            };
        } catch (error) {
            throw new AppError("Error al crear la reseña.", 500);
        }
    }

    async getReview(id: string) {
        try {
            const review = await prisma.reviews.findUnique({ where: { id } });
            if (!review) throw new AppError("La reseña no existe.", 404);
            return review;
        } catch (error) {
            throw new AppError("Error al obtener la reseña.", 500);
        }
    }

    // ? UPDATE REVIEW
    async updateReview(id: string, data: Reviews) {
        try {
            const review = await prisma.reviews.findUnique({ where: { id } });
            if (!review) throw new AppError("La reseña no existe.", 404);

            try {
                reviewSchema.parse(data);
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

            const updatedReview = await prisma.reviews.update({ where: { id }, data });
            return updatedReview;
        } catch (error) {
            throw new AppError("Error al actualizar la reseña.", 500);
        }
    }

    // ? DELETE REVIEW
    async deleteReview(id: string) {
        try {
            const review = await prisma.reviews.findUnique({
                where:

                    { id }
            });
            if (!review) throw new AppError("La reseña no existe.", 404);
        } catch (error) {
            throw new AppError("Error al obtener la reseña.", 500);
        }
    }

    //? DATA CHART 
    async getAverageRating() {
        const reviews = await prisma.reviews.groupBy({
            by: ['businessId'],
            _avg: { rating: true }
        });

        if (!reviews?.length) throw new AppError("No hay reseñas", 404);

        const businessNames = await Promise.all(
            reviews.map(async (rating) => {
                if (rating.businessId) {
                    const business = await prisma.businesses.findUnique({
                        where: { id: rating.businessId },
                        select: { name: true }
                    });
                    return {
                        businessId: rating.businessId,
                        name: business?.name || "No name",
                        rating: rating._avg.rating
                    }
                }
            })
        )
        return businessNames;
    }

}