import { Router } from 'express';
import {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  getReviewsByBusinessId,
} from '../controllers/review.controller';
import { verifyToken } from '../middleware/verifyToken';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Review
 *   description: Operaciones de gestión de reseñas
 *
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID único de la reseña
 *         userId:
 *           type: string
 *           format: uuid
 *           description: ID del usuario que hizo la reseña
 *         businessId:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: ID del negocio evaluado (opcional)
 *         eventId:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: ID del evento evaluado (opcional)
 *         rating:
 *           type: number
 *           format: float
 *           minimum: 1
 *           maximum: 5
 *           description: Calificación (1.0 a 5.0)
 *         comment:
 *           type: string
 *           nullable: true
 *           description: Comentario de la reseña
 *     ReviewInput:
 *       type: object
 *       required:
 *         - userId
 *         - rating
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *           description: ID del usuario que hace la reseña
 *         businessId:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: ID del negocio evaluado (debe proveerse businessId o eventId)
 *         eventId:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: ID del evento evaluado (debe proveerse businessId o eventId)
 *         rating:
 *           type: number
 *           format: float
 *           minimum: 1
 *           maximum: 5
 *           description: Calificación (1.0 a 5.0)
 *         comment:
 *           type: string
 *           nullable: true
 *           description: Comentario de la reseña
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Obtiene todas las reseñas
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: Lista de todas las reseñas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       500:
 *         description: Error del servidor
 */
router.get('/', getAllReviews);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Obtiene una reseña por ID
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la reseña
 *     responses:
 *       200:
 *         description: Datos de la reseña
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Reseña no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', getReview);

/**
 * @swagger
 * /reviews/business/{businessId}:
 *   get:
 *     summary: Obtiene reseñas por ID de negocio
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: businessId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID del negocio
 *     responses:
 *       200:
 *         description: Lista de reseñas del negocio
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: Negocio no encontrado o sin reseñas
 *       500:
 *         description: Error del servidor
 */
router.get('/business/:businessId', getReviewsByBusinessId);

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Crea una nueva reseña
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewInput'
 *     responses:
 *       201:
 *         description: Reseña creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Datos inválidos (debe proveerse businessId o eventId, rating entre 1-5)
 *       500:
 *         description: Error del servidor
 */
router.post('/', createReview);

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Actualiza una reseña existente
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la reseña a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewInput'
 *     responses:
 *       200:
 *         description: Reseña actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Datos inválidos (rating debe estar entre 1-5)
 *       401:
 *         description: No autorizado - token inválido o no proporcionado
 *       403:
 *         description: Prohibido - solo el creador puede modificar la reseña
 *       404:
 *         description: Reseña no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', verifyToken, updateReview);

/**
 * @swagger
 * /reviews/delete/{id}:
 *   delete:
 *     summary: Elimina una reseña
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la reseña a eliminar
 *     responses:
 *       204:
 *         description: Reseña eliminada exitosamente (no devuelve contenido)
 *       401:
 *         description: No autorizado - token inválido o no proporcionado
 *       403:
 *         description: Prohibido - solo el creador o admin puede eliminar la reseña
 *       404:
 *         description: Reseña no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete('/delete/:id', verifyToken, deleteReview);

export default router;
