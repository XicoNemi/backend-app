import { Router } from 'express';
import {
  createLocation,
  deleteLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
} from '../controllers/location.controller';
import { verifyToken } from '../middleware/verifyToken';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Location
 *   description: Operaciones de gestión de ubicaciones
 *
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID único de la ubicación
 *         street:
 *           type: string
 *           description: Calle/dirección de la ubicación
 *         lat:
 *           type: string
 *           description: Latitud en formato decimal como string
 *         lng:
 *           type: string
 *           description: Longitud en formato decimal como string
 *     LocationInput:
 *       type: object
 *       required:
 *         - street
 *         - lat
 *         - lng
 *       properties:
 *         street:
 *           type: string
 *           description: Calle/dirección de la ubicación
 *         lat:
 *           type: string
 *           description: Latitud en formato decimal como string
 *         lng:
 *           type: string
 *           description: Longitud en formato decimal como string
 */

/**
 * @swagger
 * /locations:
 *   get:
 *     summary: Obtiene todas las ubicaciones
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas las ubicaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 *       401:
 *         description: No autorizado - token inválido o no proporcionado
 *       500:
 *         description: Error del servidor
 */
router.get('/', verifyToken, getAllLocations);

/**
 * @swagger
 * /locations/{id}:
 *   get:
 *     summary: Obtiene una ubicación por ID
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la ubicación
 *     responses:
 *       200:
 *         description: Datos de la ubicación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Ubicación no encontrada
 *       401:
 *         description: No autorizado - token inválido o no proporcionado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', verifyToken, getLocationById);

/**
 * @swagger
 * /locations:
 *   post:
 *     summary: Crea una nueva ubicación
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LocationInput'
 *     responses:
 *       201:
 *         description: Ubicación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       400:
 *         description: Datos de entrada inválidos (validación fallida)
 *       401:
 *         description: No autorizado - token inválido o no proporcionado
 *       500:
 *         description: Error del servidor
 */
router.post('/', verifyToken, createLocation);

/**
 * @swagger
 * /locations/{id}:
 *   put:
 *     summary: Actualiza una ubicación existente
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la ubicación a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LocationInput'
 *     responses:
 *       200:
 *         description: Ubicación actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       400:
 *         description: Datos de entrada inválidos (validación fallida)
 *       404:
 *         description: Ubicación no encontrada
 *       401:
 *         description: No autorizado - token inválido o no proporcionado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', verifyToken, updateLocation);

/**
 * @swagger
 * /locations/delete/{id}:
 *   delete:
 *     summary: Elimina una ubicación
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la ubicación a eliminar
 *     responses:
 *       204:
 *         description: Ubicación eliminada exitosamente (no devuelve contenido)
 *       404:
 *         description: Ubicación no encontrada
 *       401:
 *         description: No autorizado - token inválido o no proporcionado
 *       500:
 *         description: Error del servidor
 */
router.delete('/delete/:id', verifyToken, deleteLocation);

export default router;
