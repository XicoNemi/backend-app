import { Router } from 'express';
import { getChatHistory, sendMessage } from '../controllers/chat.controller';
import { verifyToken } from '../middleware/verifyToken';
import { authorizeRole } from '../middleware/authorizeRole';

const router = Router();

// Ruta para obtener el historial de chat entre dos usuarios
// Primero verifica si el usuario está autenticado
// Luego, puedes restringir el acceso solo a admins si lo necesitas (opcional)
router.get(
  '/:userId/:receiverId', // Parámetros para los ids de los usuarios en el chat
  verifyToken, // Asegurarse de que el usuario esté autenticado
  authorizeRole(['ADMIN', 'COMMON']), // Solo admin y common pueden acceder a esta ruta
  getChatHistory // El controlador que maneja la lógica de la consulta
);

router.post('/:senderId/:receiverId', sendMessage); // Ruta para enviar mensaje

export default router;
