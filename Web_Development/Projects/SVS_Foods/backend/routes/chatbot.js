import express from 'express';
import jwt from 'jsonwebtoken';
import { GoogleGenerativeAI } from '@google/generative-ai';
import User from '../models/User.js';
import MenuItem from '../models/MenuItem.js';
import Order from '../models/Order.js';
import ChatSession from '../models/ChatSession.js';

const router = express.Router();

// RAG Context Data Chunks (SVS Food Company Knowledge Base)
const FAQ_CHUNKS = [
  {
    id: 1,
    text: "SVS Food Company's opening hours are from 11 AM to 11 PM every day of the week. Late night cooking stops exactly at 11 PM.",
    keywords: ["hours", "opening", "closing", "time", "open", "close", "when", "night", "morning", "active", "schedule"]
  },
  {
    id: 2,
    text: "SVS Food Company delivers hot packages strictly to Satna. The supported pincodes in our delivery radius are Satna: 485001 and 485002. If you reside in satna with these pincodes, we deliver to you. Ask the user for their pincode to verify delivery eligibility.",
    keywords: ["deliver", "delivery", "pincode", "area", "satna", "location", "place", "where", "reach", "coverage", "pin", "address"]
  },
  {
    id: 3,
    text: "SVS Food Company operates a 100% refund policy. If you receive a wrong, incorrect, or stale order, we guarantee a full refund or direct dish replacement within 24 hours of delivery. Submit queries to support@svsfoods.com.",
    keywords: ["refund", "policy", "wrong", "cancel", "return", "money", "complaint", "bad", "stale", "incorrect", "replace", "support"]
  },
  {
    id: 4,
    text: "You can track your active orders by visiting your User Account Dashboard at /dashboard. SVS Foods provides a real-time progress tracker outlining Confirmed, Kitchen Prep, Out for Delivery, and Delivered stages.",
    keywords: ["track", "order", "status", "where is my food", "timeline", "active", "stepper", "dispatches", "tracking", "history"]
  },
  {
    id: 5,
    text: "All items served by SVS Food Company are 100% Pure Vegetarian. Our gourmet kitchens have a strict zero-touch policy and sanitise baking clay-ovens and flatbread sheets daily to avoid any contamination.",
    keywords: ["veg", "vegetarian", "pure veg", "hygiene", "clean", "sanitize", "meat", "eggless", "green", "dairy"]
  },
  {
    id: 6,
    text: "SVS Foods serves gourmet veggie classics. Signature dishes include SVS Royal Crunch Burgers (₹149), Garlic Butter Naans (₹79), Paneer Tikka Rolls (₹119), Spicy Peri Peri Fries (₹99), Saffron Pistachio Kulfi (₹89), and single feast Burger Combos (₹179). Check details on our /menu catalog.",
    keywords: ["menu", "recommend", "food", "burger", "naan", "bestseller", "dishes", "eat", "price", "rupees", "combos", "sweets"]
  }
];

// Helper to decode token optionally (allows chatbot to work for guests too)
const getOptionalUser = async (req) => {
  let token = req.cookies.accessToken;
  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return await User.findById(decoded.id).select('-password');
  } catch (error) {
    return null;
  }
};

// Local Cosine-like keyword overlap token matching (RAG Retriever)
const retrieveRAGContext = (messageQuery) => {
  const queryWords = messageQuery.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
  
  // Compute relevance scores
  const scoredChunks = FAQ_CHUNKS.map(chunk => {
    let score = 0;
    queryWords.forEach(word => {
      if (chunk.keywords.includes(word)) {
        score += 1.5; // High weight for matching keywords
      }
      if (chunk.text.toLowerCase().includes(word)) {
        score += 0.5; // Lower weight for substring checks
      }
    });
    return { ...chunk, score };
  });

  // Sort by score and filter out zero-score chunks unless query is empty
  const relevant = scoredChunks
    .filter(c => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3); // Get Top 3 relevant context chunks

  // If no chunks matched, return default top chunks as safety context
  if (relevant.length === 0) {
    return FAQ_CHUNKS.slice(0, 2);
  }

  return relevant;
};

