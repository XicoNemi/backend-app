import { Router } from "express";
import { getAllRoutes, createRoute } from "../controllers/routes.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.get("/", getAllRoutes);
router.post("/", verifyToken, createRoute);

export default router