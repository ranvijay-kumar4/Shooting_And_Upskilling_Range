import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ['user', 'model'],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const chatSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    sparse: true // permits null/undefined value for guest sessions
  },
  messages: [chatMessageSchema]
}, {
  timestamps: true
});

const ChatSession = mongoose.model('ChatSession', chatSessionSchema);
export default ChatSession;
