import { Router } from 'express';
import {
  signIn,
  signUp,
  googleAuth,
  facebookAuth,
  deleteUserByEmail,
} from '../controllers/auth.controller';
import signInLimiter from '../services/rateLimitService';

const router: Router = Router();

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Endpoints for authentication
 */

router.post('/google-auth', googleAuth);
router.post('/facebook-auth', facebookAuth);

/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     summary: Registro de usuario
 *     tags: [Auth]
 *     description: Crea una nueva cuenta de usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Luis Octavio"
 *               lastname:
 *                 type: string
 *                 example: "Lopez Martinez"
 *               email:
 *                 type: string
 *                 example: "octaviodevtech@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456789"
 *               tel:
 *                 type: string
 *                 example: "77612467882"
 *               birthday:
 *                 type: integer
 *                 example: 1739843141
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
router.post('/sign-up', signUp);

/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     summary: Inicia sesión de usuario
 *     tags: [Auth]
 *     description: Inicia sesión de usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "octaviodevtech@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456789"
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */

router.post('/sign-in', signInLimiter, signIn);

/**
 * @swagger
 * /auth/delete-user/{email}:
 *   delete:
 *     summary: Elimina un usuario por su correo electronico
 *     tags: [Auth]
 *     description: Elimina un usuario por su correo electronico
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Correo electronico del usuario a eliminar
 *         schema:
 *           type: string
 *         examples:
 *           email:
 *             value: "octaviodevtech@gmail.com"
 *             summary: Ejemplo de correo electrónico
 *             description: Correo electrónico del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado con exito
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/delete-user/:email', deleteUserByEmail);

export default router;
