import rateLimit from 'express-rate-limit';
import Redis from 'ioredis';
import RedisStore from 'rate-limit-redis';

const redisUrl = process.env.REDIS_URL;
const redisPort = process.env.REDIS_PORT;
const redisPassword = process.env.REDIS_PASS;

if (!redisUrl || !redisPort) {
  console.error('\x1b[31m%s\x1b[0m', 'REDIS_URL and REDIS_PORT must be defined');
  process.exit(1);
}

let redisClient;

try {
  redisClient = new Redis({
    host: redisUrl,
    port: parseInt(redisPort),
    password: redisPassword,
    tls: {},
  });

  redisClient.on('connect', () => {
    console.log('\x1b[91m%s\x1b[0m', '=====================================');
    console.log('\x1b[91m%s\x1b[0m', 'Connected to Redis successfully');
    console.log('\x1b[91m%s\x1b[0m', '=====================================');
  });

  redisClient.on('error', (err) => {
    console.error('\x1b[31m%s\x1b[0m', 'Redis connection error:', err);
  });
} catch (error) {
  console.error('\x1b[31m%s\x1b[0m', 'Failed to initialize Redis client:', error);
  process.exit(1);
}

const signInLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: async (...args: [string, ...string[]]) => {
      try {
        const result = await redisClient.call(...args);
        return result as any;
      } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', 'Redis command error:', error);
        throw error;
      }
    },
  }),
  windowMs: 15 * 60 * 1000,
  max: 15,
  handler: (req, res) => {
    console.error('\x1b[31m%s\x1b[0m', 'Too many requests from:', req.ip);
    res.status(429).json({
      message: 'You have made too many requests. Please try again after 15 minutes.',
    });
  },
});

export default signInLimiter;
