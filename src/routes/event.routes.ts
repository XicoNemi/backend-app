import { Router } from "express";
import { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent, getEventByOwnerId } from "../controllers/event.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = Router()

router.get('/', verifyToken, getAllEvents)
router.get('/:id', verifyToken, getEventById)
router.post('/', verifyToken, createEvent)
router.put('/:id', verifyToken, updateEvent)
router.delete('/delete/:id', verifyToken, deleteEvent)
router.get('/business/:id', verifyToken, getEventByOwnerId)

export default router