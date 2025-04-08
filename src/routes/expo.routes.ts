import { Router } from 'express';
import { createExpoPushToken } from '../controllers/expo.controller';


const router = Router();

router.post('/', createExpoPushToken);

export default router