import { Router } from 'express';
import {
  getAverageRating,
  getTotalClientsdByPlan,
  getUserStats,
} from '../controllers/stats.controller';
import { verifyToken } from '../middleware/verifyToken';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Stats
 *   description: Operaciones de estadísticas
 */

/**
 * @swagger
 * /stats/user-gender:
 *   get:
 *     summary: Obtiene estadísticas de usuarios por género
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas de género de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 male:
 *                   type: integer
 *                   description: Número de usuarios masculinos
 *                 female:
 *                   type: integer
 *                   description: Número de usuarios femeninos
 *                 other:
 *                   type: integer
 *                   description: Número de usuarios con otro género
 *       401:
 *         description: No autorizado - token inválido o no proporcionado
 *       500:
 *         description: Error del servidor
 */
router.get('/user-gender', verifyToken, getUserStats);

/**
 * @swagger
 * /stats/average-rating:
 *   get:
 *     summary: Obtiene el rating promedio de las reseñas
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Rating promedio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 averageRating:
 *                   type: number
 *                   format: float
 *                   description: El valor promedio de todas las calificaciones
 *       401:
 *         description: No autorizado - token inválido o no proporcionado
 *       500:
 *         description: Error del servidor
 */
router.get('/average-rating', verifyToken, getAverageRating);

/**
 * @swagger
 * /stats/total-clients-by-plan:
 *   get:
 *     summary: Obtiene el total de clientes por tipo de plan
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas de clientes por plan
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   plan:
 *                     type: string
 *                     description: Nombre del plan
 *                   count:
 *                     type: integer
 *                     description: Número de clientes con este plan
 *       401:
 *         description: No autorizado - token inválido o no proporcionado
 *       500:
 *         description: Error del servidor
 */
router.get('/total-clients-by-plan', verifyToken, getTotalClientsdByPlan);

export default router;
