import { Router } from "express";
import { 
    getAllItineraryHasEstab, 
    getItineraryHasEstabById, 
    createItineraryHasEstab, 
    updateItineraryHasEstab, 
    deleteItineraryHasEstab 
} from "../controllers/itineraryHasEstab.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.get("/", verifyToken, getAllItineraryHasEstab);
router.get("/:id", verifyToken, getItineraryHasEstabById);
router.post("/", verifyToken, createItineraryHasEstab);
router.put("/:id", verifyToken, updateItineraryHasEstab);
router.delete("/:id", verifyToken, deleteItineraryHasEstab);

export default router;
