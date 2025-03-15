import { Router } from 'express';
import { getAllReviews, getReview, createReview, updateReview, deleteReview, getReviewsByBusinessId } from '../controllers/review.controller';
import { verifyToken } from '../middleware/verifyToken';

const router = Router();

router.get('/', getAllReviews);
router.get('/:id', getReview);
router.get('/business/:businessId', getReviewsByBusinessId);
router.post('/', createReview);
router.put('/:id', verifyToken, updateReview);
router.delete('/delete/:id', verifyToken, deleteReview);

export default router;