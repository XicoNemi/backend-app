import { Router } from 'express';
import {
  backupDatabase,
  backupAndUploadToDrive,
} from '../../controllers/admin/backupController';
import { verifyToken } from '../../middleware/verifyToken';
import { authorizeRole } from '../../middleware/authorizeRole';

const router = Router();

router.post('/pg', verifyToken, authorizeRole(['SuperAdmin']), backupDatabase);
router.post('/drive', verifyToken, authorizeRole(['SuperAdmin']), backupAndUploadToDrive);

export default router;
