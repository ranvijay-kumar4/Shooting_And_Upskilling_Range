import express from 'express';
import MenuItem from '../models/MenuItem.js';
import { protect, authorizeRoles } from '../middleware/auth.js';
import { redisClient, redisEnabled } from '../utils/redis.js';

const router = express.Router();

// Helper to invalidate all menu query cache keys
const clearMenuCache = async () => {
  if (redisEnabled && redisClient) {
    try {
      const keys = await redisClient.keys('menu_cache:*');
      if (keys && keys.length > 0) {
        await redisClient.del(...keys);
        console.log(`[Cache Invalidation] Successfully cleared ${keys.length} menu cache keys.`);
      }
    } catch (err) {
      console.warn('[Cache Invalidation] Failed to clear keys:', err.message);
    }
  }
};

// @desc    Get all menu items (paginated and filterable)
// @route   GET /api/menu
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20; // default 20 items per page
    const skip = (page - 1) * limit;

    const filter = {};

    // Filter by availability (non-admins only see available food)
    if (req.query.availableOnly === 'true') {
      filter.isAvailable = true;
    }

    // Filter by Category
    if (req.query.category && req.query.category !== 'all') {
      filter.category = req.query.category.toUpperCase().trim();
    }

    // Search query
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Attempt cache retrieval
    const cacheKey = `menu_cache:${JSON.stringify(req.query)}`;
    if (redisEnabled && redisClient) {
      try {
        const cached = await redisClient.get(cacheKey);
        if (cached) {
          console.log(`[Cache Hit] Menu returned from Redis: ${cacheKey}`);
          return res.json(JSON.parse(cached));
        }
      } catch (err) {
        console.warn('[Cache] Retrieval failed, using database:', err.message);
      }
    }

    const totalItems = await MenuItem.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);

    const items = await MenuItem.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const responseData = {
      success: true,
      data: items,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };

    // Cache the queried result for 1 hour (3600 seconds)
    if (redisEnabled && redisClient) {
      try {
        await redisClient.setex(cacheKey, 3600, JSON.stringify(responseData));
        console.log(`[Cache Miss] Saved menu to Redis: ${cacheKey}`);
      } catch (err) {
        console.warn('[Cache] Saving failed:', err.message);
      }
    }

    res.json(responseData);
  } catch (error) {
    next(error);
  }
});

// @desc    Get a single menu item
// @route   GET /api/menu/:id
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
});

// @desc    Create a menu item
// @route   POST /api/menu
// @access  Private/Admin
router.post('/', protect, authorizeRoles('admin'), async (req, res, next) => {
  try {
    const { name, description, price, category, imageUrl, isAvailable, isBestseller, spicyLevel, preparationTime, nutrition } = req.body;

    const existingItem = await MenuItem.findOne({ name });
    if (existingItem) {
      return res.status(400).json({ message: 'Menu item with this name already exists' });
    }

    const item = await MenuItem.create({
      name,
      description,
      price,
      category: category.toUpperCase().trim(),
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop',
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      isBestseller: !!isBestseller,
      spicyLevel: spicyLevel || 'Mild',
      preparationTime: preparationTime !== undefined ? Number(preparationTime) : 15,
      nutrition: nutrition || { calories: 0, protein: 0, carbs: 0 }
    });

    await clearMenuCache();
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
});

// @desc    Update a menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
router.put('/:id', protect, authorizeRoles('admin'), async (req, res, next) => {
  try {
    const { name, description, price, category, imageUrl, isAvailable, isBestseller, spicyLevel, preparationTime, nutrition } = req.body;

    let item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    // Check if name is changed and conflicts with another item
    if (name && name !== item.name) {
      const nameConflict = await MenuItem.findOne({ name });
      if (nameConflict) {
        return res.status(400).json({ message: 'Another item already has this name' });
      }
    }

    const updatedData = {
      name,
      description,
      price,
      imageUrl,
      isAvailable,
      isBestseller,
      spicyLevel,
      preparationTime,
      nutrition
    };

    if (category) {
      updatedData.category = category.toUpperCase().trim();
    }

    // Remove undefined fields
    Object.keys(updatedData).forEach(key => updatedData[key] === undefined && delete updatedData[key]);

    item = await MenuItem.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true
    });

    await clearMenuCache();
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
router.delete('/:id', protect, authorizeRoles('admin'), async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    await MenuItem.findByIdAndDelete(req.params.id);
    await clearMenuCache();
    res.json({ success: true, message: 'Menu item deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
