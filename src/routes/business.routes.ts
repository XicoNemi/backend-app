import {
  createBusiness,
  deleteBusiness,
  getAllBusinesses,
  getBusiness,
  getPublicBusinesses,
  updateBusiness,
} from '../controllers/business.controller';
import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken';
import { authorizeRole } from '../middleware/authorizeRole';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Business
 *   description: Endpoints for managing businesses
 */

/**
 * @swagger
 * /businesses:
 *   get:
 *     summary: Get all businesses
 *     tags: [Business]
 *     description: Retrieves a list of all businesses
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all businesses
 *       401:
 *         description: Unauthorized. Invalid or missing token
 *       403:
 *         description: Forbidden. User does not have access to this resource
 *       404:
 *         description: Not Found. No businesses found
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request
 */

router.get('/', verifyToken, getAllBusinesses);

/**
 * @swagger
 * /businesses/public:
 *   get:
 *     summary: Get public businesses
 *     tags: [Business]
 *     description: Retrieves a list of businesses marked as public (no authentication required)
 *     responses:
 *       200:
 *         description: Successfully retrieved public businesses
 *       404:
 *         description: Not Found. No public businesses available
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request
 */

router.get('/public', getPublicBusinesses);

/**
 * @swagger
 * /businesses/{id}:
 *   get:
 *     summary: Get a specific business
 *     tags: [Business]
 *     description: Retrieves details of a specific business by ID (requires authentication)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the business to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the business
 *       401:
 *         description: Unauthorized. Invalid or missing token
 *       403:
 *         description: Forbidden. User does not have access to this resource
 *       404:
 *         description: Not Found. Business with the specified ID not found
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request
 */

router.get('/:id', verifyToken, getBusiness);

/**
 * @swagger
 * /businesses:
 *   post:
 *     summary: Create a new business
 *     tags: [Business]
 *     description: Creates a new business (requires SuperAdmin or BusinessOwner role)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the business
 *               description:
 *                 type: string
 *                 description: Description of the business
 *               isPublic:
 *                 type: boolean
 *                 description: Whether the business is publicly visible
 *             example:
 *               name: "My Awesome Business"
 *               description: "We provide excellent services"
 *               isPublic: true
 *     responses:
 *       201:
 *         description: Business successfully created
 *       400:
 *         description: Bad Request. Missing or invalid parameters
 *       401:
 *         description: Unauthorized. Invalid or missing token
 *       403:
 *         description: Forbidden. User does not have required role
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request
 */

router.post(
  '/',
  verifyToken,
  authorizeRole(['SuperAdmin', 'BusinessOwner']),
  createBusiness
);

/**
 * @swagger
 * /businesses/{id}:
 *   put:
 *     summary: Update a business
 *     tags: [Business]
 *     description: Updates an existing business by ID (requires SuperAdmin or BusinessOwner role)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the business to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ownerId:
 *                type: string
 *               name:
 *                 type: string
 *                
 * 
 *     responses:
 *       200:
 *         description: Business successfully updated
 *       400:
 *         description: Bad Request. Missing or invalid parameters
 *       401:
 *         description: Unauthorized. Invalid or missing token
 *       403:
 *         description: Forbidden. User does not have required role
 *       404:
 *         description: Not Found. Business with the specified ID not found
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request
 */

router.put(
  '/:id',
  verifyToken,
  authorizeRole(['SuperAdmin', 'BusinessOwner']),
  updateBusiness
);

/**
 * @swagger
 * /businesses/{id}:
 *   delete:
 *     summary: Delete a business
 *     tags: [Business]
 *     description: Deletes a business by ID (requires SuperAdmin or BusinessOwner role)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the business to delete
 *     responses:
 *       200:
 *         description: Business successfully deleted
 *       401:
 *         description: Unauthorized. Invalid or missing token
 *       403:
 *         description: Forbidden. User does not have required role
 *       404:
 *         description: Not Found. Business with the specified ID not found
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request
 */

router.delete(
  '/:id',
  verifyToken,
  authorizeRole(['SuperAdmin', 'BusinessOwner']),
  deleteBusiness
);

export default router;