// Chat processor handler
const processChatbotMessage = async (req, res, next) => {
  try {
    const { message, sessionId } = req.body;
    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const user = await getOptionalUser(req);
    
    // 1. RAG Retrieval Stage
    const topChunks = retrieveRAGContext(message);
    const ragContextText = topChunks.map(c => c.text).join('\n');

    // 2. Fetch recent orders if user is logged in
    let orderContext = 'User is not logged in. Tell them they can log in to view active order status.';
    let recentOrders = [];
    if (user) {
      recentOrders = await Order.find({ userId: user._id })
        .sort({ orderDate: -1 })
        .limit(3)
        .populate('items.menuItemId');
      
      if (recentOrders.length > 0) {
        orderContext = recentOrders.map((order, index) => 
          `Order #${index + 1} (ID: ${order._id}):
           - Date: ${order.orderDate.toDateString()}
           - Status: ${order.status.toUpperCase()}
           - Total: ₹${order.totalAmount}
           - Items: ${order.items.map(item => `${item.menuItemId?.name || 'Gourmet Dish'} (x${item.quantity})`).join(', ')}`
        ).join('\n\n');
      } else {
        orderContext = 'User is logged in but has no placed orders yet.';
      }
    }

    // 3. Find or Create Chat Session
    let chatSession;
    if (user) {
      chatSession = await ChatSession.findOne({ userId: user._id });
    } else if (sessionId) {
      chatSession = await ChatSession.findById(sessionId);
    }

    if (!chatSession) {
      chatSession = new ChatSession({
        userId: user ? user._id : undefined,
        messages: []
      });
    }

    // Save user message to session
    chatSession.messages.push({ sender: 'user', text: message });

    let botResponse = '';

    // 4. Response Generation (Gemini AI RAG prompting or Fallback)
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '') {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const history = chatSession.messages.slice(0, -1).map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }));

        const systemInstruction = `You are "SVS Food Bot", the elite virtual AI culinary concierge for SVS Food Company.
Your job is to assist customers based ONLY on the following retrieved RAG Context.

SVS Food Company Knowledge Base (RAG Context):
${ragContextText}

User Profile details:
- Name: ${user ? user.name : 'Guest'}
- Logged In: ${user ? 'Yes' : 'No'}

Recent User Orders History:
${orderContext}

Guidelines:
- Answer the user's question politely and speak in a mouth-watering culinary tone.
- Base your answers STRICTLY on the SVS Food Company Knowledge Base context provided above.
- If the user asks about delivery to Satna or pincodes, explicitly list 485001 and 485002 as the only eligible delivery codes. Ask for their pincode to verify.
- If the user asks about order status, read directly from 'Recent User Orders History'. Tell them the status of their order and list the items.
- If they want to order, guide them to add dishes to their cart and checkout on `/cart`.
- Keep answers relatively concise, helpful, and format with bullet points if helpful.`;

        const chat = model.startChat({
          history: history,
          systemInstruction: systemInstruction
        });

        const result = await chat.sendMessage(message);
        botResponse = result.response.text();
      } catch (aiError) {
        console.error('Gemini AI execution failed, falling back to rule engine:', aiError);
        botResponse = getFallbackRAGResponse(message, user, topChunks, recentOrders);
      }
    } else {
      // Direct local RAG Fallback if no API key is set
      botResponse = getFallbackRAGResponse(message, user, topChunks, recentOrders);
    }

    // Save bot message to session
    chatSession.messages.push({ sender: 'model', text: botResponse });
    await chatSession.save();

    res.json({
      success: true,
      sessionId: chatSession._id,
      messages: chatSession.messages,
      botResponse
    });

  } catch (error) {
    next(error);
  }
};

// Bind processChatbotMessage to both endpoints for fully absolute compatibility
router.post('/message', processChatbotMessage);
router.post('/', processChatbotMessage);

// @desc    Get chat history
// @route   GET /api/chatbot/history
// @access  Public
router.get('/history', async (req, res, next) => {
  try {
    const user = await getOptionalUser(req);
    const { sessionId } = req.query;

    let chatSession = null;
    if (user) {
      chatSession = await ChatSession.findOne({ userId: user._id });
    } else if (sessionId) {
      chatSession = await ChatSession.findById(sessionId);
    }

    res.json({
      success: true,
      messages: chatSession ? chatSession.messages : []
    });
  } catch (error) {
    next(error);
  }
});

