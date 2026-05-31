import { Worker } from 'bullmq';
import { redisClient, redisEnabled } from '../utils/redis.js';
import Order from '../models/Order.js';

let orderWorker = null;

if (redisEnabled && redisClient) {
  try {
    orderWorker = new Worker('orderQueue', async (job) => {
      console.log(`[Queue Worker] Processing order job ${job.id} for user ${job.data.userId}...`);
      
      const { orderId, userId, items, totalAmount, deliveryAddress, paymentMethod } = job.data;
      
      // Persist the order to MongoDB Atlas using the pre-allocated orderId
      const order = await Order.create({
        _id: orderId,
        userId,
        items,
        totalAmount,
        deliveryAddress,
        paymentMethod,
        paymentStatus: paymentMethod !== 'cod' ? 'paid' : 'pending',
        status: 'pending',
        estimatedDeliveryTime: new Date(Date.now() + 45 * 60 * 1000) // 45 minutes estimation
      });
      
      console.log(`[Queue Worker] Order ${order._id} successfully processed and persisted to MongoDB Atlas.`);
      return { orderId: order._id };
    }, {
      connection: redisClient,
      concurrency: 2 // Handle multiple jobs concurrently per worker instance
    });

    orderWorker.on('completed', (job) => {
      console.log(`[Queue Worker] Job ${job.id} completed successfully.`);
    });

    orderWorker.on('failed', (job, err) => {
      console.error(`[Queue Worker] Job ${job.id} failed:`, err.message);
    });

    console.log('BullMQ Order Worker initialized and listening for jobs.');
  } catch (err) {
    console.error('Failed to initialize BullMQ Worker:', err.message);
  }
}

export default orderWorker;
