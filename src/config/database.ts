import { PrismaClient } from '@prisma/client';
import { loggerXiconemi } from '../utils/colorLogs';
const prisma = new PrismaClient();

export async function connectToDatabase() {
  try {
    await prisma.$connect();
    loggerXiconemi('green', 'Connected to MySQL database', 'mysql');
  } catch (error) {
    loggerXiconemi('red', 'Error connecting to MySQL database', 'error');
  }
}

export default prisma;
