import { Router } from 'express';
import { backupDatabase } from '../../controllers/admin/backupController';
import { verifyToken } from '../../middleware/verifyToken';
import { authorizeRole } from '../../middleware/authorizeRole';

const router = Router();

router.post('/pg', verifyToken, authorizeRole(['SuperAdmin']), backupDatabase);

export default router;
