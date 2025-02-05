import { Router } from 'express';
import { signIn, signUp, googleAuth, facebookAuth } from '../controllers/auth.controller';
import signInLimiter from '../services/rateLimit';

const router: Router = Router();

router.post('/google-auth', googleAuth);
router.post('/facebook-auth', facebookAuth);
router.post('/sign-up', signUp);
router.post('/sign-in', signInLimiter, signIn);

export default router;
