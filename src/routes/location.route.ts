import { Router } from "express";
import { createLocation, deleteLocation, getAllLocations, getLocationById, updateLocation } from "../controllers/location.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = Router()

router.get('/', verifyToken, getAllLocations)
router.get('/:id', verifyToken, getLocationById)
router.post('/', verifyToken, createLocation)
router.put('/:id', verifyToken, updateLocation)
router.delete('/delete/:id', verifyToken, deleteLocation)

export default router