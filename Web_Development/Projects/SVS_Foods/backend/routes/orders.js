import express from 'express';
import mongoose from 'mongoose';
import Order from '../models/Order.js';
import MenuItem from '../models/MenuItem.js';
import { protect, authorizeRoles } from '../middleware/auth.js';
import { queueOrder } from '../queue/orderQueue.js';

const router = express.Router();

// @desc    Place a new order
// @route   POST /api/orders
// @access  Private/User
router.post('/', protect, authorizeRoles('user'), async (req, res, next) => {
  try {
    const { items, deliveryAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in the cart' });
    }

    if (!deliveryAddress) {
      return res.status(400).json({ message: 'Delivery address is required' });
    }

    // Verify items and calculate price
    let totalAmount = 0;
    const validatedItems = [];

    for (const item of items) {
      const targetItemId = item.menuItemId || item.menuItem;
      const dbMenuItem = await MenuItem.findById(targetItemId);
      if (!dbMenuItem) {
        return res.status(404).json({ message: `Menu item with ID ${targetItemId} not found` });
      }
      if (!dbMenuItem.isAvailable) {
        return res.status(400).json({ message: `Item "${dbMenuItem.name}" is currently unavailable` });
      }

      const itemTotal = dbMenuItem.price * item.quantity;
      totalAmount += itemTotal;

      validatedItems.push({
        menuItemId: dbMenuItem._id,
        priceAtOrder: dbMenuItem.price,
        quantity: item.quantity,
        specialInstructions: item.specialInstructions || ''
      });
    }

    // Set address structure
    let structuredAddress = deliveryAddress;
    if (typeof deliveryAddress === 'string') {
      structuredAddress = {
        street: deliveryAddress,
        city: 'Local City',
        pincode: '000000'
      };
    }

    const payMethod = (paymentMethod || 'cod').toLowerCase();
    const finalPaymentMethod = ['cod', 'card', 'upi'].includes(payMethod) ? payMethod : 'cod';
    const finalPaymentStatus = finalPaymentMethod !== 'cod' ? 'paid' : 'pending';

    // Pre-allocate new Mongoose ObjectId to return immediately to frontend
    const preAllocatedOrderId = new mongoose.Types.ObjectId();

    // Define synchronous fallback function in case Redis is offline or fails
    const syncSaveFallback = async () => {
      await Order.create({
        _id: preAllocatedOrderId,
        userId: req.user._id,
        items: validatedItems,
        totalAmount,
        deliveryAddress: structuredAddress,
        paymentMethod: finalPaymentMethod,
        paymentStatus: finalPaymentStatus,
        status: 'pending',
        estimatedDeliveryTime: new Date(Date.now() + 45 * 60 * 1000)
      });
    };

    // Queue the order using our BullMQ resilient interface
    const queueResult = await queueOrder({
      orderId: preAllocatedOrderId,
      userId: req.user._id,
      items: validatedItems,
      totalAmount,
      deliveryAddress: structuredAddress,
      paymentMethod: finalPaymentMethod
    }, syncSaveFallback);

    // Return 202 Accepted with pre-allocated order info
    res.status(202).json({
      success: true,
      queued: queueResult.queued,
      data: {
        _id: preAllocatedOrderId,
        userId: req.user._id,
        items: validatedItems,
        totalAmount,
        deliveryAddress: structuredAddress,
        paymentMethod: finalPaymentMethod,
        paymentStatus: finalPaymentStatus,
        status: 'pending',
        estimatedDeliveryTime: new Date(Date.now() + 45 * 60 * 1000)
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get logged-in user's orders
// @route   GET /api/orders/my-orders
// @access  Private/User
router.get('/my-orders', protect, authorizeRoles('user'), async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const query = { userId: req.user._id };

    const totalOrders = await Order.countDocuments(query);
    const totalPages = Math.ceil(totalOrders / limit);

    const orders = await Order.find(query)
      .sort({ orderDate: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        totalOrders,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get all orders (paginated) - Admin and Delivery personnel
// @route   GET /api/orders
// @access  Private/Admin/Delivery
router.get('/', protect, authorizeRoles('admin', 'delivery'), async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20; // Paginated list of orders
    const skip = (page - 1) * limit;

    const filter = {};
    
    // Delivery staff might only care about non-delivered orders
    if (req.user.role === 'delivery' && req.query.activeOnly === 'true') {
      filter.status = { $in: ['confirmed', 'preparing', 'out-for-delivery'] };
    } else if (req.query.status) {
      filter.status = req.query.status;
    }

    const totalOrders = await Order.countDocuments(filter);
    const totalPages = Math.ceil(totalOrders / limit);

    const orders = await Order.find(filter)
      .sort({ orderDate: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name email');

    res.json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        totalOrders,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin/Delivery
router.put('/:id/status', protect, authorizeRoles('admin', 'delivery'), async (req, res, next) => {
  try {
    const { status, paymentStatus } = req.body;
    
    const validStatuses = ['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid order status' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Restrict delivery role: delivery agents should not cancel or randomly override admin status, 
    // but they can transition to out-for-delivery or delivered
    if (req.user.role === 'delivery' && status) {
      const allowedTransitions = ['out-for-delivery', 'delivered'];
      if (!allowedTransitions.includes(status)) {
        return res.status(403).json({ message: 'Delivery role can only mark orders as out-for-delivery or delivered' });
      }
    }

    if (status) {
      order.status = status;
      // Auto set paid if delivered
      if (status === 'delivered') {
        order.paymentStatus = 'paid';
      }
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    await order.save();

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get order details
// @route   GET /api/orders/:id
// @access  Private
router.get('/:id', protect, async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId', 'name email');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Users can only view their own orders. Admins and Delivery can view any.
    if (req.user.role === 'user' && order.userId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
});

export default router;
