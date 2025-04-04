// import rateLimit from 'express-rate-limit';
// import RedisStore from 'rate-limit-redis';
// import redisClient from '../config/redisConfig';
// import { loggerXiconemi } from '../utils/colorLogs';

// redisClient.on('connect', () => {
//   loggerXiconemi('red', 'Redis client connected', 'reddis');
// });

// redisClient.on('error', (err) => {
//   console.error('\x1b[31m%s\x1b[0m', 'Redis connection error:', err);
// });

// const signInLimiter = rateLimit({
//   store: new RedisStore({
//     sendCommand: async (...args: [string, ...string[]]) => {
//       try {
//         const result = await redisClient.call(...args);
//         return result as any;
//       } catch (error) {
//         console.error('\x1b[31m%s\x1b[0m', 'Redis command error:', error);
//         throw error;
//       }
//     },
//   }),
//   windowMs: 15 * 60 * 1000,
//   max: 15,
//   handler: (req, res) => {
//     console.error('\x1b[31m%s\x1b[0m', 'Too many requests from:', req.ip);
//     res.status(429).json({
//       message: 'You have made too many requests. Please try again after 15 minutes.',
//     });
//   },
// });

// export default signInLimiter;
