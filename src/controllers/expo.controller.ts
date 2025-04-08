import { Request, Response } from "express";
import ExpoPushToken from "../models/expoTokenModel";

const createExpoPushToken = async (req: Request, res: Response):  Promise<any> => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Token is required" });
    }

    try {
        // Check if the token already exists in the database
        const existingToken = await ExpoPushToken.findOne({ token });

        if (existingToken) {
            return res.status(200).json({ message: "Token already exists" });
        }

        // Create a new token entry in the database
        const newToken = new ExpoPushToken({ token });
        await newToken.save();

        return res.status(201).json({ message: "Token created successfully" });
    } catch (error) {
        console.error("Error creating token:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export {
    createExpoPushToken
}