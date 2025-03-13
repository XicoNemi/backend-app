import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN!;
const CHAT_ID = process.env.CHAT_ID!;
const DATABASE_URL = process.env.DATABASE_URL!;
const BACKUP_PATH = path.join(__dirname, '../../backup.sql');

const bot = new TelegramBot(BOT_TOKEN, { polling: false });

export const createBackup = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    console.log('Generando respaldo PG');

    const command = `pg_dump "${DATABASE_URL}" -F p -f ${BACKUP_PATH}`;

    exec(command, (error) => {
      if (error) {
        console.error('Error generando respaldo:', error);
        return reject('Error generando respaldo');
      }

      console.log('Respaldo generado correctamente');
      resolve(BACKUP_PATH);
    });
  });
};

export const sendBackupToTelegram = async (filePath: string): Promise<void> => {
  if (!fs.existsSync(filePath)) {
    throw new Error('Archivo de respaldo no encontrado');
  }

  console.log('Enviando respaldo a Telegram');

  await bot
    .sendDocument(CHAT_ID, fs.createReadStream(filePath))
    .then(() => console.log('Respaldo enviado correctamente'))
    .catch((err) => console.error('Error enviando el respaldo:', err));
};
