import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { redisClient, redisEnabled } from './utils/redis.js';
import './queue/orderWorker.js'; // Boots up BullMQ order processing background worker listener

// Load routes (to be created next)
import authRoutes from './routes/auth.js';
import menuRoutes from './routes/menu.js';
import orderRoutes from './routes/orders.js';
import chatbotRoutes from './routes/chatbot.js';

// Middlewares
import { errorHandler } from './middleware/errorHandler.js';
import { rateLimiter } from './middleware/rateLimit.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security and optimization middlewares
app.use(helmet());
app.use(compression());
app.use(cookieParser());

// CORS configuration (allow requests from client, support credentials for httpOnly cookies)
const allowedOrigins = [process.env.CLIENT_URL || 'http://localhost:5173'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Resilient Session middleware setup
let sessionStore = undefined;
if (redisEnabled && redisClient) {
  try {
    sessionStore = new RedisStore({ client: redisClient, prefix: "svs_sess_" });
    console.log('Express Session store connected to Redis Cloud (Upstash).');
  } catch (err) {
    console.warn('Failed to load RedisStore for sessions, falling back to in-memory:', err.message);
  }
}

app.use(session({
  store: sessionStore, // Fallback to MemoryStore if sessionStore is undefined
  secret: process.env.SESSION_SECRET || 'svs_foods_culinary_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days (Session timeout)
  }
}));

// Global Rate Limiting (100 requests per 15 minutes per IP)
app.use('/api', rateLimiter);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Base route/Status check
app.get('/health', (req, res) => {
  const memoryUsage = process.memoryUsage();
  res.json({
    status: 'healthy',
    timestamp: new Date(),
    uptime: `${process.uptime().toFixed(0)}s`,
    dbState: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    redisState: redisEnabled ? 'connected' : 'disconnected/memory-fallback',
    memory: {
      rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
      heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
      heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
      external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`
    },
    system: {
      platform: process.platform,
      cpuCores: os.cpus().length,
      freeMemory: `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`,
      totalMemory: `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`
    }
  });
});

// Serve frontend in production (optional, good practice for fullstack bundle)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: `API route not found: ${req.method} ${req.url}` });
});

// Global error handler
app.use(errorHandler);

// Database Connection
const dbOptions = {
  maxPoolSize: 100, // connection pooling (scalability for 10k users)
  serverSelectionTimeoutMS: 5000,
};

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/svs_foods', dbOptions)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas (Connection Pool size: 100)');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
