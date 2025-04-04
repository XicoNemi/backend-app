import { Router } from 'express';
import {
  backupDatabase,
  backupAndUploadToDrive,
} from '../../controllers/admin/backupController';
import { verifyToken } from '../../middleware/verifyToken';
import { authorizeRole } from '../../middleware/authorizeRole';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Backup
 *  description: Operaciones de respaldo de la base de datos
 */

/**
 * @swagger
 * /backup/pg:
 *   post:
 *     summary: Genera un respaldo de la base de datos y lo envía a Telegram.
 *     tags: [Backup]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Respaldo generado y enviado correctamente.
 *       500:
 *         description: Error al generar el respaldo.
 */
router.post('/pg', verifyToken, authorizeRole(['SuperAdmin']), backupDatabase);

/**
 * @swagger
 * /backup/drive:
 *   post:
 *     summary: Genera un respaldo de la base de datos y lo sube a Google Drive.
 *     tags: [Backup]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Respaldo subido con éxito.
 *       500:
 *         description: Error al subir el respaldo.
 */
router.post('/drive', verifyToken, authorizeRole(['SuperAdmin']), backupAndUploadToDrive);

export default router;
