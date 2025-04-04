import { Router } from 'express';
import {
  signIn,
  signUp,
  googleAuth,
  facebookAuth,
  deleteUserByEmail,
  changePassword,
  logout,
} from '../controllers/admin/auth.controller';
import { signInCommon } from '../controllers/common/auth.controller';

const router: Router = Router();

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Endpoints for authentication
 */

/**
 * @swagger
 * /auth/google-auth:
 *   post:
 *     summary: Autenticación con Google
 *     tags: [Auth]
 *     description: Permite a los usuarios autenticarse utilizando Google
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tokenId:
 *                 type: string
 *                 example: "google_token_example"
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *       400:
 *         description: Error en la autenticación
 */
router.post('/google-auth', googleAuth);

/**
 * @swagger
 * /auth/facebook-auth:
 *   post:
 *     summary: Autenticación con Facebook
 *     tags: [Auth]
 *     description: Permite a los usuarios autenticarse utilizando Facebook
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accessToken:
 *                 type: string
 *                 example: "facebook_access_token_example"
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *       400:
 *         description: Error en la autenticación
 */
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
 *                 example: "xiconemi@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456789"
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
router.post('/sign-in', signIn);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Cierra la sesión del usuario
 *     tags: [Auth]
 *     description: Invalida el token del usuario y cierra la sesión
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sesión cerrada exitosamente
 *       401:
 *         description: No autorizado o token inválido
 */
router.post('/logout', logout);

/**
 * @swagger
 * /auth/sign-in-common:
 *   post:
 *     summary: Inicia sesión de usuario común
 *     tags: [Auth]
 *     description: Permite a los usuarios comunes iniciar sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "commonuser@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456789"
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
router.post('/sign-in-common', signInCommon);

/**
 * @swagger
 * /auth/delete-user/{email}:
 *   delete:
 *     summary: Elimina un usuario por su correo electrónico
 *     tags: [Auth]
 *     description: Elimina un usuario por su correo electrónico
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Correo electrónico del usuario a eliminar
 *         schema:
 *           type: string
 *         examples:
 *           email:
 *             value: "octaviodevtech@gmail.com"
 *             summary: Ejemplo de correo electrónico
 *             description: Correo electrónico del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/delete-user/:email', deleteUserByEmail);

/**
 * @swagger
 * /auth/change-password/{id}:
 *   patch:
 *     summary: Cambia la contraseña de un usuario
 *     tags: [Auth]
 *     description: Permite a un usuario cambiar su contraseña
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: "oldpassword123"
 *               newPassword:
 *                 type: string
 *                 example: "newpassword123"
 *               repeatPassword:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Usuario no encontrado
 */
router.patch('/change-password/:id', changePassword);

export default router;
