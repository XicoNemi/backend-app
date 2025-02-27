import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  senderId: number;
  receiverId: number;
  message: string;
  timestamp: Date;
}

const MessageSchema = new Schema<IMessage>({
  senderId: { type: Number, required: true },
  receiverId: { type: Number, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const MessageModel = mongoose.model<IMessage>('Message', MessageSchema);
