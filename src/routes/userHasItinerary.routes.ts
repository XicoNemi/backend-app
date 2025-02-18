import { Router } from "express";
import { 
    getAllUserHasItineraries, 
    getUserHasItineraryById, 
    createUserHasItinerary, 
    updateUserHasItinerary, 
    deleteUserHasItinerary 
} from "../controllers/userHasItinerary.controller";
import { verifyToken } from "../utils/verifyToken";

const router = Router();

router.get("/", verifyToken, getAllUserHasItineraries);
router.get("/:id", verifyToken, getUserHasItineraryById);
router.post("/", verifyToken, createUserHasItinerary);
router.put("/:id", verifyToken, updateUserHasItinerary);
router.delete("/:id", verifyToken, deleteUserHasItinerary);

export default router;
