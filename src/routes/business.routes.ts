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
router.get('/public', getPublicBusinesses);
router.get('/:id', verifyToken, getBusiness);
router.post(
  '/',
  verifyToken,
  authorizeRole(['SuperAdmin', 'BusinessOwner']),
  createBusiness
);
router.put(
  '/:id',
  verifyToken,
  authorizeRole(['SuperAdmin', 'BusinessOwner']),
  updateBusiness
);
router.delete(
  '/:id',
  verifyToken,
  authorizeRole(['SuperAdmin', 'BusinessOwner']),
  deleteBusiness
);

export default router;
