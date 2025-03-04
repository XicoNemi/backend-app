import { Router } from "express";
import { getAllRoutes, createRoute } from "../controllers/routes.controller";

const router = Router();

router.get("/", getAllRoutes);
router.post("/", createRoute);

export default router