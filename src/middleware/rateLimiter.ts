import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10,
  message: 'Demasiadas solicitudes, por favor intente más tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

export default limiter;
