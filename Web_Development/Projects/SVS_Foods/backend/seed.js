import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MenuItem from './models/MenuItem.js';

dotenv.config();

const menuItems = [
  // BURGERS (₹60-180)
  {
    name: 'SVS Royal Crunch Burger',
    category: 'BURGERS',
    price: 149.00,
    description: 'Crispy herb-infused potato patty topped with sliced jalapenos, red onions, cheese, and signature spice-spread on toasted sesame buns.',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop',
    isAvailable: true,
    isBestseller: true,
    spicyLevel: 'Medium',
    preparationTime: 12,
    nutrition: { calories: 380, protein: 12, carbs: 48 }
  },
  {
    name: 'Tandoori Paneer Burger',
    category: 'BURGERS',
    price: 129.00,
    description: 'Charcoal-grilled paneer slab marinated in heavy tandoori spices, topped with mint chutney, cucumber rings, and melted cheese.',
    imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop',
    isAvailable: true,
    isBestseller: false,
    spicyLevel: 'Hot',
    preparationTime: 15,
    nutrition: { calories: 420, protein: 16, carbs: 40 }
  },
  {
    name: 'Cheesy Blast Veg Burger',
    category: 'BURGERS',
    price: 119.00,
    description: 'Crispy veggie patty loaded with a molten core of melted cheddar and mozzarella cheese, crisp lettuce, and mayo.',
    imageUrl: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=500&auto=format&fit=crop',
    isAvailable: true,
    isBestseller: true,
    spicyLevel: 'Mild',
    preparationTime: 10,
    nutrition: { calories: 490, protein: 11, carbs: 52 }
  },
  {
    name: 'Classic Aloo Tikki Burger',
    category: 'BURGERS',
    price: 69.00,
    description: 'The golden classic potato tikki spiced with mild Indian masalas, fresh tomato slices, shredded onions, and sweet-sour burger sauce.',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop',
    isAvailable: true,
    isBestseller: false,
    spicyLevel: 'Mild',
    preparationTime: 8,
    nutrition: { calories: 310, protein: 6, carbs: 45 }
  },

  // SIDES (₹60-180)
  {
    name: 'Crispy Masala Fries',
    category: 'SIDES',
    price: 79.00,
    description: 'Golden thin-cut skin-on fries tossed in our signature secret seasoning spice mix, served piping hot.',
    imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop',
    isAvailable: true,
    isBestseller: true,
    spicyLevel: 'Medium',
    preparationTime: 7,
    nutrition: { calories: 290, protein: 4, carbs: 38 }
  },
  {
    name: 'Spicy Loaded Potato Wedges',
    category: 'SIDES',
    price: 119.00,
    description: 'Thick cut wedges loaded with a layer of warm melted cheddar cheese sauce, pickled jalapeno wheels, and chopped herbs.',
    imageUrl: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=500&auto=format&fit=crop',
    isAvailable: true,
    isBestseller: false,
    spicyLevel: 'Medium',
    preparationTime: 9,
    nutrition: { calories: 360, protein: 7, carbs: 44 }
  },
  {
    name: 'Onion Rings with Herbs',
    category: 'SIDES',
    price: 89.00,
    description: 'Crumbed onion slices fried to golden crunchy perfection, seasoned with oregano and garlic salt.',
    imageUrl: 'https://images.unsplash.com/photo-1613454320431-7c2174c0b444?w=500&auto=format&fit=crop',
    isAvailable: true,
    isBestseller: false,
    spicyLevel: 'Mild',
    preparationTime: 6,
    nutrition: { calories: 220, protein: 3, carbs: 29 }
  },
  {
    name: 'Peri Peri Crispy Fries',
    category: 'SIDES',
    price: 99.00,
    description: 'Crispy potato fries dusted heavily with spicy African Peri Peri powder, served inside a shaker bag.',
    imageUrl: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=500&auto=format&fit=crop',
    isAvailable: true,
    isBestseller: true,
    spicyLevel: 'Hot',
    preparationTime: 7,
    nutrition: { calories: 300, protein: 4, carbs: 39 }
  },

  // BEVERAGES (₹60-180)
  {
    name: 'Mango Cardamom Lassi',
    category: 'BEVERAGES',
    price: 69.00,
    description: 'Thick whipped yogurt lassi blended with sweet mango pulp, milk, and freshly ground cardamom pods.',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&auto=format&fit=crop',
    isAvailable: true,
    isBestseller: true,
    spicyLevel: 'Mild',
    preparationTime: 5,
    nutrition: { calories: 210, protein: 5, carbs: 32 }
  },
  {
    name: 'Matcha Iced Latte',
    category: 'BEVERAGES',
    price: 139.00,
    description: 'Premium organic green tea matcha powder whisked with chilled oat milk and raw wild honeycomb syrup.',
    imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&auto=format&fit=crop',
    isAvailable: true,
    isBestseller: false,
    spicyLevel: 'Mild',
    preparationTime: 6,
    nutrition: { calories: 150, protein: 3, carbs: 20 }
  },
  {
    name: 'Fresh Mint Lemonade',
    category: 'BEVERAGES',
    price: 60.00,
    description: 'Zesty cold lemonade muddled with fresh garden mint leaves and black salt for a classic refreshing experience.',
    imageUrl: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=500&auto=format&fit=crop',
    isAvailable: true,
    isBestseller: false,
    spicyLevel: 'Mild',
    preparationTime: 4,
    nutrition: { calories: 90, protein: 0, carbs: 22 }
  },
  {
    name: 'Hibiscus Iced Berry Tea',
    category: 'BEVERAGES',
    price: 99.00,
    description: 'Brewed dried hibiscus petals sweetened with forest berries syrup, served iced with a lime wheel.',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop',
    isAvailable: true,
    isBestseller: false,
    spicyLevel: 'Mild',
    preparationTime: 4,
    nutrition: { calories: 110, protein: 0, carbs: 26 }
  },

  // NAAN & ROLLS (₹60-180)
  {
    name: 'Garlic Butter Naan',
    category: 'NAAN & ROLLS',
    price: 79.00,
    description: 'Traditional pillowy tandoor flatbread brushed with garlic cloves and clarified tandoori butter.',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop',
    isAvailable: true,
    isBestseller: true,
    spicyLevel: 'Mild',
    preparationTime: 8,
    nutrition: { calories: 260, protein: 7, carbs: 38 }
  },
  {
    name: 'Spicy Paneer Tikka Roll',
    category: 'NAAN & ROLLS',
    price: 119.00,
    description: 'Charred clay-oven paneer cubes tossed with red bell peppers, raw onions, and green mint chutney in a flaky paratha wrap.',
    imageUrl: 'https://images.unsplash.com/photo-1626700051175-6518c4793fdf?w=500&auto=format&fit=crop',
    isAvailable: true,
    isBestseller: true,
    spicyLevel: 'Hot',
    preparationTime: 12,
    nutrition: { calories: 410, protein: 14, carbs: 36 }
  },
  {
    name: 'Classic Aloo Roll',
    category: 'NAAN & ROLLS',
    price: 89.00,
    description: 'Mashed spiced potato rolls wrapped in a thin flat roti with onion strings, coriander, and tangy chaat masala.',
    imageUrl: 'https://images.unsplash.com/photo-1562166453-83210d7a6f23?w=500&auto=format&fit=crop',
    isAvailable: true,
    isBestseller: false,
    spicyLevel: 'Medium',
    preparationTime: 10,
    nutrition: { calories: 340, protein: 6, carbs: 48 }
  },

  // DIPS (₹60-180)
  {
    name: 'Avocado Cilantro Dip',
    category: 'DIPS',
    price: 60.00,
    description: 'Creamy Haas avocado mash whipped with sour cream, lime squeeze, and fresh garden cilantro bits.',
    imageUrl: 'https://images.unsplash.com/photo-1577906096429-f73ae1731240?w=500&auto=format&fit=crop',
    isAvailable: true,
    isBestseller: false,
    spicyLevel: 'Mild',
    preparationTime: 3,
    nutrition: { calories: 80, protein: 1, carbs: 4 }
  },
  {
    name: 'Smoked Ghost Pepper Mayo Dip',
    category: 'DIPS',
    price: 65.00,
    description: 'Fiery emulsified eggless mayo loaded with bhut jolokia pepper oil and smoked paprika flakes.',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500&auto=format&fit=crop',
    isAvailable: true,
    isBestseller: true,
    spicyLevel: 'Hot',
    preparationTime: 2,
    nutrition: { calories: 120, protein: 0, carbs: 2 }
  },

  // DESSERTS (₹60-180)
  {
    name: 'Fudge Chocolate Lava Cake',
    category: 'DESSERTS',
    price: 129.00,
    description: 'Warm cocoa muffin with a molten oozing centre of rich dark chocolate ganache, dusted with icing sugar.',
    imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&auto=format&fit=crop',
    isAvailable: true,
    isBestseller: true,
    spicyLevel: 'Mild',
    preparationTime: 9,
    nutrition: { calories: 390, protein: 5, carbs: 45 }
  },
  {
    name: 'Saffron Pistachio Kulfi',
    category: 'DESSERTS',
    price: 89.00,
    description: 'Slow-simmered condensed milk kulfi flavored with strings of Kashmiri saffron, cardamom, and chopped pistachios.',
    imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop',
    isAvailable: true,
    isBestseller: false,
    spicyLevel: 'Mild',
    preparationTime: 5,
    nutrition: { calories: 190, protein: 4, carbs: 23 }
  },
  {
    name: 'Double Cocoa Fudgy Brownie',
    category: 'DESSERTS',
    price: 99.00,
    description: 'Chewy fudge brownie baked with premium dark cocoa and chunks of milk chocolate chips.',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop',
    isAvailable: true,
    isBestseller: false,
    spicyLevel: 'Mild',
    preparationTime: 5,
    nutrition: { calories: 290, protein: 4, carbs: 33 }
  },

  // PARTY COMBOS (₹60-180)
  {
    name: 'SVS Duo Burger Fest',
    category: 'PARTY COMBOS',
    price: 179.00,
    description: 'A special combo of one Royal Crunch Burger, a side of Masala Fries, and one Mint Lemonade for the perfect single feast.',
    imageUrl: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&auto=format&fit=crop',
    isAvailable: true,
    isBestseller: true,
    spicyLevel: 'Medium',
    preparationTime: 15,
    nutrition: { calories: 760, protein: 16, carbs: 108 }
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/svs_foods';
    console.log('Connecting to MongoDB database for seeding:', mongoUri);
    
    await mongoose.connect(mongoUri);
    console.log('Database connected.');

    // Clear MenuItem model
    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items.');

    // Seed Menu Items
    const seeded = await MenuItem.insertMany(menuItems);
    console.log(`Successfully seeded ${seeded.length} gourmet menu items into the database.`);
    
    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding database failed:', error);
    process.exit(1);
  }
};

seedDB();
