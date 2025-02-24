import { Router } from 'express';
import {
  activeAccount,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  partialUpdateUser,
} from '../controllers/user.controller';

import { verifyToken } from '../middleware/verifyToken';
import { authorizeRole } from '../middleware/authorizeRole';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Endpoints for users
 */

router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: 'Profile user', user: req.user });
});

router.get('/admin', verifyToken, authorizeRole(['ADMIN']), (req, res) => {
  res.json({ message: 'Dashboard admin', user: req.user });
});

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
router.patch('/:id', verifyToken, partialUpdateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

router.get('/verify-email/:token', activeAccount);

export default router;
