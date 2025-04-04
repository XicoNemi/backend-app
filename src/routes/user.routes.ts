import { Router } from 'express';
import {
  activeAccount,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  partialUpdateUser,
  createUserBySuperAdmin,
} from '../controllers/user.controller';

import { verifyToken } from '../middleware/verifyToken';
import { authorizeRole } from '../middleware/authorizeRole';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints for managing users
 */

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get the authenticated user's profile
 *     tags: [Users]
 *     description: Retrieves the profile of the authenticated user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *       401:
 *         description: Unauthorized. Invalid or missing token
 *       403:
 *         description: Forbidden. User does not have access to this resource
 */
router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: 'Profile user', user: req.user });
});

/**
 * @swagger
 * /users/admin:
 *   get:
 *     summary: Access the admin dashboard
 *     tags: [Users]
 *     description: Allows SuperAdmin to access the admin dashboard
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully accessed admin dashboard
 *       401:
 *         description: Unauthorized. Invalid or missing token
 *       403:
 *         description: Forbidden. User does not have the required role
 */
router.get('/admin', verifyToken, authorizeRole(['SuperAdmin']), (req, res) => {
  res.json({ message: 'Dashboard admin', user: req.user });
});

/**
 * @swagger
 * /users/super-admin:
 *   post:
 *     summary: Create a new user by SuperAdmin
 *     tags: [Users]
 *     description: Allows SuperAdmin to create a new user
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request. Invalid input data
 *       401:
 *         description: Unauthorized. Invalid or missing token
 *       403:
 *         description: Forbidden. User does not have the required role
 */
router.post(
  '/super-admin',
  verifyToken,
  authorizeRole(['SuperAdmin']),
  createUserBySuperAdmin
);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     description: Retrieves all registered users from the database
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
 *       401:
 *         description: Unauthorized. Invalid or missing token
 */
router.get('/', verifyToken, authorizeRole(['SuperAdmin']), getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     description: Retrieves a user by their ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Successfully retrieved user
 *       404:
 *         description: User not found
 */
router.get('/:id', verifyToken, getUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     description: Updates a user's information by their ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request. Invalid input data
 *       404:
 *         description: User not found
 */
router.put('/:id', verifyToken, updateUser);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Partially update a user by ID
 *     tags: [Users]
 *     description: Partially updates a user's information by their ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request. Invalid input data
 *       404:
 *         description: User not found
 */
router.patch('/:id', verifyToken, partialUpdateUser);

/**
 * @swagger
 * /users/change-password/{id}:
 *   patch:
 *     summary: Change a user's password
 *     tags: [Users]
 *     description: Allows a user to change their password
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Bad request. Invalid input data
 *       404:
 *         description: User not found
 */
router.patch('/change-password/:id', verifyToken, partialUpdateUser);

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     description: Deletes a user by their ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/delete/:id', verifyToken, deleteUser);

/**
 * @swagger
 * /users/verify-email/{token}:
 *   get:
 *     summary: Verify a user's email
 *     tags: [Users]
 *     description: Verifies a user's email using a token
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The verification token
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired token
 */
router.get('/verify-email/:token', activeAccount);

export default router;
