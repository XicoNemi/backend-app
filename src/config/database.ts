import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log('\x1b[34m%s\x1b[0m', '=====================================');
    console.log('\x1b[34m%s\x1b[0m', ' Connected to MySQL successfully');
    console.log('\x1b[34m%s\x1b[0m', '=====================================');
  } catch (error) {
    console.log('\x1b[34m%s\x1b[0m', '=====================================');
    console.error('\x1b[31m%s\x1b[0m', ' Failed to connect to MySQL database', error);
    console.log('\x1b[34m%s\x1b[0m', '=====================================');
  }
}

export default prisma;
