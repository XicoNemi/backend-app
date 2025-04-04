import Redis from 'ioredis';

const redisClient = new Redis({
  host: process.env.REDIS_URL, 
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS,
  tls: { rejectUnauthorized: false },
  maxRetriesPerRequest: null, 
  retryStrategy: (times) => Math.min(times * 100, 3000), 
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.on('connect', () => console.log('Connected to Redis'));

export default redisClient;
