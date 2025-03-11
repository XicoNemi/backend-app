import { PrismaClient } from '@prisma/client';
import { loggerXiconemi } from '../utils/colorLogs';
const prisma = new PrismaClient();

export async function connectToPostgres() {
  try {
    await prisma.$connect();
    loggerXiconemi('green', 'Connected to Postgres database', 'mysql');
  } catch (error) {
    loggerXiconemi('red', 'Error connecting to Postgres database', 'error');
  }
}

export default prisma;
