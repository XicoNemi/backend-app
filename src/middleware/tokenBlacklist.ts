import redisClient from '../config/redisConfig';

export const addToBlacklist = async (token: string): Promise<void> => {
  await redisClient.sadd('tokenBlacklist', token);
};

export const isTokenBlacklisted = async (token: string): Promise<boolean> => {
  const result = await redisClient.sismember('tokenBlacklist', token);
  return result === 1;
};
