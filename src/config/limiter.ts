import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 m
    max: 10,
    message: 'Demasiadas solicitudes, por favor intente más tarde.',
    standardHeaders: true,
    legacyHeaders: false
});
