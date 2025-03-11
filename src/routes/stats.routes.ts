import { Router } from 'express';
import { getUserStats } from '../controllers/stats.controller';
import { verifyToken } from '../middleware/verifyToken';

const router = Router();

router.get('/user-gender', verifyToken, getUserStats);

export default router;
