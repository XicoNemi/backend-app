import rateLimit from 'express-rate-limit';
import Redis from 'ioredis';
import RedisStore from 'rate-limit-redis';

const redisUrl = process.env.REDIS_URL;
const redisPort = process.env.REDIS_PORT;
const redisPassword = process.env.REDIS_PASS;

if (!redisUrl || !redisPort) {
  throw new Error('REDIS_URL and REDIS_PORT must be defined');
}

const redisClient = new Redis({
  host: redisUrl,
  port: parseInt(redisPort),
  password: redisPassword,
  tls: {},
});

const signInLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: async (...args: [string, ...string[]]) => {
      const result = await redisClient.call(...args);
      return result as any;
    },
  }),
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 15,
  handler: (req, res) => {
    res.status(429).json({
      message: 'You have made too many requests. Please try again after 15 minutes.',
    });
  },
});

export default signInLimiter;