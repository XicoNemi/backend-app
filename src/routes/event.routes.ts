import { Router } from "express";
import { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent, getEventByBusinessId } from "../controllers/event.controller";
import { verifyToken } from "../middleware/verifyToken";
import { authorizeRole } from "../middleware/authorizeRole";

const router = Router()

router.get('/', verifyToken, getAllEvents)
router.get('/:id', verifyToken, getEventById)
router.post('/', verifyToken, createEvent)
router.put('/:id', verifyToken, authorizeRole(['SuperAdmin', 'BusinessOwner']), updateEvent)
router.delete('/delete/:id', verifyToken, authorizeRole(['SuperAdmin', 'BusinessOwner']), deleteEvent)
router.get('/business/:id', verifyToken, authorizeRole(['SuperAdmin', 'BusinessOwner']), getEventByBusinessId)

export default router