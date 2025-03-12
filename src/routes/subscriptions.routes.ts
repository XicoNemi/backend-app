import { Router } from 'express';
import { getAllSubscriptions, getSubscription, createSubscription, deleteSubscription, updateSubscription } from '../controllers/subscription.controller';
import { verifyToken } from '../middleware/verifyToken';


const router = Router();

router.get('/', verifyToken, getAllSubscriptions);
router.get('/:id', verifyToken, getSubscription);
router.post('/', verifyToken, createSubscription);
router.put('/:id', verifyToken, updateSubscription);
router.delete('/delete/:id', verifyToken, deleteSubscription);


export default router;