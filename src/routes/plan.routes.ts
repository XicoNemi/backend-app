import { Router } from 'express';
import { getAllPlans, createPlan, getPlan, updatePlan, deletePlan } from '../controllers/plan.controller';
import { verifyToken } from '../middleware/verifyToken';

const router = Router();

router.get('/', getAllPlans);
router.post('/', verifyToken, createPlan);
router.get('/:id', getPlan);
router.put('/:id', verifyToken, updatePlan);
router.delete('/delete/:id', verifyToken, deletePlan);

export default router;