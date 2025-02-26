import mongoose from 'mongoose';
import { loggerXiconemi } from '../utils/colorLogs';
import dotenv from 'dotenv';

dotenv.config();
const mongoUri = process.env.MONGO_URI || '';

export async function connectToMongoDB() {
  if (!mongoUri) {
    loggerXiconemi('red', 'MONGO_URI no está definida', 'error');
    return;
  }
  try {
    await mongoose.connect(mongoUri);
    loggerXiconemi('green', 'Connected to MongoDB Atlas', 'mongodb');
  } catch (error) {
    loggerXiconemi('red', 'Error connecting to MongoDB Atlas', 'error');
  }
}
