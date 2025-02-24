import { Request, Response, NextFunction } from 'express';
import { MessageModel } from '../models/chat.model';

export const getChatHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, receiverId } = req.params;
    const messages = await MessageModel.find({
      $or: [
        { senderId: userId, receiverId },
        { senderId: receiverId, receiverId: userId },
      ],
    }).sort({ timestamp: 1 });
    res.status(200).json({ messages });
  } catch (error) {
    next(error)
  }
};

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { senderId, receiverId, message } = req.body;

    const newMessage = new MessageModel({
      senderId,
      receiverId,
      message,
      timestamp: new Date(),
    });

    await newMessage.save();

    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    next(error);
  }
};