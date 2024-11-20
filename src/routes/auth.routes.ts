import { Router } from "express";
import { signIn, signUp, googleAuth, facebookAuth } from "../controllers/auth.controller";

const router: Router = Router();

router.post("/google-auth", googleAuth);
router.post("/facebook-auth", facebookAuth);
router.post("/sign-up", signUp);
router.post("/sign-in", signIn);

export default router;
