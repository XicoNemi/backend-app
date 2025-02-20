import { Router } from "express";
import { 
    getAllItineraryHasRoutes, 
    getItineraryHasRouteById, 
    createItineraryHasRoute, 
    updateItineraryHasRoute, 
    deleteItineraryHasRoute 
} from "../controllers/itineraryHasRoute.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.get("/", verifyToken, getAllItineraryHasRoutes);
router.get("/:id", verifyToken, getItineraryHasRouteById);
router.post("/", verifyToken, createItineraryHasRoute);
router.put("/:id", verifyToken, updateItineraryHasRoute);
router.delete("/:id", verifyToken, deleteItineraryHasRoute);

export default router;
