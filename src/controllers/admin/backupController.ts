import { Request, Response, NextFunction } from 'express';
import { createBackup, sendBackupToTelegram } from '../../services/backupService';
import { AppError } from '../../utils/errorApp';

export const backupDatabase = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const filePath = await createBackup();
    await sendBackupToTelegram(filePath);

    res.json({ message: 'Backup generado y enviado correctamente' });
  } catch (error) {
    next(new AppError(error instanceof Error ? error.message : 'Error desconocido', 500));
  }
};
