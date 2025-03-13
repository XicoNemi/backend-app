import { Request, Response, NextFunction } from 'express';
import { createBackup, sendBackupToTelegram } from '../../services/backupService';
import { AppError } from '../../utils/errorApp';

import { google } from 'googleapis';
import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const googleServiceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '{}');
const FOLDER_ID = process.env.FOLDER_ID;

const auth = new google.auth.GoogleAuth({
  credentials: googleServiceAccount,
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: 'v3', auth });

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

export const backupAndUploadToDrive = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const backupFile = 'backup.sql';
    const outputPath = path.join(__dirname, `../../${backupFile}`);

    const dumpCommand = `pg_dump "${process.env.DATABASE_URL}" -F p -f "${outputPath}"`;

    exec(dumpCommand, async (error) => {
      if (error) {
        console.error('Error al hacer el respaldo:', error);
        return next(new AppError('Error al hacer el respaldo', 500));
      }

      const fileMetadata = {
        name: `backup_${new Date().toISOString()}.sql`,
        parents: [FOLDER_ID].filter(Boolean) as string[],
      };

      const media = {
        mimeType: 'application/sql',
        body: fs.createReadStream(outputPath),
      };

      try {
        const file = await drive.files.create({
          requestBody: fileMetadata,
          media: media,
          fields: 'id',
        });

        fs.unlinkSync(outputPath);

        return res.json({ message: 'Backup subido con éxito', fileId: file.data.id });
      } catch (uploadError) {
        console.error('Error al subir el archivo a Google Drive:', uploadError);
        return next(new AppError('Error al subir el archivo a Google Drive', 500));
      }
    });
  } catch (error) {
    console.error('Error general:', error);
    return next(new AppError('Error general', 500));
  }
};
