import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  menuItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1']
  },
  specialInstructions: {
    type: String,
    default: ''
  },
  priceAtOrder: {
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true // database index for userId to speed up lookups
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    min: [0, 'Total amount cannot be negative']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'card', 'upi'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  deliveryAddress: {
    type: Object, // Structured street, city, pin address object
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now,
    index: true // database index on orderDate for fast sorting of transactions
  },
  estimatedDeliveryTime: {
    type: Date
  }
}, {
  timestamps: true
});

// Compound index for optimal sorting of order history and sales analytics
orderSchema.index({ orderDate: -1, userId: 1 });

const Order = mongoose.model('Order', orderSchema);
export default Order;
