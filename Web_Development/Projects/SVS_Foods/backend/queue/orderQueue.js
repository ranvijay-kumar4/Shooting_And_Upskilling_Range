import { Queue } from 'bullmq';
import { redisClient, redisEnabled } from '../utils/redis.js';

let orderQueue = null;

if (redisEnabled && redisClient) {
  try {
    orderQueue = new Queue('orderQueue', {
      connection: redisClient,
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000
        },
        removeOnComplete: true,
        removeOnFail: false
      }
    });
    console.log('BullMQ Order Processing Queue initialized successfully.');
  } catch (err) {
    console.error('Failed to initialize BullMQ Queue:', err.message);
  }
}

// Resilient queue helper that falls back to immediate DB processing if Redis is unavailable
export const queueOrder = async (orderData, fallbackFn) => {
  if (orderQueue) {
    try {
      const job = await orderQueue.add('processCheckout', orderData);
      console.log(`[Queue] Checkout job #${job.id} enqueued successfully.`);
      return { success: true, queued: true, jobId: job.id };
    } catch (err) {
      console.warn(`[Queue] Failed to enqueue job. Executing direct fallback database save: ${err.message}`);
      await fallbackFn();
      return { success: true, queued: false };
    }
  } else {
    // Graceful Redis-disabled synchronous fallback
    console.log('[Queue] Redis disabled or offline. Processing checkout synchronously (Stable Fallback).');
    await fallbackFn();
    return { success: true, queued: false };
  }
};

export default orderQueue;
