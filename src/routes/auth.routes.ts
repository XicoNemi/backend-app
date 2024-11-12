import { Router } from "express";
import { signIn, singUp, googleAuth } from "../controllers/auth.controller";

const router: Router = Router();

router.post("/google-auth", googleAuth);
router.post("/sing-up", singUp);
router.post("/sing-in", signIn);

export default router;
