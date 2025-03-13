import { Router } from "express";
import { getAllRoutes, createRoute, getRoute } from "../controllers/routes.controller";
import { verifyToken } from "../middleware/verifyToken";
import { authorizeRole } from "../middleware/authorizeRole";

const router = Router();

router.get("/", getAllRoutes);
router.get("/:id", verifyToken, authorizeRole(['SuperAdmin', 'BusinessOwner','Common']), getRoute);
router.post("/", verifyToken, authorizeRole(['SuperAdmin', 'BusinessOwner']), createRoute);

export default router