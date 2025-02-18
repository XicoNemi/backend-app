import { Router } from 'express';
import { signIn, signUp, googleAuth, facebookAuth, deleteUserByEmail } from '../controllers/auth.controller';
import signInLimiter from '../services/rateLimitService';

const router: Router = Router();

router.post('/google-auth', googleAuth);
router.post('/facebook-auth', facebookAuth);
router.post('/sign-up', signUp);
router.post('/sign-in', signInLimiter, signIn);

router.delete('/delete-user/:email', deleteUserByEmail);

export default router;
