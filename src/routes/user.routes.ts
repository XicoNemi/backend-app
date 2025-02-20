import { Router } from 'express';
import {
  activeAccount,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../controllers/user.controller';

import { verifyToken } from '../utils/verifyToken';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Endpoints for users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Users]
 *     description: Obtiene todos los usuarios registrados en la base de datos
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Usuarios obtenidos con éxito
 *       401:
 *         description: No autorizado. Token inválido o no proporcionado
 */
router.get('/', verifyToken, getAllUsers);
router.get('/:id', verifyToken, getUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

router.get('/verify-email/:token', activeAccount);

export default router;
