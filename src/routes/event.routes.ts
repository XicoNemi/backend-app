import { Router } from 'express';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventByBusinessId,
} from '../controllers/event.controller';
import { verifyToken } from '../middleware/verifyToken';
import { authorizeRole } from '../middleware/authorizeRole';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Event
 *   description: Operaciones de gestión de eventos
 *
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID único del evento
 *         userId:
 *           type: string
 *           format: uuid
 *           description: ID del usuario creador
 *         name:
 *           type: string
 *           description: Nombre del evento
 *         description:
 *           type: string
 *           description: Descripción del evento
 *         url_image:
 *           type: string
 *           nullable: true
 *           description: URL de la imagen del evento (opcional)
 *         startDate:
 *           type: integer
 *           description: Fecha de inicio en timestamp Unix
 *         endDate:
 *           type: integer
 *           description: Fecha de fin en timestamp Unix
 *         status:
 *           type: boolean
 *           description: Estado activo/inactivo del evento
 *         type:
 *           type: string
 *           enum: [General, Cultural, Gastronomico, Aventura, Relax, Familiar, Otro]
 *           description: Tipo de evento
 *     EventInput:
 *       type: object
 *       required:
 *         - userId
 *         - name
 *         - description
 *         - startDate
 *         - endDate
 *         - type
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *           description: ID del usuario creador
 *         businessId:
 *           type: string
 *           format: uuid
 *           description: ID del negocio asociado (opcional)
 *         name:
 *           type: string
 *           description: Nombre del evento
 *         description:
 *           type: string
 *           description: Descripción del evento
 *         url_image:
 *           type: string
 *           nullable: true
 *           description: URL de la imagen del evento (opcional)
 *         startDate:
 *           type: integer
 *           description: Fecha de inicio en timestamp Unix
 *         endDate:
 *           type: integer
 *           description: Fecha de fin en timestamp Unix
 *         type:
 *           type: string
 *           enum: [General, Cultural, Gastronomico, Aventura, Relax, Familiar, Otro]
 *           description: Tipo de evento
 *     EventType:
 *       type: string
 *       enum: [General, Cultural, Gastronomico, Aventura, Relax, Familiar, Otro]
 *       description: Tipos de eventos disponibles
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Obtiene todos los eventos
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos los eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       401:
 *         description: No autorizado - token inválido o no proporcionado
 *       500:
 *         description: Error del servidor
 */
router.get('/', verifyToken, getAllEvents);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Obtiene un evento por ID
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Datos del evento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Evento no encontrado
 *       401:
 *         description: No autorizado - token inválido o no proporcionado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', verifyToken, getEventById);

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Crea un nuevo evento
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventInput'
 *     responses:
 *       201:
 *         description: Evento creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Datos de entrada inválidos (validación fallida)
 *       401:
 *         description: No autorizado - token inválido o no proporcionado
 *       500:
 *         description: Error del servidor
 */
router.post('/', verifyToken, createEvent);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Actualiza un evento existente
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID del evento a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventInput'
 *     responses:
 *       200:
 *         description: Evento actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Datos de entrada inválidos (validación fallida)
 *       401:
 *         description: No autorizado - token inválido o no proporcionado o sin rol requerido
 *       403:
 *         description: Prohibido - no tienes permisos para esta acción
 *       404:
 *         description: Evento no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put(
  '/:id',
  verifyToken,
  authorizeRole(['SuperAdmin', 'BusinessOwner']),
  updateEvent
);

/**
 * @swagger
 * /events/delete/{id}:
 *   delete:
 *     summary: Elimina un evento
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID del evento a eliminar
 *     responses:
 *       204:
 *         description: Evento eliminado exitosamente (no devuelve contenido)
 *       401:
 *         description: No autorizado - token inválido o no proporcionado o sin rol requerido
 *       403:
 *         description: Prohibido - no tienes permisos para esta acción
 *       404:
 *         description: Evento no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete(
  '/delete/:id',
  verifyToken,
  authorizeRole(['SuperAdmin', 'BusinessOwner']),
  deleteEvent
);

/**
 * @swagger
 * /events/business/{id}:
 *   get:
 *     summary: Obtiene eventos por ID de negocio
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID del negocio
 *     responses:
 *       200:
 *         description: Lista de eventos asociados al negocio
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       404:
 *         description: Negocio no encontrado o sin eventos
 *       500:
 *         description: Error del servidor
 */
router.get('/business/:id', getEventByBusinessId);

export default router;
