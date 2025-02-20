import { Router } from "express";
import { getAllItineraries, getItineraryById, createItinerary, updateItinerary, deleteItinerary } from "../controllers/itinerary.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = Router()

router.get('/', verifyToken, getAllItineraries)
router.get('/:id', verifyToken, getItineraryById)
router.post('/', verifyToken, createItinerary)
router.put('/:id', verifyToken, updateItinerary)
router.delete('/delete/:id', verifyToken, deleteItinerary)

export default router