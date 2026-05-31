import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Menu item name is required'],
    trim: true,
    unique: true
  },
  category: {
    type: String,
    enum: ['BURGERS', 'SIDES', 'BEVERAGES', 'NAAN & ROLLS', 'DIPS', 'DESSERTS', 'PARTY COMBOS'],
    required: [true, 'Category is required'],
    index: true // database index for scalable category pagination/filtering
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required']
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isBestseller: {
    type: Boolean,
    default: false
  },
  spicyLevel: {
    type: String,
    enum: ['Mild', 'Medium', 'Hot'],
    default: 'Mild'
  },
  preparationTime: {
    type: Number, // in minutes
    required: [true, 'Preparation time is required'],
    min: [0, 'Preparation time cannot be negative']
  },
  nutrition: {
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
export default MenuItem;
