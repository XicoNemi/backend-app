import { Router } from "express";
import { signIn, singUp, googleAuth, facebookAuth } from "../controllers/auth.controller";

const router: Router = Router();

router.post("/google-auth", googleAuth);
router.post("/facebook-auth", facebookAuth);
router.post("/sing-up", singUp);
router.post("/sing-in", signIn);

export default router;
