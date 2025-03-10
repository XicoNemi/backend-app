import {Router } from 'express';
import { getAllPlans, createPlan, getPlan, updatePlan, deletePlan } from '../controllers/plan.controller';

const router = Router();

router.get('/', getAllPlans);
router.post('/', createPlan);
router.get('/:id', getPlan);
router.put('/:id', updatePlan);
router.delete('/:id', deletePlan);

export default router;