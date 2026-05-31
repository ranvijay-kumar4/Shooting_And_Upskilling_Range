import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { redisClient, redisEnabled } from '../utils/redis.js';

let store = undefined;

if (redisEnabled && redisClient) {
  try {
    store = new RedisStore({
      sendCommand: (...args) => redisClient.call(...args),
      prefix: 'svs_rl_'
    });
    console.log('Rate limiter connected to Redis Cloud (Upstash) store.');
  } catch (err) {
    console.warn('Failed to initialize RedisStore for rate limiting, falling back to in-memory:', err.message);
  }
}

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  store: store, // Fallback to memory store if Redis is unavailable (store is undefined)
  message: {
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  }
});
