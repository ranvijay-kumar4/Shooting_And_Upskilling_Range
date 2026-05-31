import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

let redisClient = null;
let redisEnabled = false;

const redisUri = process.env.REDIS_URI || process.env.REDIS_URL;

if (redisUri && redisUri.trim() !== '') {
  try {
    console.log('Initializing Redis client connection...');
    // Support TLS if it is a secure rediss:// connection (like Upstash)
    redisClient = new Redis(redisUri, {
      maxRetriesPerRequest: null, // Critical requirement for BullMQ
      enableReadyCheck: false,
      connectTimeout: 8000,
      retryStrategy(times) {
        // Retry connection up to 3 times, then stop to prevent memory locks
        if (times > 3) {
          console.warn('Redis connection failed permanently after 3 attempts. Bypassing and using memory fallback.');
          redisEnabled = false;
          return null; // Stop retrying
        }
        const delay = Math.min(times * 1000, 3000);
        return delay;
      }
    });

    redisClient.on('connect', () => {
      console.log('Successfully connected to Redis Cloud (Upstash)!');
      redisEnabled = true;
    });

    redisClient.on('error', (err) => {
      console.warn(`Redis client error: ${err.message}. Local in-memory caching and session fallbacks will be used.`);
      redisEnabled = false;
    });
  } catch (error) {
    console.error('Failed to instantiate Redis connection:', error.message);
    redisEnabled = false;
  }
} else {
  console.log('No REDIS_URI or REDIS_URL configured in .env. Running in standalone local mode with in-memory fallbacks.');
}

export { redisClient, redisEnabled };
export default redisClient;
