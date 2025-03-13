import { Router } from "express";
import { getAllRoutes, createRoute } from "../controllers/routes.controller";
import { verifyToken } from "../middleware/verifyToken";
import { authorizeRole } from "../middleware/authorizeRole";

const router = Router();

router.get("/", getAllRoutes);
router.post("/", verifyToken, authorizeRole(['SuperAdmin', 'BusinessOwner']), createRoute);

export default router