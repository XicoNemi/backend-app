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

router.get('/', verifyToken, getAllBusinesses);
router.get('/public', getPublicBusinesses);
router.get('/:id', verifyToken, getBusiness);
router.post('/', verifyToken, authorizeRole(['SuperAdmin', 'BusinessOwner']), createBusiness);
router.put('/:id', verifyToken, authorizeRole(['SuperAdmin', 'BusinessOwner']), updateBusiness);
router.delete('/:id', verifyToken, authorizeRole(['SuperAdmin', 'BusinessOwner']), deleteBusiness);

export default router;
