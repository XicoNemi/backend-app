import { Router } from 'express';
import { getAverageRating, getTotalClientsdByPlan, getUserStats } from '../controllers/stats.controller';
import { verifyToken } from '../middleware/verifyToken';

const router = Router();

router.get('/user-gender', verifyToken, getUserStats);
router.get('/average-rating', verifyToken, getAverageRating);
router.get('/total-clients-by-plan',verifyToken, getTotalClientsdByPlan);

export default router;
