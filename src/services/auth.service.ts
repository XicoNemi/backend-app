import jwt from "jsonwebtoken";

export const generateToken = (userId: number) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
        expiresIn: "1d"
    });
    return token
}

