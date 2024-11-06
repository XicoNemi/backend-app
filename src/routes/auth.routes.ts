import { Router } from "express";
import { signIn, singUp } from "../controllers/auth.controller";

const router: Router = Router();

router.post("/sing-up", singUp);
router.post("/sing-in", signIn);

export default router;