// Custom smart rule-based local RAG fallback response engine
function getFallbackRAGResponse(message, user, retrievedChunks, recentOrders) {
  const msg = message.toLowerCase();
  const warningText = `\n\n*(SVS Local RAG Fallback Concierge)*`;

  // 1. Check for specific Geolocation delivery pincodes check
  if (msg.includes('deliver') || msg.includes('satna') || msg.includes('pincode') || msg.includes('pin') || msg.includes('area')) {
    // Check if message query contains specific pincode numbers
    const pincodeRegex = /\b\d{6}\b/;
    const match = message.match(pincodeRegex);
    if (match) {
      const code = match[0];
      if (code === '485001' || code === '485002') {
        return `🎉 Excellent news! We **DO** deliver to Satna pincode **${code}**. Our express courier will reach you in 30 minutes with steaming hot food! Head over to the menu to order.` + warningText;
      } else {
        return `😔 Apologies! We currently do **NOT** deliver to pincode **${code}**. SVS Food Company radius covers **Satna (485001, 485002)** exclusively. Let us know if you have an eligible address!` + warningText;
      }
    }
    // Default reply for delivery query
    return `🚚 SVS Food Company delivers strictly to **Satna**. Supported eligible delivery pincodes include **485001** and **485002**.\n\nPlease reply with your **6-digit pincode** to check if we cover your area!` + warningText;
  }

  // 2. Order Tracking status
  if (msg.includes('order') || msg.includes('track') || msg.includes('status')) {
    if (!user) {
      return "Please log in to track your active orders. As a guest, I don't have access to your order logs." + warningText;
    }
    if (recentOrders.length === 0) {
      return `Hello ${user.name}! I checked our logs, and it looks like you haven't placed any orders yet. Head over to our Menu page to order something delicious!` + warningText;
    }
    const latestOrder = recentOrders[0];
    return `Hello ${user.name}! I tracked your latest order:\n\n**Order ID:** ${latestOrder._id}\n**Order Date:** ${latestOrder.orderDate.toDateString()}\n**Status:** 🚚 **${latestOrder.status.toUpperCase()}**\n**Total Amount:** ₹${latestOrder.totalAmount}\n**Items:** ${latestOrder.items.map(i => `${i.menuItemId?.name || 'Gourmet Dish'} (x${i.quantity})`).join(', ')}\n\nLet me know if you need help with anything else!` + warningText;
  }

  // 3. Opening hours query
  if (msg.includes('hour') || msg.includes('time') || msg.includes('when') || msg.includes('open') || msg.includes('close')) {
    return `⏰ SVS Food Company is open daily from **11 AM to 11 PM**. Late night kitchen preps stop exactly at 11 PM. Order anytime within this slot!` + warningText;
  }

  // 4. Refund policy query
  if (msg.includes('refund') || msg.includes('return') || msg.includes('wrong') || msg.includes('money') || msg.includes('complaint')) {
    return `💸 SVS Foods operates a strict **100% refund policy**. If you receive an incorrect, stale, or wrong order, we guarantee a full refund or chef replacement within **24 hours**. Send queries to support@svsfoods.com.` + warningText;
  }

  // 5. Recommend/Menu query
  if (msg.includes('menu') || msg.includes('food') || msg.includes('recommend') || msg.includes('suggest')) {
    return `🧑‍🍳 SVS Foods serves 100% pure vegetarian culinary masterpieces! Our bestsellers include:\n- 🍔 **SVS Royal Crunch Burger** (₹149)\n- 🥖 **Spicy Paneer Tikka Roll** (₹119)\n- 🥖 **Garlic Butter Naan** (₹79)\n- 🍰 **Fudge Chocolate Lava Cake** (₹129)\n\nExplore our entire catalog and add items at the **/menu** page!` + warningText;
  }

  // 6. Generic RAG fallback using retrieved text chunks directly
  const contextReply = retrievedChunks.map(c => `• ${c.text}`).join('\n\n');
  return `Thank you for reaching out to SVS Foods! Based on our FAQ database, here is the most relevant information:\n\n${contextReply}\n\nWhat other culinary questions can I answer for you today?` + warningText;
}

export default router;
