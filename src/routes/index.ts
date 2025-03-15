import { Router } from 'express';

import authRoutes from './auth.routes';
import businessRoutes from './business.routes';
import chatRoutes from './chat.routes';
import eventRoutes from './event.routes';
import imageRoutes from './image.routes';
import itineraryRoutes from './itinerary.routes';
import locationRoutes from './location.route';
import planRoutes from './plan.routes';
import pointsRoutes from './pointOfInterest.routes';
import promotionRoutes from './promotion.route';
import routesRoutes from './routes.routes';
import statsRoutes from './stats.routes';
import userRoutes from './user.routes';
import backupRoutes from './admin/backup.routes';
import reviewRoutes from './review.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/images', imageRoutes);
router.use('/businesses', businessRoutes);
router.use('/promotions', promotionRoutes);
router.use('/locations', locationRoutes);
router.use('/events', eventRoutes);
router.use('/itineraries', itineraryRoutes);
router.use('/points', pointsRoutes);
router.use('/chat', chatRoutes);
router.use('/routes', routesRoutes);
router.use('/plans', planRoutes);
router.use('/stats', statsRoutes);
router.use('/backup', backupRoutes);
router.use('/reviews', reviewRoutes);

export default router;
